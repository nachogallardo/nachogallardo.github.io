import { Terminal, Cpu, HardDrive, Unplug } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-green-500/10 py-12 relative overflow-hidden">
      {/* Local SVG Pattern - Matrix Dot Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='none'/%3E%3Ccircle cx='1' cy='1' r='1' fill='%230f0'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }}
      ></div>

      {/* Cinematic HUD separator line trace */}
      <div className="absolute top-0 left-1/2 -translateX-1/2 w-[90%] h-[1px] bg-gradient-to-r from-transparent via-green-500/10 to-transparent">
        <div className="absolute inset-0 bg-green-400/20 animate-shimmer scale-x-50"></div>
      </div>

      {/* Decorative HUD Corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-green-500/20"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-green-500/20"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-green-500/20"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-green-500/20"></div>

      {/* Internal Scanline Pulse */}
      <div className="absolute inset-x-0 top-0 h-[100%] w-[1px] bg-green-500/5 left-1/4 animate-scan-slow opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-6 border-b border-green-500/5">
          {/* Real-Time Terminal Logs */}
          <div className="flex flex-wrap justify-center gap-6 text-[9px] sm:text-[10px] font-mono text-green-500/40 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2 group cursor-default">
              <Terminal size={12} className="text-green-500/60 group-hover:text-green-400 transition-colors" />
              <span className="group-hover:text-green-500/60 transition-colors">SECURITY_PROTOCOL: <span className="text-green-500/80">AES-256-GCM</span></span>
            </div>
            <div className="flex items-center gap-2 group cursor-default">
              <Cpu size={12} className="text-green-500/60 group-hover:text-green-400 transition-colors" />
              <span className="group-hover:text-green-500/60 transition-colors">KERNEL_VER: <span className="text-green-500/80">NEXT_V15.1_STABLE</span></span>
            </div>
            <div className="flex items-center gap-2 group cursor-default">
              <HardDrive size={12} className="text-green-500/60 group-hover:text-green-400 transition-colors" />
              <span className="group-hover:text-green-500/60 transition-colors">IO_STATUS: <span className="text-green-500/80">BUFF_SECURE</span></span>
            </div>
            <div className="flex items-center gap-2 group cursor-default">
              <Unplug size={12} className="text-green-500/60 group-hover:text-green-400 transition-colors" />
              <span className="group-hover:text-green-500/60 transition-colors">SYNC: <span className="text-green-400">READY</span></span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/5 border border-green-500/20 rounded-none relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-500/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="w-1.5 h-1.5 bg-green-500 animate-pulse shadow-[0_0_8px_#0f0]"></div>
            <span className="text-[10px] font-mono text-green-500 tracking-[0.3em] uppercase italic group-hover:text-green-400 transition-colors">E_O_F: VALIDATED</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-green-500/40 uppercase tracking-widest text-center md:text-left">
            &copy; {currentYear} Ignacio Gallardo Sánchez // <span className="text-green-500/20 italic">Desarrollo de Sistemas Java y HUD Interfaces</span>
          </p>
          <div className="flex gap-4">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
            <div className="w-2 h-2 border border-green-500/20"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
