import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Wallet, PiggyBank, Briefcase, Building2, ShieldCheck, Gift,
  CheckCircle2, FileText, UserCheck, ArrowLeft, CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { fetchPage, extractContentBlock, CMS_SLUGS } from "../services/cmsApi";

const iconMap: Record<string, any> = {
  'Wallet': Wallet, 'PiggyBank': PiggyBank, 'Briefcase': Briefcase,
  'Building2': Building2, 'ShieldCheck': ShieldCheck, 'Gift': Gift,
};

export function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Detail Layanan | GIAT";
    async function loadData() {
      const data = await fetchPage(CMS_SLUGS.SERVICES);
      if (data) {
        const servicesBlock = extractContentBlock(data, 'services', null) ?? extractContentBlock(data, 'layanan', null);
        const source = servicesBlock ?? data ?? {};
        const items = source?.items ?? source?.services ?? data?.items ?? data?.services ?? [];
        const service = items.find((s: any) => (s.id ?? '').toString() === id || (s.slug ?? '') === id);
        if (service) {
          let parsedBenefits: string[] = [];
          let parsedRequirements: string[] = [];
          try { parsedBenefits = typeof service.benefits === "string" ? JSON.parse(service.benefits) : (service.benefits || []); } catch(e){}
          try { parsedRequirements = typeof service.requirements === "string" ? JSON.parse(service.requirements) : (service.requirements || []); } catch(e){}
          setActiveService({
            ...service,
            icon: iconMap[service.icon_name] || Wallet,
            benefits: parsedBenefits,
            requirements: parsedRequirements,
          });
        }
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <div className="pt-32 pb-24 text-center">Memuat detail layanan...</div>;

  if (!activeService) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold mb-4 text-giat-blue">Layanan tidak ditemukan</h2>
        <Button onClick={() => navigate(-1)} className="bg-giat-blue text-white">Kembali</Button>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
      <div className="container mx-auto px-6 py-12">
        <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Button variant="ghost" className="mb-8 text-giat-blue dark:text-blue-400 hover:text-giat-red dark:hover:text-red-400 hover:bg-transparent px-0 flex items-center gap-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" /> Kembali ke Layanan
          </Button>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <activeService.icon className="w-8 h-8 text-giat-red" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-giat-blue dark:text-blue-400 mb-4">{activeService.title}</h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">{activeService.description}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-giat-blue dark:text-blue-400 font-bold text-xl mb-4">
                  <CheckCircle2 className="w-6 h-6 text-giat-red" /> Manfaat Utama
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(activeService.benefits ?? []).map((benefit: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-giat-red mt-2 shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-giat-blue dark:text-blue-400 font-bold text-xl mb-4">
                  <FileText className="w-6 h-6 text-giat-red" /> Syarat Pengajuan
                </div>
                <div className="space-y-4">
                  {(activeService.requirements ?? []).map((req: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-giat-red font-bold">{idx + 1}.</span>
                      <span className="text-slate-600 dark:text-slate-400">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 sticky top-28">
                <div className="flex items-center gap-3 mb-8">
                  <UserCheck className="w-6 h-6 text-giat-red" />
                  <h3 className="text-xl font-bold text-giat-blue dark:text-blue-400">Alur Pengajuan</h3>
                </div>
                <div className="space-y-8">
                  {(activeService.steps ?? []).map((step: any, idx: number) => (
                    <div key={idx} className="relative flex items-start gap-6">
                      <div className="w-8 h-8 rounded-full bg-giat-red text-white flex items-center justify-center font-bold text-sm shrink-0 z-10 shadow-sm ring-4 ring-white">
                        {step.step_number || (idx + 1)}
                      </div>
                      <div>
                        <h4 className="text-giat-blue dark:text-blue-400 font-bold mb-1">{step.step_title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{step.step_description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button render={<Link to="/kontak#form" className="flex flex-row items-center justify-center w-full h-full gap-2" />} className="w-full mt-10 bg-giat-blue hover:bg-giat-blue/90 text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-giat-blue/20">
                  <CreditCard className="w-5 h-5 shrink-0" />
                  <span>Ajukan Sekarang</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
