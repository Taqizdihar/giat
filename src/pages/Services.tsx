import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Wallet, PiggyBank, Briefcase, Building2, ShieldCheck, Gift, ChevronRight
} from "lucide-react";
import axios from "axios";

export function Services() {
  const [servicesData, setServicesData] = useState<any[]>([]);

  useEffect(() => {
    document.title = "Layanan | GIAT";
    axios.get("/api/services").then(res => {
      const iconMap: any = {
        'Wallet': Wallet,
        'PiggyBank': PiggyBank,
        'Briefcase': Briefcase,
        'Building2': Building2,
        'ShieldCheck': ShieldCheck,
        'Gift': Gift
      };
      
      const mappedData = res.data.map((item: any) => ({
        ...item,
        icon: iconMap[item.icon_name] || Wallet,
      }));
      setServicesData(mappedData);
    }).catch(console.error);
  }, []);

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          key="grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-giat-blue dark:text-blue-400">
              Layanan <span className="text-giat-red">Kami</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Solusi finansial dan pemberdayaan komprehensif yang dirancang khusus 
              untuk meningkatkan kesejahteraan seluruh anggota Koperasi GIAT.
            </p>
          </div>

          {servicesData.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              Layanan belum tersedia
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link to={`/layanan/${service.id}`} key={service.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all group h-full cursor-pointer flex flex-col"
                    >
                      <div className="w-14 h-14 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-giat-red" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-giat-blue dark:text-blue-400 group-hover:text-giat-red transition-colors flex-grow">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-3">
                        {service.description}
                      </p>
                      <div className="flex items-center text-giat-red font-semibold text-sm mt-auto">
                        Lihat Detail <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
