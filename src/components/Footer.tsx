import { Instagram, ShoppingBag, MapPin, Clock, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="https://i.imgur.com/l3QMGh6.png" 
                alt="GIAT Logo" 
                className="h-16 w-auto object-contain dark:hidden"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://i.imgur.com/lExe7nM.png" 
                alt="GIAT Logo" 
                className="h-16 w-auto object-contain hidden dark:block"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Koperasi Giat Sejahtera Bersama (GIAT) adalah koperasi modern dan profesional 
              yang berdedikasi untuk menyediakan kebutuhan esensial berkualitas.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/giatsejahterabersama" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-giat-red hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://id.shp.ee/1uN1AdKC" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-giat-blue hover:text-white transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Tautan Cepat</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-muted-foreground hover:text-giat-red transition-colors">Beranda</Link></li>
              <li><Link to="/profil" className="text-muted-foreground hover:text-giat-red transition-colors">Profil</Link></li>
              <li><Link to="/katalog" className="text-muted-foreground hover:text-giat-red transition-colors">Katalog</Link></li>
              <li><Link to="/kemitraan" className="text-muted-foreground hover:text-giat-red transition-colors">Kemitraan</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Info Kontak</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-giat-red shrink-0" />
                <span className="text-sm">
                  Gedung lt.1, Jln. Telekomunikasi No 1 Terusan Buah Batu Bandung, Bandung 40257.
                </span>
              </li>
              <li className="flex gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-giat-red shrink-0" />
                <span className="text-sm">+62 812-XXXX-XXXX</span>
              </li>
              <li className="flex gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-giat-red shrink-0" />
                <span className="text-sm">giat@koperasi.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Jam Operasional</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-giat-blue shrink-0" />
                <div className="text-sm">
                  <p className="font-bold text-foreground">Senin - Jumat</p>
                  <p>08.00 - 16.30 WIB</p>
                </div>
              </li>
              <li className="text-sm text-muted-foreground italic">
                *Tutup pada akhir pekan dan hari libur nasional
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Koperasi GIAT. Hak cipta dilindungi undang-undang.
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
