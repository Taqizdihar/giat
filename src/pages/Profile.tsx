import { motion } from "motion/react";
import { Target, Eye, History } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchPage } from "../services/cmsApi";

export function Profile() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Profil | GIAT";

    async function loadData() {
      const data = await fetchPage("profil");
      setPageData(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Extract content with fallbacks
  const content = pageData?.content ?? pageData ?? {};

  if (loading) {
    return (
      <div className="pt-20">
        <section className="py-24 bg-muted/30 min-h-[calc(100vh-80px)]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="h-12 w-3/4 mx-auto bg-muted rounded-2xl animate-pulse" />
              <div className="h-5 w-full bg-muted rounded-lg animate-pulse" />
              <div className="h-5 w-2/3 mx-auto bg-muted rounded-lg animate-pulse" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background p-8 rounded-[32px] shadow-sm border border-border space-y-4">
                  <div className="w-14 h-14 bg-muted rounded-2xl animate-pulse" />
                  <div className="h-6 w-32 bg-muted rounded-lg animate-pulse" />
                  <div className="h-4 w-full bg-muted rounded-lg animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-24 bg-muted/30 min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              {content?.heading ? (
                <span dangerouslySetInnerHTML={{ __html: content.heading }} />
              ) : (
                <>Memberdayakan <span className="text-giat-blue">Komunitas Tel-U</span></>
              )}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              {content?.description ?? "Koperasi Giat Sejahtera Bersama (GIAT) lebih dari sekadar toko. Kami adalah koperasi yang berpusat pada mahasiswa, berdedikasi untuk menyediakan kebutuhan berkualitas dan menumbuhkan jiwa kewirausahaan di Telkom University."}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-background p-8 rounded-[32px] shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-giat-red/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-giat-red" />
              </div>
              <h3 className="text-xl font-bold mb-4">{content?.vision_title ?? "Visi Kami"}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {content?.vision ?? "Menjadi koperasi terkemuka, modern, dan profesional yang memberdayakan mahasiswa dan staf melalui pertumbuhan ekonomi yang berkelanjutan."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-background p-8 rounded-[32px] shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-giat-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-giat-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">{content?.mission_title ?? "Misi Kami"}</h3>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {content?.missions ?? "Menyediakan produk akademik dan gaya hidup berkualitas tinggi dengan tetap menjaga harga yang terjangkau dan pelayanan prima bagi seluruh anggota."}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-background p-8 rounded-[32px] shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-giat-red/10 rounded-2xl flex items-center justify-center mb-6">
                <History className="w-8 h-8 text-giat-red" />
              </div>
              <h3 className="text-xl font-bold mb-4">{content?.history_title ?? "Sejarah Kami"}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {content?.history ?? "Didirikan di lingkungan kampus, GIAT telah berkembang dari kios kecil menjadi pusat koperasi modern untuk Tel-U."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
