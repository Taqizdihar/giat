import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { fetchPage, fetchSettings, extractContentBlock, CMS_SLUGS } from "../services/cmsApi";

export function CatalogPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("");
  const [shopeeUrl, setShopeeUrl] = useState("https://id.shp.ee/1uN1AdKC");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Katalog | GIAT";
    async function loadData() {
      const [pageData, settings] = await Promise.all([
        fetchPage(CMS_SLUGS.CATALOG),
        fetchSettings(),
      ]);
      if (settings?.shopee_url) setShopeeUrl(settings.shopee_url);
      if (pageData) {
        const catalogBlock = extractContentBlock(pageData, 'catalog', null) ?? extractContentBlock(pageData, 'products', null);
        const source = catalogBlock ?? pageData ?? {};
        const cats = source?.categories ?? [];
        const prods = source?.products ?? source?.items ?? [];
        const allCats = [{ id: 'all', category_name: "Semua Produk" }, ...cats];
        setCategories(allCats);
        setProducts(prods);
        setActiveTab('all');
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="pt-20">
      <section className="py-24 min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl md:text-5xl font-bold mb-4">
                Jelajahi <span className="text-giat-red">Katalog</span> Kami
              </motion.h2>
              <p className="text-muted-foreground">
                Produk berkualitas yang dikurasi untuk komunitas Telkom University. Temukan kebutuhanmu dari pakaian akademik hingga minuman segar sehari-hari.
              </p>
            </div>
            <Button variant="link" className="text-giat-blue dark:text-blue-400 font-bold p-0 h-auto group" onClick={() => window.open(shopeeUrl, "_blank")}>
              Lihat semua di Shopee
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="rounded-[24px] bg-background border shadow-sm overflow-hidden">
                  <div className="h-48 bg-muted animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 w-3/4 bg-muted rounded-lg animate-pulse" />
                    <div className="h-5 w-1/2 bg-muted rounded-lg animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12 text-slate-500">Kategori belum tersedia</div>
          ) : (
            <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
              <TabsList className="bg-muted/50 p-1 rounded-full mb-12 h-auto flex-wrap justify-start">
                {categories.map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id.toString()} className="rounded-full px-8 py-2.5 data-[state=active]:bg-giat-red data-[state=active]:text-white transition-all">
                    {cat.category_name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {categories.map((cat) => (
                <TabsContent key={cat.id} value={cat.id.toString()} className="mt-0">
                  {products.filter(p => cat.id === 'all' || p.category_id === cat.id).length === 0 ? (
                    <div className="text-center py-12 text-slate-500">Produk belum tersedia</div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.filter(p => cat.id === 'all' || p.category_id === cat.id).map((product, index) => (
                        <motion.div key={product.id ?? index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                          <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 group rounded-[24px] bg-background h-full flex flex-col">
                            <div className="relative h-48 overflow-hidden bg-muted/20 flex items-center justify-center">
                              {product.image_url ? (
                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400?text=Image+Unavailable"; }} />
                              ) : (
                                <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
                              )}
                              {product.stock_status && product.stock_status !== "Tersedia" && (
                                <div className="absolute top-4 left-4 bg-giat-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10 shadow-sm">{product.stock_status}</div>
                              )}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                                <Button className="rounded-full bg-white text-black hover:bg-white/90 gap-2" render={<Link to={`/produk/${product.id ?? product.slug ?? index}`} />}>
                                  Lihat Detail
                                </Button>
                              </div>
                            </div>
                            <CardContent className="p-5 flex-grow flex flex-col justify-between">
                              <h3 className="text-lg font-bold mb-2 group-hover:text-giat-red transition-colors line-clamp-2">{product.name}</h3>
                              <p className="text-giat-blue dark:text-blue-400 font-bold text-lg">Rp {Number(product.price).toLocaleString('id-ID')}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </section>
    </div>
  );
}
