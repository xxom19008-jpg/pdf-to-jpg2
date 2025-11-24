import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { ConversionSettings } from "./ConversionSettings";
import { DownloadResults } from "./DownloadResults";
import { convertPDFToJPG, type ConvertedPage } from "@/lib/pdfConverter";

export const Hero = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState("high");
  const [convertAllPages, setConvertAllPages] = useState(true);
  const [createZip, setCreateZip] = useState(true);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [convertedPages, setConvertedPages] = useState<ConvertedPage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    
    // Validate file size (20MB max)
    const maxSize = 20 * 1024 * 1024; // 20MB in bytes
    if (file.size > maxSize) {
      toast.error("File size must be less than 20MB");
      return;
    }
    
    setSelectedFile(file);
    setConversionComplete(false);
    setConvertedPages([]);
    toast.success(`Selected: ${file.name}`);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF file first");
      return;
    }

    setIsConverting(true);
    const toastId = toast.loading("Converting your PDF to JPG...");
    
    try {
      console.log('Starting conversion for:', selectedFile.name);
      console.log('Quality setting:', quality);
      
      const pages = await convertPDFToJPG(
        selectedFile,
        quality as 'high' | 'medium' | 'low',
        (current, total) => {
          console.log(`Converting page ${current}/${total}`);
          toast.loading(`Converting page ${current}/${total}...`, { id: toastId });
        }
      );
      
      console.log('Conversion complete. Pages:', pages.length);
      setConvertedPages(pages);
      setConversionComplete(true);
      toast.success(`Successfully converted ${pages.length} pages!`, { id: toastId });
    } catch (error) {
      console.error('Conversion error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to convert PDF: ${errorMessage}`, { id: toastId });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Free Online Tool
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              PDF to JPG Converter
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              Convert your PDF pages into high-quality JPG images instantly. No signup required.
            </p>
            
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 bg-card shadow-card hover:shadow-hover ${
                dragActive ? "border-primary bg-primary/5" : "border-border"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground mb-2">
                    Drag & Drop your PDF here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: PDF • Max file size: 20MB
                  </p>
                </div>
                <Button size="lg" className="mt-4" onClick={handleButtonClick}>
                  Select File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
                {selectedFile && (
                  <p className="text-sm text-primary font-medium mt-2">
                    ✓ {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            </div>

            {/* Conversion Settings - Show only after file is selected and before conversion */}
            {selectedFile && !conversionComplete && (
              <ConversionSettings
                quality={quality}
                setQuality={setQuality}
                convertAllPages={convertAllPages}
                setConvertAllPages={setConvertAllPages}
                createZip={createZip}
                setCreateZip={setCreateZip}
                onConvert={handleConvert}
                isConverting={isConverting}
                disabled={!selectedFile}
              />
            )}

            {/* Download Results - Show after conversion is complete */}
            {conversionComplete && selectedFile && convertedPages.length > 0 && (
              <DownloadResults
                fileName={selectedFile.name}
                quality={quality}
                createZip={createZip}
                convertedPages={convertedPages}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
