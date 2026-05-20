import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ShoppingCart, MessageCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products and find the matching one
    axios.get("/api/products").then(res => {
      const foundProduct = res.data.find((p: any) => p.id.toString() === id);
      setProduct(foundProduct);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="pt-32 pb-24 text-center">Memuat produk...</div>;
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h2>
        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-slate-50 min-h-screen pb-24">
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          className="mb-8 text-giat-blue hover:text-giat-red hover:bg-transparent px-0 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
        </Button>

        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Image */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square md:aspect-auto md:h-full bg-muted/20 p-8 flex items-center justify-center"
            >
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded-2xl shadow-md"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-md" />
              )}
              {product.stock_status && product.stock_status !== "Tersedia" && (
                <div className="absolute top-8 left-8 bg-giat-red text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                  {product.stock_status}
                </div>
              )}
            </motion.div>

            {/* Right: Details */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 md:p-12 flex flex-col justify-center"
            >
              <div className="mb-6">
                <span className="text-giat-red font-semibold text-sm tracking-wider uppercase mb-2 block">
                  {product.category_name}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-giat-blue mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-slate-900">
                  Rp {Number(product.price).toLocaleString('id-ID')}
                </p>
              </div>

              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                  {product.stock_status || "Tersedia"}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <ShieldCheck className="w-4 h-4" />
                  Produk Resmi
                </div>
              </div>

              <div className="mb-8 flex-grow">
                <h3 className="text-lg font-bold text-giat-blue mb-3">Deskripsi Produk</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {product.description || "Tidak ada deskripsi."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  size="lg" 
                  className="flex-1 rounded-xl bg-giat-blue hover:bg-giat-blue/90 text-white shadow-lg shadow-giat-blue/20"
                  onClick={() => window.open("https://wa.me/6281200000000", "_blank")}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Pesan via WhatsApp
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="flex-1 rounded-xl border-giat-red text-giat-red hover:bg-red-50"
                  onClick={() => window.open("https://id.shp.ee/1uN1AdKC", "_blank")}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Beli di Shopee
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
