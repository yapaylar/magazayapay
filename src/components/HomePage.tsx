import { useState, useRef, useEffect, useMemo } from 'react';
import { BookOpen, ArrowRight, Star, ChevronRight, Play, Clock, Mic } from 'lucide-react';
import toolsData from '../data/tools.json';
import coursesData from '../data/courses.json';

// --- TİP TANIMLAMALARI ---
interface Tool {
  id: string;
  name: string;
  tagline: string;
  category: string;
  emoji: string;
  logo?: string;
  video?: string;
  poster?: string;
  votes: number;
  rating?: number;
  pricing: string;
  tags: string[];
  addedDate: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  emoji: string;
  logo?: string;
  featured: boolean;
  lessons: any[];
}

// --- YARDIMCI FONKSİYONLAR ---
function isNew(dateStr: string) {
  const added = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}

function getPricingLabel(pricing: string) {
  if (pricing === 'free') return 'Ücretsiz';
  if (pricing === 'freemium') return 'Freemium';
  return 'Ücretli';
}

function getPricingStyle(pricing: string) {
  if (pricing === 'free') return 'text-emerald-700 bg-emerald-50 border-emerald-100';
  if (pricing === 'freemium') return 'text-blue-700 bg-blue-50 border-blue-100';
  return 'text-neutral-600 bg-neutral-100 border-neutral-200';
}

// --- ATOMİK BİLEŞENLER ---

const RatingBadge = ({ rating }: { rating?: number }) => (
  <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-600 bg-white border border-neutral-200 px-1.5 py-0.5 rounded-md shadow-sm">
    <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
    <span>{rating != null ? rating.toFixed(1) : '—'}</span>
  </div>
);

