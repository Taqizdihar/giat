import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Profil", href: "/profil" },
  { name: "Katalog", href: "/katalog" },
  { name: "Kemitraan", href: "/kemitraan" },
  { name: "Layanan", href: "/layanan" },
  { name: "Kontak", href: "/kontak" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    setIsDark(document.documentElement.classList.contains("dark"));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const logoUrl = isDark 
    ? "https://i.imgur.com/lExe7nM.png" 
    : "https://i.imgur.com/l3QMGh6.png";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-background/80 backdrop-blur-md border-b border-border shadow-sm" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={logoUrl} 
            alt="GIAT Logo" 
            className="h-14 md:h-16 w-auto object-contain transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.href ? "text-primary font-bold" : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button 
            className="hidden md:flex rounded-full bg-giat-red hover:bg-giat-red/90 text-white gap-2"
            onClick={() => window.open("https://id.shp.ee/1uN1AdKC", "_blank")}
          >
            <ShoppingBag className="w-4 h-4" />
            Belanja Sekarang
          </Button>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`text-lg font-semibold transition-colors hover:text-primary ${
                        location.pathname === link.href ? "text-primary" : "text-foreground/80"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button 
                    className="mt-4 rounded-xl bg-giat-red hover:bg-giat-red/90 text-white gap-2 w-full"
                    onClick={() => window.open("https://id.shp.ee/1uN1AdKC", "_blank")}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Kunjungi Shopee
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
