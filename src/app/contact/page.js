import Link from 'next/link';
import { ArrowLeft, MessageCircle, Globe, Shield } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-inner mb-4 text-emerald-500">
              <Shield size={32} />
           </div>
           <h1 className="text-2xl font-bold text-white">BynexHost Support</h1>
           <p className="text-slate-400 mt-2 text-sm">Having server issues? Contact us immediately.</p>
        </div>

        <div className="space-y-4">
          <a href="https://discord.gg/jw5nNY9GSC" target="_blank" className="group flex items-center justify-between p-4 bg-[#5865F2] hover:bg-[#4752C4] rounded-xl text-white transition-all shadow-lg hover:shadow-[#5865F2]/30">
             <div className="flex items-center gap-3">
               <MessageCircle className="fill-white" />
               <span className="font-bold">Discord Community</span>
             </div>
             <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>

          <a href="" target="_blank" className="group flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl text-white transition-all">
             <div className="flex items-center gap-3">
               <Globe className="text-emerald-400" />
               <span className="font-bold">Official Website ( None )</span>
             </div>
             <span className="text-slate-500 group-hover:text-white transition-colors">→</span>
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <Link href="/" className="text-slate-500 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors">
            <ArrowLeft size={14} /> Back To Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}