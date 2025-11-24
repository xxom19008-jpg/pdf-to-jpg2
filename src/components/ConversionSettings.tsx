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
          
          {/* Page Selection Input - Show when "Convert all pages" is OFF */}
          {!convertAllPages && (
            <div className="mt-4 space-y-2">
              <Label htmlFor="page-selection" className="text-sm font-medium">
                Select Pages
              </Label>
              <Input
                id="page-selection"
                type="text"
                placeholder="e.g., 1-3, 5, 7-10"
                value={selectedPages}
                onChange={(e) => setSelectedPages(e.target.value)}
                disabled={disabled}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Enter page numbers or ranges separated by commas
              </p>
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
