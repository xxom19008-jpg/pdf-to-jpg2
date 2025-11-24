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
  const handleDownloadAll = () => {
    // TODO: Implement actual download
    console.log("Download all as ZIP");
  };

  const handleDownloadSingle = (pageNum: number) => {
    // TODO: Implement actual download
    console.log(`Download page ${pageNum}`);
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

        {/* Individual Page Downloads */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground mb-3">
            Download Individual Pages:
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <Button
                key={i}
                variant="outline"
                className="justify-between"
                onClick={() => handleDownloadSingle(i + 1)}
              >
                <span className="flex items-center gap-2">
                  <FileImage className="w-4 h-4" />
                  Page {i + 1}
                </span>
                <Download className="w-4 h-4" />
              </Button>
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