const PricingBadge = ({ pricing }: { pricing: string }) => (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPricingStyle(pricing)}`}>
    {getPricingLabel(pricing)}
  </span>
);

function ToolLogo({ tool, imgClassName = '', emojiClassName = '' }: { tool: Tool; imgClassName?: string; emojiClassName?: string }) {
  const [failed, setFailed] = useState(false);
  const showImg = tool.logo && !failed;
  if (showImg) return <img src={tool.logo} alt="" className={imgClassName} onError={() => setFailed(true)} />;
  return <span className={emojiClassName} aria-hidden>{tool.emoji}</span>;
}

function LazyVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.src = src; }, { rootMargin: '100px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [src]);
  return <video ref={ref} poster={poster} className={className} controls playsInline preload="none" muted />;
}

// --- FİLTRELEME BİLEŞENİ ---
const FILTER_TABS = [
  { key: 'all', label: 'Tümü' },
  { key: 'paid', label: 'Ücretli' },
  { key: 'free', label: 'Ücretsiz' },
] as const;

function FilterTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: 'all' | 'paid' | 'free') => void }) {
  return (
    <div className="flex p-1 bg-neutral-100 rounded-lg inline-flex mb-6 self-start">
      {FILTER_TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-all duration-200 ${
            activeTab === tab.key
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// --- KART BİLEŞENLERİ ---

/**
 * 1. App Store Square Card (Görsel & Ses için)
 * Kare form, üstte ikon, altta bilgiler. App Store 'Apps' sekmesi tarzı.
 */
function AppStoreSquareCard({ tool }: { tool: Tool }) {
  return (
    <a href={`/tools/${tool.id}`} className="group flex flex-col h-full bg-white rounded-[20px] border border-neutral-200 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Üst Kısım: Logo ve Zemin */}
      <div className="aspect-square rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-4 overflow-hidden relative group-hover:bg-neutral-100 transition-colors">
        <div className="w-16 h-16 rounded-xl bg-white shadow-sm border border-neutral-100 flex items-center justify-center">
            <ToolLogo tool={tool} imgClassName="w-full h-full object-contain p-2" emojiClassName="text-4xl" />
        </div>
        {isNew(tool.addedDate) && (
            <span className="absolute top-2 right-2 text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">YENİ</span>
        )}
      </div>

      {/* Alt Kısım: Bilgiler */}
      <div className="flex flex-col flex-1">
        <h3 className="text-[16px] font-bold text-neutral-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
        <p className="text-[13px] text-neutral-500 line-clamp-2 leading-snug mb-3">{tool.tagline}</p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-neutral-50">
          <PricingBadge pricing={tool.pricing} />
          <RatingBadge rating={tool.rating} />
        </div>
      </div>
    </a>
  );
}

/**
 * 2. Video Card (Video İçin)
 * 16:9 Thumbnail üstte, bilgiler altta.
 */
function VideoAppCard({ tool }: { tool: Tool }) {
  return (
    <a href={`/tools/${tool.id}`} className="group block w-[280px] sm:w-[320px] shrink-0 snap-center bg-white rounded-2xl border border-neutral-200 p-3 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Thumbnail Alanı */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-100 mb-3">
        {tool.video ? (
          <LazyVideo src={tool.video} poster={tool.poster} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100">
             <ToolLogo tool={tool} imgClassName="w-12 h-12 opacity-40 grayscale" emojiClassName="text-4xl opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
           <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center">
             <Play className="w-4 h-4 text-neutral-900 ml-0.5" />
           </div>
        </div>
      </div>

      {/* Bilgi Alanı */}
      <div className="px-1 pb-1">
        <div className="flex justify-between items-start mb-1">
            <h3 className="text-[16px] font-bold text-neutral-900 truncate pr-2 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
            <RatingBadge rating={tool.rating} />
        </div>
        <p className="text-[13px] text-neutral-500 line-clamp-1 mb-3">{tool.tagline}</p>
        <PricingBadge pricing={tool.pricing} />
      </div>
    </a>
  );
}

/**
 * 3. Coding Card
 * Teknik görünüm ama rozetler eklenmiş.
 */
function CodingCard({ tool }: { tool: Tool }) {
  return (
    <a href={`/tools/${tool.id}`} className="group flex flex-col w-[260px] h-[180px] shrink-0 snap-start bg-white rounded-xl border border-neutral-200 hover:border-indigo-400 hover:shadow-md transition-all duration-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/10 group-hover:bg-indigo-500 transition-colors" />
      <div className="p-4 flex flex-col h-full pl-5">
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-neutral-50 border border-neutral-100 flex items-center justify-center">
                    <ToolLogo tool={tool} imgClassName="w-5 h-5 object-contain" emojiClassName="text-lg" />
                </div>
                <h3 className="text-[15px] font-bold text-neutral-900 group-hover:text-indigo-600 truncate max-w-[120px]">{tool.name}</h3>
            </div>
        </div>

        <p className="text-[12px] text-neutral-500 leading-relaxed line-clamp-2 mb-auto">{tool.tagline}</p>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed border-neutral-100">
             <PricingBadge pricing={tool.pricing} />
             <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
               <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
               {tool.rating != null ? tool.rating.toFixed(1) : '—'}/5.0
             </div>
        </div>
      </div>
    </a>
  );
}

/**
 * 4. Compact Row Card (Eski yüksekliğe/sıkılığa geri döndü)
 * Yeni Çıkanlar için.
 */
function ToolCardCompact({ tool }: { tool: Tool }) {
  const isNewTool = isNew(tool.addedDate);
  return (
    <a href={`/tools/${tool.id}`} className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 hover:border-neutral-300 hover:shadow-md transition-all duration-200 h-[84px]">
      <div className="w-12 h-12 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0">
        <ToolLogo tool={tool} imgClassName="w-full h-full object-contain p-1.5" emojiClassName="text-xl" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-[14px] font-bold text-neutral-900 truncate group-hover:text-neutral-700">{tool.name}</h3>
          {isNewTool && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />}
        </div>
        <p className="text-[12px] text-neutral-500 truncate">{tool.category}</p>
        <div className="flex items-center gap-2 mt-1">
             <span className={`text-[9px] px-1.5 rounded-sm border ${getPricingStyle(tool.pricing)}`}>{getPricingLabel(tool.pricing)}</span>
        </div>
      </div>
    </a>
  );
}

// --- SECTION YÖNETİCİLERİ (Filtreleme Mantığı Burada) ---

/** En Popüler bloğundaki satır kartı (sıra no + logo + isim/kategori + rating + fiyat) */
function PopularStyleRowCard({ tool, rank }: { tool: Tool; rank: number }) {
  return (
    <a
      href={`/tools/${tool.id}`}
      className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md hover:border-neutral-200 border border-transparent transition-all duration-200"
    >
      <span className="text-lg font-bold text-neutral-300 w-6 text-center tabular-nums">{(rank)}</span>
      <div className="w-10 h-10 rounded-lg bg-white border border-neutral-200 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
        <ToolLogo tool={tool} imgClassName="w-full h-full object-contain p-1.5" emojiClassName="text-lg" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] font-bold text-neutral-900 truncate group-hover:text-blue-600">{tool.name}</h3>
        <p className="text-[12px] text-neutral-500 truncate">{tool.category}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <RatingBadge rating={tool.rating} />
        <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getPricingStyle(tool.pricing)}`}>{getPricingLabel(tool.pricing)}</span>
      </div>
    </a>
  );
}

