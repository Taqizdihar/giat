import { Instagram, ShoppingBag, MapPin, Clock, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSettings, fetchNavigation, normalizeNavItem } from "../services/cmsApi";

export function Footer() {
  const [settings, setSettings] = useState<any>(null);
  const [quickLinks, setQuickLinks] = useState<{ name: string; href: string }[]>([
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Katalog", href: "/katalog" },
    { name: "Kemitraan", href: "/kemitraan" },
  ]);

  useEffect(() => {
    async function loadSettings() {
      const [data, navigation] = await Promise.all([fetchSettings(), fetchNavigation()]);
      if (data) setSettings(data);
      if (navigation) {
        const items = Array.isArray(navigation) ? navigation : [];
        if (items.length > 0) {
          // Use first 4 nav items as quick links
          setQuickLinks(items.slice(0, 4).map(normalizeNavItem));
        }
      }
    }
    loadSettings();
  }, []);

  // Branding — logo_url is the live field; logo_light / logo_dark are legacy fallbacks
  const logoLight = settings?.logo_url || settings?.logo_light || "https://i.imgur.com/l3QMGh6.png";
  const logoDark = settings?.logo_dark || settings?.logo_url || "https://i.imgur.com/lExe7nM.png";

  // Social / contact — resolve from social_links array or direct fields
  const socialLinks: any[] = Array.isArray(settings?.social_links) ? settings.social_links : [];
  const instagramLink = socialLinks.find((l: any) => l?.platform === 'instagram' || l?.type === 'instagram');
  const shopeeLink = socialLinks.find((l: any) => l?.platform === 'shopee' || l?.type === 'shopee');

  const instagramUrl = instagramLink?.url || settings?.instagram_url || "https://www.instagram.com/giatsejahterabersama";
  const shopeeUrl = shopeeLink?.url || settings?.shopee_url || "https://id.shp.ee/1uN1AdKC";

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img src={logoLight} alt={settings?.site_name ?? "GIAT Logo"} className="h-16 w-auto object-contain dark:hidden" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = "https://placehold.co/200x80?text=Logo"; }} />
              <img src={logoDark} alt={settings?.site_name ?? "GIAT Logo"} className="h-16 w-auto object-contain hidden dark:block" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = "https://placehold.co/200x80?text=Logo"; }} />
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {settings?.tagline || settings?.site_description || "Koperasi Giat Sejahtera Bersama (GIAT) adalah koperasi modern dan profesional yang berdedikasi untuk menyediakan kebutuhan esensial berkualitas."}
            </p>
            <div className="flex gap-4">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-giat-red hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={shopeeUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-giat-blue hover:text-white transition-all">
                <ShoppingBag className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Tautan Cepat</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground hover:text-giat-red transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Info Kontak</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-giat-red shrink-0" />
                <span className="text-sm">{settings?.address ?? "Gedung lt.1, Jln. Telekomunikasi No 1 Terusan Buah Batu Bandung, Bandung 40257."}</span>
              </li>
              <li className="flex gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-giat-red shrink-0" />
                <span className="text-sm">{settings?.phone ?? "+62 812-XXXX-XXXX"}</span>
              </li>
              <li className="flex gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-giat-red shrink-0" />
                <span className="text-sm">{settings?.email ?? "giat@koperasi.com"}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Jam Operasional</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-giat-blue shrink-0" />
                <div className="text-sm">
                  <p className="font-bold text-foreground">{settings?.operational_days ?? "Senin - Jumat"}</p>
                  <p>{settings?.operational_hours ?? "08.00 - 16.30 WIB"}</p>
                </div>
              </li>
              <li className="text-sm text-muted-foreground italic">
                {settings?.operational_note ?? "*Tutup pada akhir pekan dan hari libur nasional"}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {settings?.copyright_text || `${settings?.site_name || "Koperasi GIAT"}. Hak cipta dilindungi undang-undang.`}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-giat-red">Kebijakan Privasi</Link>
            <Link to="#" className="hover:text-giat-red">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
