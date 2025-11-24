import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker - use jsdelivr CDN which is more reliable
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

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
  try {
    console.log('Reading PDF file...');
    const arrayBuffer = await file.arrayBuffer();
    
    console.log('Loading PDF document...');
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const totalPages = pdf.numPages;
    console.log(`PDF loaded. Total pages: ${totalPages}`);
    
    const convertedPages: ConvertedPage[] = [];

  // Quality settings
  const scale = quality === 'high' ? 2.0 : quality === 'medium' ? 1.5 : 1.0;
  const jpegQuality = quality === 'high' ? 0.95 : quality === 'medium' ? 0.85 : 0.75;

  console.log(`Quality settings - Scale: ${scale}, JPEG: ${jpegQuality}`);

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    try {
      console.log(`Processing page ${pageNum}...`);
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
    
    console.log(`Rendering page ${pageNum}...`);
    await page.render(renderContext).promise;
    console.log(`Page ${pageNum} rendered successfully`);

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

    console.log(`Page ${pageNum} converted successfully`);

    // Report progress
    if (onProgress) {
      onProgress(pageNum, totalPages);
    }
    } catch (pageError) {
      console.error(`Error converting page ${pageNum}:`, pageError);
      throw new Error(`Failed to convert page ${pageNum}: ${pageError instanceof Error ? pageError.message : 'Unknown error'}`);
    }
  }

  console.log('All pages converted successfully');
  return convertedPages;
  } catch (error) {
    console.error('PDF conversion error:', error);
    throw error;
  }
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
