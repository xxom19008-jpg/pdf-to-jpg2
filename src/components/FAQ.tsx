import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this PDF to JPG converter free to use?",
    answer: "Yes, completely free without any sign-up or subscription required. You can convert unlimited PDF files to JPG images.",
  },
  {
    question: "Are my files stored on your server?",
    answer: "No, all files are deleted automatically after processing. We prioritize your privacy and security by not storing any uploaded files.",
  },
  {
    question: "Does the tool support multi-page PDFs?",
    answer: "Yes, each page will be converted to a separate JPG image. You can download them individually or as a ZIP archive.",
  },
  {
    question: "What output quality does the converter provide?",
    answer: "You can choose High, Medium, or Low quality depending on your needs. High quality preserves maximum detail while Low quality creates smaller file sizes.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our PDF to JPG converter
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl shadow-card px-6 border-none"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
