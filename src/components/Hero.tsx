import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import heroImage from "@/assets/hero-pdf-converter.jpg";

export const Hero = () => {
  const [dragActive, setDragActive] = useState(false);

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
    // Handle file drop
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Free Online Tool
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              PDF to JPG Converter
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl">
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
                <Button size="lg" className="mt-4">
                  Select File
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block animate-fade-in">
            <img
              src={heroImage}
              alt="PDF to JPG conversion illustration"
              className="w-full h-auto rounded-2xl shadow-hover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