function FilterableSection({
    title,
    subtitle,
    tools,
    type = 'square',
    sectionId
}: {
    title: string;
    subtitle: string;
    tools: Tool[];
    type?: 'square' | 'video' | 'coding' | 'grid';
    sectionId: string;
}) {
  const [filter, setFilter] = useState<'all' | 'paid' | 'free'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filtreleme Mantığı
  const filteredTools = useMemo(() => {
    return tools.filter(t => {
        if (filter === 'all') return true;
        if (filter === 'paid') return t.pricing === 'paid';
        if (filter === 'free') return t.pricing === 'free' || t.pricing === 'freemium';
        return true;
    });
  }, [tools, filter]);

  const chunked = useMemo(() => {
    if (type !== 'grid') return [];
    const size = Math.ceil(filteredTools.length / 3);
    return [filteredTools.slice(0, size), filteredTools.slice(size, size * 2), filteredTools.slice(size * 2)];
  }, [type, filteredTools]);

  const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  if (!tools.length) return null;

  return (
    <section className="py-12 border-t border-neutral-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
        <p className="text-[15px] text-neutral-500 mt-1">{subtitle}</p>
        <div className="mt-3">
          <FilterTabs activeTab={filter} onTabChange={setFilter} />
        </div>
      </div>

      {type === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {filteredTools.length > 0 ? (
            chunked.map((col, idx) => {
              const startRank = chunked.slice(0, idx).reduce((acc, c) => acc + c.length, 0);
              return (
                <div key={idx} className="flex flex-col gap-3">
                  {col.map((tool, i) => (
                    <PopularStyleRowCard key={tool.id} tool={tool} rank={startRank + i + 1} />
                  ))}
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8 text-neutral-400 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
              Bu filtrede araç bulunamadı.
            </div>
          )}
        </div>
      ) : (
        <div className="relative group/section">
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth scrollbar-hide snap-x snap-mandatory">
            {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <div key={tool.id} className={`${type === 'square' ? 'w-[220px] sm:w-[240px]' : 'w-auto'} shrink-0 snap-start h-full`}>
                      {type === 'square' && <AppStoreSquareCard tool={tool} />}
                      {type === 'video' && <VideoAppCard tool={tool} />}
                      {type === 'coding' && <CodingCard tool={tool} />}
                  </div>
                ))
            ) : (
                <div className="w-full text-center py-8 text-neutral-400 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
                    Bu filtrede araç bulunamadı.
                </div>
            )}
            <div className="w-4 shrink-0" />
          </div>

          {filteredTools.length > 3 && (
              <button onClick={scrollRight} className="hidden sm:flex absolute -right-5 top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)] items-center justify-center text-neutral-700 hover:scale-105 transition-all opacity-0 group-hover/section:opacity-100">
                <ChevronRight className="w-6 h-6 ml-0.5" />
              </button>
          )}
        </div>
      )}
    </section>
  );
}

