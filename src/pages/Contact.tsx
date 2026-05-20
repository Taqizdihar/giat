import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Instagram, ShoppingBag, Send } from "lucide-react";
import React, { useState, useEffect } from "react";
import { fetchPage, fetchSettings } from "../services/cmsApi";
import cmsClient from "../services/cmsApi";

export function Contact() {
  const [content, setContent] = useState<any>({});
  const [formData, setFormData] = useState({ sender_name: "", sender_email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Kontak | GIAT";
    async function loadData() {
      const [pageData, settings] = await Promise.all([fetchPage("kontak"), fetchSettings()]);
      setContent({ ...(settings ?? {}), ...(pageData?.content ?? pageData ?? {}) });
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await cmsClient.post("/api/v1/public/messages", {
        sender_name: formData.sender_name,
        sender_email: formData.sender_email || "N/A",
        subject: formData.subject,
        message: `WhatsApp: ${formData.sender_email}\n\nPesan:\nMinta dihubungi untuk topik ${formData.subject}`,
      });
      alert("Pesan berhasil dikirim!");
      setFormData({ sender_name: "", sender_email: "", subject: "", message: "" });
    } catch (err) {
      console.error("[CMS] Failed to send message:", err);
      alert("Gagal mengirim pesan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const instagramUrl = content?.instagram_url ?? "https://www.instagram.com/giatsejahterabersama";
  const shopeeUrl = content?.shopee_url ?? content?.link_shopee ?? "https://id.shp.ee/1uN1AdKC";

  return (
    <div className="pt-20">
      <section className="py-24 min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold mb-6">
              Hubungi <span className="text-giat-red">Kami</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground">
              {content?.contact_description ?? "Punya pertanyaan atau ingin bermitra dengan kami? Jangan ragu untuk menghubungi tim kami."}
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-background p-8 rounded-[32px] shadow-sm border border-border">
              <h3 className="text-2xl font-bold mb-8">Informasi Kontak</h3>
              <ul className="space-y-8">
                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-giat-red/10 rounded-2xl flex items-center justify-center shrink-0"><MapPin className="w-6 h-6 text-giat-red" /></div>
                  <div><h4 className="font-bold text-lg mb-1">Alamat Lengkap</h4><p className="text-muted-foreground">{content?.address ?? "Gedung lt.1, Jln. Telekomunikasi No 1 Terusan Buah Batu Bandung, Bandung 40257."}</p></div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-giat-blue/10 rounded-2xl flex items-center justify-center shrink-0"><Clock className="w-6 h-6 text-giat-blue dark:text-blue-400" /></div>
                  <div><h4 className="font-bold text-lg mb-1">Jam Operasional</h4><p className="text-muted-foreground">{content?.operational_hours ?? "Senin - Jumat (08.00 - 16.30 WIB)"}</p></div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-giat-red/10 rounded-2xl flex items-center justify-center shrink-0"><Phone className="w-6 h-6 text-giat-red" /></div>
                  <div><h4 className="font-bold text-lg mb-1">Telepon</h4><p className="text-muted-foreground">{content?.phone ?? "+62 812-XXXX-XXXX"}</p></div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-giat-blue/10 rounded-2xl flex items-center justify-center shrink-0"><Mail className="w-6 h-6 text-giat-blue dark:text-blue-400" /></div>
                  <div><h4 className="font-bold text-lg mb-1">Email</h4><p className="text-muted-foreground">{content?.email ?? "giat@koperasi.com"}</p></div>
                </li>
              </ul>
              <div className="mt-10 pt-8 border-t border-border">
                <h4 className="font-bold text-lg mb-4">Temukan Kami di</h4>
                <div className="flex gap-4">
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-giat-red hover:text-white transition-all"><Instagram className="w-6 h-6" /></a>
                  <a href={shopeeUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-giat-blue hover:text-white transition-all"><ShoppingBag className="w-6 h-6" /></a>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-8">
              <div className="bg-background p-8 rounded-[32px] shadow-sm border border-border" id="form">
                <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                    <input type="text" value={formData.sender_name} onChange={e => setFormData({...formData, sender_name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-giat-blue/50" placeholder="Masukkan nama Anda..." required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nomor WhatsApp</label>
                    <input type="tel" value={formData.sender_email} onChange={e => setFormData({...formData, sender_email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-giat-blue/50" placeholder="08..." required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Pilih Topik</label>
                    <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-giat-blue/50" required>
                      <option value="">Pilih Topik</option>
                      <option value="Pendaftaran Anggota">Pendaftaran Anggota</option>
                      <option value="Pengajuan Pinjaman">Pengajuan Pinjaman</option>
                      <option value="Kerjasama Kemitraan">Kerjasama Kemitraan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full bg-giat-blue text-white py-4 rounded-xl hover:bg-giat-blue/90 transition-colors font-bold flex justify-center items-center gap-2 mt-4 disabled:opacity-70">
                    {isSubmitting ? "Mengirim..." : "Kirim Pesan"} <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
              <div className="bg-muted/30 rounded-[32px] overflow-hidden h-[300px] relative border border-border">
                <div className="absolute inset-0 flex items-center justify-center flex-col text-muted-foreground">
                  <MapPin className="w-16 h-16 mb-4 opacity-20" /><p className="font-medium">Peta Lokasi</p>
                </div>
                <iframe src={content?.maps_embed_url ?? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.307454341908!2d107.62949671537544!3d-6.973006994962295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9adf177bf8d%3A0x437398556f9fa03!2sTelkom%20University!5e0!3m2!1sen!2sid!4v1625000000000!5m2!1sen!2sid"} width="100%" height="100%" style={{ border: 0, position: 'absolute', inset: 0 }} loading="lazy" title="Lokasi GIAT" className="opacity-80 hover:opacity-100 transition-opacity duration-500 relative z-10"></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
