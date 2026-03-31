import { ArrowRight, Mail, Heart, BookOpen } from 'lucide-react';

export default function MicrosoftStyleHero() {
  return (
    <div className="bg-neutral-50">
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-12">
        {/* Grid: 2 cols on mobile, 5 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 h-auto lg:h-[336px]">
          
          {/* Left: Large Card - Education */}
          <a
            href="/learn"
            className="group col-span-2 lg:col-span-3 lg:row-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] lg:min-h-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="min-h-0 flex flex-col flex-1">
              <span className="inline-block w-fit px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase mb-4 shadow-sm border border-white/10">
                Yeni Eğitimler
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight leading-tight">
                AI Teknolojilerini<br className="hidden sm:block" /> Sıfırdan Öğren
              </h2>
              <p className="text-sm sm:text-base text-white/90 mb-6 line-clamp-2 max-w-md font-medium">
                Uygulamalı dersler, interaktif projeler ve gerçek dünya senaryoları ile yapay zekada uzmanlaş
              </p>
            </div>

            <div className="flex-shrink-0 mt-4 lg:mt-0">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-neutral-900 font-bold text-[14px] shadow-lg group-hover:bg-neutral-50 group-hover:scale-105 transition-all">
                Daha Fazla
                <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </div>

            <div className="absolute top-6 right-6 w-32 h-32 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-6 right-12 w-40 h-40 rounded-full bg-teal-300/20 blur-3xl pointer-events-none" />
          </a>

          {/* Right Top: Bültene kaydol */}
          <a
            href="#bülten"
            className="group col-span-2 lg:col-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-300 to-yellow-400 p-6 flex flex-col justify-between min-h-[140px] lg:min-h-0 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="min-h-0 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/10 text-neutral-900 text-[10px] font-extrabold tracking-wider mb-2 w-fit">
                <Mail className="w-3 h-3" />
                BÜLTEN
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900 leading-tight mb-1">
                Bültene Kaydol
              </h3>
              <p className="text-xs text-neutral-800 font-medium opacity-90">
                AI haberleri, yeni araçlar ve ipuçları anında e-postanızda.
              </p>
            </div>

            <div className="flex-shrink-0 mt-4 lg:mt-2">
              <span className="inline-flex items-center gap-1.5 text-neutral-900 text-[12px] font-bold group-hover:gap-2.5 transition-all">
                Üye Ol
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="absolute -bottom-3 -right-3 w-28 h-28 rounded-full bg-white/30 blur-2xl pointer-events-none" />
          </a>

          {/* Right Bottom Left: Blog */}
          <a
            href="/blog"
            className="group col-span-1 relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-400 to-red-500 p-5 flex flex-col justify-between min-h-[140px] lg:min-h-0 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-2 shadow-inner">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-extrabold text-white truncate">Rehberler</h3>
              <p className="text-[11px] font-medium text-white/90 truncate">Yazılar & İpuçları</p>
            </div>

            <div className="flex-shrink-0 mt-4 lg:mt-2">
              <span className="inline-flex items-center gap-1.5 text-white text-[12px] font-bold group-hover:gap-2.5 transition-all">
                Oku
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full bg-white/20 blur-2xl pointer-events-none" />
          </a>

          {/* Right Bottom Right: İletişim */}
          <a
            href="mailto:hello@yapaylar.com"
            className="group col-span-1 relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-5 flex flex-col justify-between min-h-[140px] lg:min-h-0 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-2 shadow-inner">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-extrabold text-white truncate">İletişim</h3>
              <p className="text-[11px] font-medium text-white/90 truncate">Size nasıl yardım edebiliriz?</p>
            </div>

            <div className="flex-shrink-0 mt-4 lg:mt-2">
              <span className="inline-flex items-center gap-1.5 text-white text-[12px] font-bold group-hover:gap-2.5 transition-all">
                Bize Ulaşın
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full bg-white/20 blur-2xl pointer-events-none" />
          </a>
        </div>
      </section>
    </div>
  );
}
