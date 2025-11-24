import { Upload, Settings, Zap, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload your PDF file",
    description: "Drag and drop or click to select your PDF document",
  },
  {
    icon: Settings,
    title: "Choose image quality",
    description: "Select High, Medium, or Low quality or keep default settings",
  },
  {
    icon: Zap,
    title: 'Click "Convert to JPG"',
    description: "Our tool instantly processes your PDF pages",
  },
  {
    icon: Download,
    title: "Download your images",
    description: "Get individual JPG files or download as a ZIP archive",
  },
];

export const HowToUse = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How to Use PDF to JPG Converter Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert your PDF files in just four simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute top-4 right-4 text-4xl font-bold text-primary/10">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
