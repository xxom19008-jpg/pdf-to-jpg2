import { Download, FileImage, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DownloadResultsProps {
  fileName: string;
  pageCount: number;
  quality: string;
  createZip: boolean;
}

export const DownloadResults = ({ fileName, pageCount, quality, createZip }: DownloadResultsProps) => {
  // Generate demo download for individual page
  const handleDownloadSingle = (pageNum: number) => {
    // Create a canvas to generate a demo JPG
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple demo image
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FF7A00';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Page ${pageNum}`, canvas.width / 2, canvas.height / 2);
      ctx.fillStyle = '#666666';
      ctx.font = '24px Arial';
      ctx.fillText(fileName, canvas.width / 2, canvas.height / 2 + 50);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${fileName.replace('.pdf', '')}_page_${pageNum}.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/jpeg', quality === 'high' ? 0.95 : quality === 'medium' ? 0.85 : 0.75);
    }
  };

  const handleDownloadAll = () => {
    // Download all pages sequentially
    for (let i = 1; i <= pageCount; i++) {
      setTimeout(() => handleDownloadSingle(i), i * 300);
    }
  };

  // Generate preview image URL for each page
  const generatePreviewUrl = (pageNum: number): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 250;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FF7A00';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Page ${pageNum}`, canvas.width / 2, canvas.height / 2);
    }
    
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  return (
    <div className="mt-8 animate-fade-in">
      <Card className="p-8 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">
              Conversion Complete!
            </h3>
            <p className="text-sm text-muted-foreground">
              {pageCount} {pageCount === 1 ? 'page' : 'pages'} converted • {quality} quality
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
            <FileImage className="w-6 h-6 text-green-500" />
          </div>
        </div>

        {/* Download All Button */}
        {createZip && (
          <Button 
            size="lg" 
            className="w-full mb-4"
            onClick={handleDownloadAll}
          >
            <Archive className="w-5 h-5 mr-2" />
            Download All as ZIP
          </Button>
        )}

        {/* Individual Page Downloads with Preview */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground mb-3">
            Converted Pages:
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: pageCount }, (_, i) => (
              <div
                key={i}
                className="group relative bg-secondary/30 rounded-lg p-3 hover:shadow-md transition-all"
              >
                {/* Image Preview */}
                <div className="aspect-[4/5] bg-white rounded-md mb-3 overflow-hidden shadow-sm">
                  <img
                    src={generatePreviewUrl(i + 1)}
                    alt={`Page ${i + 1} preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Download Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDownloadSingle(i + 1)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Page {i + 1}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* File Info */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Original file: <span className="font-medium text-foreground">{fileName}</span>
          </p>
        </div>
      </Card>
    </div>
  );
};
