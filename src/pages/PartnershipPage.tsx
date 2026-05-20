import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Handshake, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchPage } from "../services/cmsApi";

export function PartnershipPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Kemitraan | GIAT";
    async function loadData() {
      const data = await fetchPage("kemitraan");
      setPageData(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const content = pageData?.content ?? pageData ?? {};
  const features = content?.features ?? [];

  // Default feature cards if CMS returns nothing
  const defaultFeatures = [
    { icon: Handshake, title: "Konsinyasi", description: "Jual makanan ringan dan minumanmu di lokasi kampus kami yang strategis." },
    { icon: TrendingUp, title: "Lalu Lintas Tinggi", description: "Akses langsung ke mahasiswa dan staf Telkom University." },
    { icon: Users, title: "Dukungan", description: "Kami menyediakan dukungan pemasaran dan manajemen profesional." },
  ];

  const featureIconMap: Record<string, any> = { 'Handshake': Handshake, 'TrendingUp': TrendingUp, 'Users': Users };
  const resolvedFeatures = features.length > 0
    ? features.map((f: any) => ({ ...f, icon: featureIconMap[f.icon_name] || Handshake }))
    : defaultFeatures;

  if (loading) {
    return (
      <div className="pt-20">
        <section className="py-24 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
          <div className="container mx-auto px-6">
            <div className="bg-giat-red rounded-[48px] p-8 md:p-16 relative overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="h-16 w-3/4 bg-white/20 rounded-2xl animate-pulse" />
                  <div className="h-5 w-full bg-white/10 rounded-lg animate-pulse" />
                  <div className="h-5 w-2/3 bg-white/10 rounded-lg animate-pulse" />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[1,2,3,4].map(i => <div key={i} className="bg-white/10 p-6 rounded-3xl h-40 animate-pulse" />)}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-24 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
        <div className="container mx-auto px-6">
          <div className="bg-giat-red rounded-[48px] p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-giat-blue/20 rounded-full blur-3xl" />
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {content?.heading ? <span dangerouslySetInnerHTML={{ __html: content.heading }} /> : <>Mari Berkembang <br /> Bersama.</>}
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-md">
                  {content?.description ?? "Apakah kamu seorang mahasiswa pengusaha atau vendor? Bermitralah dengan GIAT untuk konsinyasi F&B dan jangkau ribuan mahasiswa setiap harinya."}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="rounded-full bg-white text-giat-red hover:bg-white/90 font-bold px-8">
                    {content?.cta_primary_text ?? "Menjadi Mitra"}
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-giat-red px-8">
                    {content?.cta_secondary_text ?? "Pelajari Lebih Lanjut"}
                  </Button>
                </div>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-6">
                {resolvedFeatures.map((feature: any, idx: number) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + idx * 0.1 }} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                      <Icon className="w-10 h-10 mb-4 text-white" />
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-white/70">{feature.description}</p>
                    </motion.div>
                  );
                })}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 flex items-center justify-center">
                  <p className="text-center font-bold text-2xl">{content?.partner_count_text ?? <>Bergabunglah dengan 50+ <br /> Mitra</>}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
