"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Home() {
  const [storageUsed, setStorageUsed] = useState(24);
  const [isUploading, setIsUploading] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [files, setFiles] = useState([
    { name: "document-important.pdf", size: "2.4 MB" },
    { name: "fotografie.jpg", size: "4.8 MB" }
  ]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsNavHidden((scrollY.getPrevious() ?? 0) < latest && latest > 80);
  });

  const handleSimulateUpload = () => {
    if (isUploading) return;
    setIsUploading(true);
    setTimeout(() => {
      setFiles(prev => [{ name: `proiect-nou-${Math.floor(Math.random() * 100)}.zip`, size: "14.2 MB" }, ...prev]);
      setStorageUsed(prev => Math.min(prev + 8, 100));
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 font-sans text-zinc-200 overflow-x-hidden selection:bg-indigo-500 selection:text-white px-4 pb-24 sm:pb-4">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse duration-[8s]" />
        <div className="absolute top-[30%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      {/* NAVBAR RESPONSIVE: HIDE PE PC / JOS PE MOBIL VIA TAILWIND ONLY */}
      <motion.nav 
        animate={isNavHidden ? { y: "-110%", opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed top-4 max-sm:top-auto max-sm:bottom-4 max-sm:!transform-none inset-x-0 z-50 max-w-4xl mx-auto px-2 sm:px-0"
      >
        <div className="flex items-center justify-between bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/60 rounded-2xl px-5 py-3 shadow-lg shadow-black/40">
          <div className="flex items-center gap-2 font-black text-white text-base sm:text-lg tracking-tight">
            <span className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold">N</span>
            NextData<span className="text-indigo-500">.ro</span>
          </div>
          <div className="flex items-center gap-6 text-xs sm:text-sm text-zinc-400 font-medium">
            <a href="#drive" className="hover:text-white transition-colors">Aplicație</a>
            <a href="#features" className="hover:text-white transition-colors">Beneficii</a>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] sm:text-xs px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold shadow-md shadow-indigo-600/20">Cont Nou</button>
          </div>
        </div>
      </motion.nav>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto pt-24 sm:pt-32 pb-24 text-center flex flex-col items-center z-10 relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 border border-indigo-500/20 backdrop-blur-md mb-6">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" /> 2 GB Spațiu Gratuit Inclus
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6 max-w-3xl">
          Fișierele tale. Simplu. Privat. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.25)]">În cloud-ul românesc.</span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed mb-10">
          NextData oferă un spațiu simplu și sigur pentru documente, fotografii și fișiere importante. Fără interfețe complicate.
        </p>

        {/* WIDGET DASHBOARD */}
        <div className="w-full max-w-xl bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-md shadow-2xl mb-16 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Dashboard</span>
            <span className="text-xs text-zinc-400">Spațiu: <strong className="text-white">{storageUsed}%</strong></span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full mb-6 overflow-hidden">
            <motion.div animate={{ width: `${storageUsed}%` }} className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </div>
          <div onClick={handleSimulateUpload} className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${isUploading ? 'border-indigo-500 bg-indigo-500/5' : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/20'}`}>
            <div className="text-3xl mb-2">☁</div>
            <p className="text-sm font-medium text-zinc-200">{isUploading ? "Se încarcă..." : "Apasă aici pentru un upload rapid"}</p>
          </div>
          <div className="mt-6 space-y-2">
            {files.map((file, i) => (
              <div key={i} className="flex justify-between items-center text-xs bg-zinc-900/60 border border-zinc-800/50 p-2.5 rounded-xl">
                <span className="text-zinc-300 font-mono truncate max-w-[200px]">📄 {file.name}</span>
                <span className="text-zinc-500 bg-zinc-800/40 px-2 py-0.5 rounded-md font-medium">{file.size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP APP DOWNLOAD */}
        <div id="drive" className="w-full bg-zinc-900/20 border border-zinc-900 p-8 rounded-3xl backdrop-blur-sm mb-16 text-center scroll-mt-24">
          <h2 className="text-2xl font-bold text-white mb-2">NextData Drive Desktop</h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">Sincronizează folderul local direct în Finder sau File Explorer.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs px-5 py-3 rounded-xl">🍏 macOS Beta</button>
            <button className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs px-5 py-3 rounded-xl">🪟 Windows Beta</button>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left">
          <div className="rounded-2xl border border-zinc-800/80 p-5 bg-zinc-900/30 hover:border-indigo-500/30 transition-colors">
            <div className="text-lg mb-2">🔒</div>
            <h3 className="font-bold text-white mb-1 text-sm">Spațiu Privat</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Datele rămân ale tale, protejate fără expunere publică.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800/80 p-5 bg-zinc-900/30 hover:border-purple-500/30 transition-colors">
            <div className="text-lg mb-2">⚡</div>
            <h3 className="font-bold text-white mb-1 text-sm">Upload Simplu</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Încarci rapid fișierul și îl ai instant în dashboard.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800/80 p-5 bg-zinc-900/30 hover:border-pink-500/30 transition-colors">
            <div className="text-lg mb-2">🤝</div>
            <h3 className="font-bold text-white mb-1 text-sm">Suport Uman</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Acces la o echipă dedicată când ai nevoie de ajutor.</p>
          </div>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto py-8 border-t border-zinc-900 text-center sm:text-left text-xs text-zinc-600 flex flex-col sm:flex-row justify-between gap-4 z-10 relative">
        <div>© 2026 NextData • WINSYS COMPUTERS SRL (pulica franaru)</div>
        <div className="flex gap-4 justify-center">
          <a href="#" className="hover:text-zinc-400">Termeni</a>
          <a href="#" className="hover:text-zinc-400">Confidențialitate</a>
        </div>
      </footer>
    </div>
  );
}
