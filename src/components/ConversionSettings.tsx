import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface ConversionSettingsProps {
  quality: string;
  setQuality: (value: string) => void;
  convertAllPages: boolean;
  setConvertAllPages: (value: boolean) => void;
  selectedPages: string;
  setSelectedPages: (value: string) => void;
  selectedPageNumbers: number[];
  togglePageSelection: (pageNumber: number) => void;
  previewPages: { pageNumber: number; imageUrl: string }[];
  isLoadingPreview: boolean;
  createZip: boolean;
  setCreateZip: (value: boolean) => void;
  onConvert: () => void;
  isConverting: boolean;
  disabled: boolean;
}

export const ConversionSettings = ({
  quality,
  setQuality,
  convertAllPages,
  setConvertAllPages,
  selectedPages,
  setSelectedPages,
  selectedPageNumbers,
  togglePageSelection,
  previewPages,
  isLoadingPreview,
  createZip,
  setCreateZip,
  onConvert,
  isConverting,
  disabled,
}: ConversionSettingsProps) => {
  return (
    <div className="mt-8 bg-card rounded-2xl p-8 shadow-card animate-fade-in">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Conversion Settings
      </h3>
      
      <div className="space-y-6">
        {/* Quality Selection */}
        <div className="space-y-3">
          <Label htmlFor="quality" className="text-sm font-medium">
            Image Quality
          </Label>
          <Select value={quality} onValueChange={setQuality} disabled={disabled}>
            <SelectTrigger id="quality" className="w-full">
              <SelectValue placeholder="Select quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High Quality</SelectItem>
              <SelectItem value="medium">Medium Quality</SelectItem>
              <SelectItem value="low">Low Quality</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Higher quality creates larger file sizes
          </p>
        </div>

        {/* Convert All Pages Toggle */}
        <div className="py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0">
              <p className="text-sm font-medium leading-tight mb-1">Convert all pages</p>
              <p className="text-xs text-muted-foreground leading-tight">
                Convert every page in your PDF to separate JPG images
              </p>
            </div>
            <Switch
              id="all-pages"
              checked={convertAllPages}
              onCheckedChange={setConvertAllPages}
              disabled={disabled}
              className="shrink-0"
            />
          </div>
          
          {/* Page Selection - Show when "Convert all pages" is OFF */}
          {!convertAllPages && (
            <div className="mt-4">
              {isLoadingPreview ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-muted-foreground">Loading previews...</span>
                </div>
              ) : previewPages.length > 0 ? (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Select Pages ({selectedPageNumbers.length} selected)
                  </Label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-96 overflow-y-auto p-2 border border-border rounded-lg">
                    {previewPages.map((page) => (
                      <button
                        key={page.pageNumber}
                        type="button"
                        onClick={() => togglePageSelection(page.pageNumber)}
                        className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          selectedPageNumbers.includes(page.pageNumber)
                            ? 'border-primary shadow-lg'
                            : 'border-border hover:border-primary/50'
                        }`}
                        disabled={disabled}
                      >
                        <div className="aspect-[3/4] bg-white">
                          <img
                            src={page.imageUrl}
                            alt={`Page ${page.pageNumber}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className={`absolute bottom-0 left-0 right-0 py-1 text-xs font-medium text-center ${
                          selectedPageNumbers.includes(page.pageNumber)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background/90 text-foreground'
                        }`}>
                          {page.pageNumber}
                        </div>
                        {selectedPageNumbers.includes(page.pageNumber) && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click on page thumbnails to select/deselect
                  </p>
                </div>
              ) : (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No preview available
                </div>
              )}
            </div>
          )}
        </div>

        {/* Create ZIP Toggle */}
        <div className="flex items-center justify-between py-4 border-t border-border">
          <div className="flex flex-col gap-0">
            <p className="text-sm font-medium leading-tight mb-1">Download as ZIP</p>
            <p className="text-xs text-muted-foreground leading-tight">
              Combine all JPG files into a single ZIP archive
            </p>
          </div>
          <Switch
            id="create-zip"
            checked={createZip}
            onCheckedChange={setCreateZip}
            disabled={disabled}
            className="shrink-0"
          />
        </div>

        {/* Convert Button */}
        <Button
          size="lg"
          className="w-full mt-6"
          onClick={onConvert}
          disabled={disabled || isConverting}
        >
          {isConverting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Converting...
            </>
          ) : (
            "Convert to JPG"
          )}
        </Button>
      </div>
    </div>
  );
};
