import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Handshake, TrendingUp, Users } from "lucide-react";
import { useEffect } from "react";

export function PartnershipPage() {
  useEffect(() => {
    document.title = "Kemitraan | GIAT";
  }, []);
  return (
    <div className="pt-20">
      <section className="py-24 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
        <div className="container mx-auto px-6">
          <div className="bg-giat-red rounded-[48px] p-8 md:p-16 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-giat-blue/20 rounded-full blur-3xl" />

            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Mari Berkembang <br /> Bersama.
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-md">
                  Apakah kamu seorang mahasiswa pengusaha atau vendor? Bermitralah dengan GIAT 
                  untuk konsinyasi F&B dan jangkau ribuan mahasiswa setiap harinya.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="rounded-full bg-white text-giat-red hover:bg-white/90 font-bold px-8">
                    Menjadi Mitra
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-giat-red px-8">
                    Pelajari Lebih Lanjut
                  </Button>
                </div>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20"
                >
                  <Handshake className="w-10 h-10 mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">Konsinyasi</h3>
                  <p className="text-sm text-white/70">
                    Jual makanan ringan dan minumanmu di lokasi kampus kami yang strategis.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20"
                >
                  <TrendingUp className="w-10 h-10 mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">Lalu Lintas Tinggi</h3>
                  <p className="text-sm text-white/70">
                    Akses langsung ke mahasiswa dan staf Telkom University.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20"
                >
                  <Users className="w-10 h-10 mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">Dukungan</h3>
                  <p className="text-sm text-white/70">
                    Kami menyediakan dukungan pemasaran dan manajemen profesional.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 flex items-center justify-center"
                >
                  <p className="text-center font-bold text-2xl">Bergabunglah dengan 50+ <br /> Mitra</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
