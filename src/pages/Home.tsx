import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPage, fetchSettings } from "../services/cmsApi";
import { Hero } from "../components/home/Hero";

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
      <Hero data={hero} settings={settings} />
    </div>
  );
}
