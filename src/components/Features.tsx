import { Zap, Image, Upload, Lock, FileStack, Archive } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast & Free Conversion",
    description: "Convert PDF pages into JPG within seconds.",
  },
  {
    icon: Image,
    title: "High-Quality Output",
    description: "Ensures maximum clarity for documents, photos, or scanned pages.",
  },
  {
    icon: Upload,
    title: "Easy Drag-and-Drop Interface",
    description: "No complex settings or installation required.",
  },
  {
    icon: Lock,
    title: "Secure Processing",
    description: "Files are processed locally or automatically removed after conversion.",
  },
  {
    icon: FileStack,
    title: "Multi-Page Support",
    description: "Converts each PDF page into separate JPG images.",
  },
  {
    icon: Archive,
    title: "ZIP Export Available",
    description: "Download all JPG files in a single ZIP archive.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Use PDF to JPG Converter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The most reliable and feature-rich PDF to JPG conversion tool
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300 h-full hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
