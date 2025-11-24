import { Download, FileImage, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { downloadJPG, downloadAllAsZip, type ConvertedPage } from "@/lib/pdfConverter";

interface DownloadResultsProps {
  fileName: string;
  quality: string;
  createZip: boolean;
  convertedPages: ConvertedPage[];
}

export const DownloadResults = ({ fileName, quality, createZip, convertedPages }: DownloadResultsProps) => {
  const baseFilename = fileName.replace('.pdf', '');

  const handleDownloadSingle = (page: ConvertedPage) => {
    downloadJPG(page.blob, `${baseFilename}_page_${page.pageNumber}.jpg`);
  };

  const handleDownloadAll = () => {
    downloadAllAsZip(convertedPages, fileName);
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
              {convertedPages.length} {convertedPages.length === 1 ? 'page' : 'pages'} converted • {quality} quality
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
            {convertedPages.map((page) => (
              <div
                key={page.pageNumber}
                className="group relative bg-secondary/30 rounded-lg p-3 hover:shadow-md transition-all"
              >
                {/* Real Image Preview */}
                <div className="aspect-[4/5] bg-white rounded-md mb-3 overflow-hidden shadow-sm">
                  <img
                    src={page.imageUrl}
                    alt={`Page ${page.pageNumber} preview`}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Download Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDownloadSingle(page)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Page {page.pageNumber}
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
