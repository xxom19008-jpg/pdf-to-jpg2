import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ConvertedPage {
  pageNumber: number;
  imageUrl: string;
  blob: Blob;
}

export const convertPDFToJPG = async (
  file: File,
  quality: 'high' | 'medium' | 'low',
  onProgress?: (current: number, total: number) => void
): Promise<ConvertedPage[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const totalPages = pdf.numPages;
  const convertedPages: ConvertedPage[] = [];

  // Quality settings
  const scale = quality === 'high' ? 2.0 : quality === 'medium' ? 1.5 : 1.0;
  const jpegQuality = quality === 'high' ? 0.95 : quality === 'medium' ? 0.85 : 0.75;

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    // Create canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (!context) {
      throw new Error('Could not get canvas context');
    }

    // Render PDF page to canvas
    const renderContext: any = {
      canvasContext: context,
      viewport: viewport,
    };
    
    await page.render(renderContext).promise;

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error('Failed to convert canvas to blob'));
        },
        'image/jpeg',
        jpegQuality
      );
    });

    // Create object URL for preview
    const imageUrl = URL.createObjectURL(blob);

    convertedPages.push({
      pageNumber: pageNum,
      imageUrl,
      blob,
    });

    // Report progress
    if (onProgress) {
      onProgress(pageNum, totalPages);
    }
  }

  return convertedPages;
};

export const downloadJPG = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadAllAsZip = async (pages: ConvertedPage[], originalFilename: string) => {
  // For now, download sequentially
  // In a real app, you'd use JSZip library
  const baseFilename = originalFilename.replace('.pdf', '');
  
  pages.forEach((page, index) => {
    setTimeout(() => {
      downloadJPG(page.blob, `${baseFilename}_page_${page.pageNumber}.jpg`);
    }, index * 300);
  });
};
