import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPage, fetchSettings } from "../services/cmsApi";

export function Home() {
  const [pageData, setPageData] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Beranda | GIAT";

    async function loadData() {
      const [page, siteSettings] = await Promise.all([
        fetchPage("home"),
        fetchSettings(),
      ]);
      setPageData(page);
      setSettings(siteSettings);
      setLoading(false);
    }
    loadData();
  }, []);

  // Extract sections with fallbacks
  const hero = pageData?.sections?.find((s: any) => s.type === "hero") ?? pageData?.hero ?? {};
  const shopeeUrl = settings?.shopee_url ?? "https://id.shp.ee/1uN1AdKC";

  if (loading) {
    return (
      <div className="pt-20">
        <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
          <div className="container mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="h-6 w-64 bg-muted rounded-full animate-pulse" />
                <div className="h-16 w-full max-w-lg bg-muted rounded-2xl animate-pulse" />
                <div className="h-16 w-3/4 bg-muted rounded-2xl animate-pulse" />
                <div className="h-5 w-full max-w-md bg-muted rounded-lg animate-pulse" />
                <div className="h-5 w-3/4 max-w-md bg-muted rounded-lg animate-pulse" />
                <div className="flex gap-4 pt-4">
                  <div className="h-12 w-40 bg-muted rounded-full animate-pulse" />
                  <div className="h-12 w-40 bg-muted rounded-full animate-pulse" />
                </div>
              </div>
              <div className="relative lg:col-span-5">
                <div className="rounded-[40px] overflow-hidden border-8 border-white dark:border-slate-800 aspect-[4/5] md:aspect-square bg-muted animate-pulse" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-giat-blue/5 rounded-bl-[200px] hidden lg:block" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-giat-red rounded-full blur-[100px] -z-10"
        />

        <div className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase bg-giat-red/10 text-giat-red rounded-full"
              >
                {hero?.badge ?? settings?.site_name ?? "Koperasi Mahasiswa Telkom University"}
              </motion.span>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                {hero?.title ? (
                  <span dangerouslySetInnerHTML={{ __html: hero.title }} />
                ) : (
                  <>
                    Kebutuhan <br />
                    <span className="text-giat-red">Kampusmu</span>, <br />
                    Lebih Mudah.
                  </>
                )}
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
                {hero?.subtitle ?? hero?.description ?? "Tingkatkan pengalaman kuliahmu bersama GIAT. Dari seragam akademik hingga merchandise eksklusif Tel-U, kami menyediakan semua yang kamu butuhkan."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 bg-giat-red hover:bg-giat-red/90 text-white shadow-lg shadow-giat-red/20 group"
                  asChild
                >
                  <Link to={hero?.cta_primary_link ?? "/katalog"} className="flex items-center justify-center">
                    {hero?.cta_primary_text ?? "Lihat Katalog"}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 border-giat-blue text-giat-blue hover:bg-giat-blue/5 group"
                  asChild
                >
                  <a href={hero?.cta_secondary_link ?? shopeeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    {hero?.cta_secondary_text ?? "Kunjungi Shopee"}
                    <ShoppingCart className="ml-2 w-4 h-4 opacity-70" />
                  </a>
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {(hero?.avatars ?? [1, 2, 3, 4]).map((item: any, i: number) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <img 
                        src={typeof item === "object" ? item?.url : `https://picsum.photos/seed/user${i + 1}/100/100`} 
                        alt="User" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium">
                  <span className="text-giat-red font-bold">{hero?.stats_count ?? "1000+"}</span> {hero?.stats_label ?? "Mahasiswa terlayani semester ini"}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="relative lg:col-span-5"
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 aspect-[4/5] md:aspect-square">
                <img 
                  src={hero?.image ?? "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"} 
                  alt={hero?.image_alt ?? "Mahasiswa di Telkom University"} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                  <p className="text-sm font-medium opacity-80 mb-1">{hero?.featured_label ?? "Produk Unggulan"}</p>
                  <h3 className="text-2xl font-bold">{hero?.featured_title ?? "Seragam Resmi"}</h3>
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-giat-blue rounded-3xl -z-10" 
              />
              <motion.div 
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-giat-red/20 rounded-full blur-2xl -z-10" 
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