function PopularSection({ tools }: { tools: Tool[] }) {
    const [filter, setFilter] = useState<'all' | 'paid' | 'free'>('all');

    const filtered = useMemo(() => {
        let list = tools;
        if (filter === 'paid') list = tools.filter(t => t.pricing === 'paid');
        if (filter === 'free') list = tools.filter(t => t.pricing === 'free' || t.pricing === 'freemium');
        return list.sort((a, b) => b.votes - a.votes).slice(0, 9);
    }, [tools, filter]);

    const chunked = useMemo(() => {
        const size = Math.ceil(filtered.length / 3);
        return [filtered.slice(0, size), filtered.slice(size, size * 2), filtered.slice(size * 2)];
    }, [filtered]);

    return (
        <section className="py-12">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">En Popüler</h2>
                <p className="text-[15px] text-neutral-500 mt-1">Topluluk tarafından onaylanmış en iyi araçlar.</p>
                <div className="mt-3">
                    <FilterTabs activeTab={filter} onTabChange={setFilter} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                {chunked.map((col, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                        {col.map((tool, i) => (
                            <a key={tool.id} href={`/tools/${tool.id}`} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md hover:border-neutral-200 border border-transparent transition-all duration-200">
                                <span className="text-lg font-bold text-neutral-300 w-6 text-center tabular-nums">{(idx * 3) + i + 1}</span>
                                <div className="w-10 h-10 rounded-lg bg-white border border-neutral-200 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                                    <ToolLogo tool={tool} imgClassName="w-full h-full object-contain p-1.5" emojiClassName="text-lg" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[14px] font-bold text-neutral-900 truncate group-hover:text-blue-600">{tool.name}</h3>
                                    <p className="text-[12px] text-neutral-500 truncate">{tool.category}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                     <RatingBadge rating={tool.rating} />
                                     <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getPricingStyle(tool.pricing)}`}>{getPricingLabel(tool.pricing)}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

// --- ANA SAYFA ---

function MustHaveScrollRow({ tools }: { tools: Tool[] }) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {tools.map((tool) => (
          <a key={tool.id} href={`/tools/${tool.id}`} className="group flex flex-col items-center text-center rounded-[20px] border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-[72px] h-[72px] rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden mb-3 group-hover:scale-105 transition-transform shrink-0">
              <ToolLogo tool={tool} imgClassName="w-full h-full object-contain p-2" emojiClassName="text-3xl" />
            </div>
            <h3 className="text-[14px] font-bold text-neutral-900 line-clamp-1 mb-2 w-full">{tool.name}</h3>
            <div className="mt-auto flex flex-col items-center gap-1.5 w-full">
              <span className="flex items-center gap-1 text-[12px] font-semibold text-neutral-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                {tool.rating != null ? tool.rating.toFixed(1) : '—'}
              </span>
              <PricingBadge pricing={tool.pricing} />
            </div>
          </a>
        ))}
      </div>
    );
  }

export default function HomePage() {
  const tools = toolsData as Tool[];
  const courses = coursesData as Course[];

  const newTools = [...tools].sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()).slice(0, 5);
  const mustHaveTools = [...tools].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0)).slice(0, 6);

  const videoTools = tools.filter((t) => t.category === 'Video');
  const visualTools = tools.filter((t) => t.category === 'Görsel');
  const audioTools = tools.filter((t) => t.category === 'Ses');
  const codingTools = tools.filter((t) => t.category === 'Kodlama');

  const featuredCourses = courses.filter((c) => c.featured);

  return (
    <div className="bg-[#F5F5F7] min-h-screen pb-20 font-sans"> {/* Apple-like açık gri arka plan */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* HERO */}
        <section className="pt-12 pb-8">
            <div className="mb-6">
                <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-md">Seçkiler</span>
                <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mt-2">Herkes Kullanıyor</h1>
            </div>
            <MustHaveScrollRow tools={mustHaveTools} />
        </section>

        {/* YENİLER (Grid Yüksekliği Düzeltildi) */}
        <section className="pb-12 border-b border-neutral-200">
          <div className="mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Yeni Çıkanlar</h2>
              <p className="text-[15px] text-neutral-500">Bu hafta keşfedilen en taze araçlar.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
              {newTools.slice(0, 4).map((tool) => <ToolCardCompact key={tool.id} tool={tool} />)}
            </div>
            {/* Sağdaki büyük kart (sol blokla aynı yükseklik: 2×84px + gap ≈ 180px) */}
            {newTools.length > 4 && (
                <a href={`/tools/${newTools[4].id}`} className="group relative block w-full h-[180px] rounded-2xl overflow-hidden bg-neutral-900">
                    <img src={newTools[4].poster || newTools[4].logo || ''} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                        <span className="text-[10px] font-bold bg-white/20 backdrop-blur text-white px-2 py-0.5 rounded uppercase mb-2 inline-block">Öne Çıkan</span>
                        <h3 className="text-2xl font-bold text-white mb-1">{newTools[4].name}</h3>
                        <p className="text-neutral-300 text-sm line-clamp-2 mb-3">{newTools[4].tagline}</p>
                        <div className="flex gap-2">
                            <PricingBadge pricing={newTools[4].pricing} />
                        </div>
                    </div>
                </a>
            )}
          </div>
        </section>

        {/* POPÜLER (Filtreli) */}
        <PopularSection tools={tools} />

        {/* VİDEO (Filtreli) */}
        <FilterableSection
            title="Video Üretimi"
            subtitle="AI ile video oluşturma ve düzenleme stüdyosu."
            tools={videoTools}
            type="video"
            sectionId="video"
        />

        {/* KODLAMA (Filtreli) */}
        <FilterableSection
            title="Kodlama Araçları"
            subtitle="Yazılımcılar için verimlilik araçları."
            tools={codingTools}
            type="coding"
            sectionId="coding"
        />

        {/* GÖRSEL (En Popüler ile aynı grid + satır kartı) */}
        <FilterableSection
            title="Görsel Tasarım"
            subtitle="Metinden görsele, tasarım ve düzenleme araçları."
            tools={visualTools}
            type="grid"
            sectionId="visual"
        />

        {/* SES (En Popüler ile aynı grid + satır kartı) */}
        <FilterableSection
            title="Ses ve Müzik"
            subtitle="Ses klonlama, temizleme ve müzik prodüksiyonu."
            tools={audioTools}
            type="grid"
            sectionId="audio"
        />

        {/* EĞİTİM (Tasarım aynı kaldı, premium liste) */}
        <section className="py-16 mt-8 border-t border-neutral-200">
           <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Akademi</span>
                <h2 className="text-3xl font-bold text-neutral-900 mt-1">Öğrenme Yolları</h2>
              </div>
              <a href="/learn" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Tümünü gör →</a>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map(course => {
                 const previewVimeoId = course.lessons?.[0]?.vimeoId;
                 return (
                 <a key={course.id} href={`/courses/${course.id}`} className="group bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="w-full aspect-video rounded-xl bg-neutral-100 flex items-center justify-center mb-5 overflow-hidden relative border border-neutral-100 pointer-events-none">
                       {previewVimeoId ? (
                         <iframe 
                           src={`https://player.vimeo.com/video/${previewVimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`} 
                           className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2"
                           frameBorder="0" 
                           allow="autoplay; fullscreen; picture-in-picture"
                         />
                       ) : (
                         <span className="text-5xl">{course.emoji}</span>
                       )}
                       <span className="absolute top-3 left-3 text-[10px] font-bold bg-white/90 backdrop-blur-sm text-neutral-800 px-2 py-1 rounded shadow-sm">{course.level}</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-4 group-hover:text-blue-600 line-clamp-2">{course.title}</h3>
                    <div className="flex items-center gap-3 text-xs font-medium text-neutral-400 pt-3 border-t border-neutral-100">
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.lessons.length} Ders</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                    </div>
                 </a>
                 );
              })}
           </div>
        </section>

      </div>
    </div>
  );
}
