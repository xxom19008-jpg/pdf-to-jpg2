import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              LetsMetrix Tools
            </h3>
            <p className="text-muted-foreground max-w-md">
              Free online tools to help you convert, optimize, and process your files with ease.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-muted-foreground hover:text-primary transition-colors">
                  Tools
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://letsmetrix.com" className="text-muted-foreground hover:text-primary transition-colors">
                  LetsMetrix
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} LetsMetrix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
