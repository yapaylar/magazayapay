import { useState, useMemo } from 'react';
import { Search, Tag, TrendingUp, Sparkles, DollarSign } from 'lucide-react';
import toolsData from '../data/tools.json';

interface Tool {
  id: string;
  name: string;
  tagline: string;
  category: string;
  emoji: string;
  logo?: string;
  votes: number;
  featured: boolean;
  pricing: 'free' | 'freemium' | 'paid';
  tags: string[];
  addedDate: string;
}

const CATEGORIES = [
  { key: 'Tümü', label: 'Tümü' },
  { key: 'Metin', label: 'Metin' },
  { key: 'Görsel', label: 'Görsel' },
  { key: 'Video', label: 'Video' },
  { key: 'Kodlama', label: 'Kodlama' },
  { key: 'Ses', label: 'Ses' },
];

const QUICK_FILTERS = [
  { key: 'popular', label: 'Popüler', icon: '🔥' },
  { key: 'new', label: 'Yeni', icon: '🆕' },
  { key: 'free', label: 'Ücretsiz', icon: '💚' },
];

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

function getPricingColor(pricing: string) {
  if (pricing === 'free') return 'text-green-700 bg-green-50';
  if (pricing === 'freemium') return 'text-blue-700 bg-blue-50';
  return 'text-neutral-600 bg-neutral-100';
}

function FeaturedToolCard({ tool }: { tool: Tool }) {
  const isNewTool = isNew(tool.addedDate);
  
  return (
    <a
      href={`/tools/${tool.id}`}
      className="group block bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-neutral-300 transition-all duration-200"
    >
      <div className="flex items-start gap-6 p-8">
        {/* Logo alanı – store tarzı */}
        <div className="w-20 h-20 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {tool.logo ? (
            <img src={tool.logo} alt="" className="w-full h-full object-contain p-2" />
          ) : (
            <span className="text-4xl" aria-hidden>{tool.emoji}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-orange-600 bg-orange-50">
              <Sparkles className="w-3 h-3" />
              FEATURED
            </span>
            {isNewTool && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-green-700 bg-green-50">
                NEW
              </span>
            )}
          </div>
          
          <h3 className="text-2xl font-semibold text-neutral-900 mb-2 group-hover:text-accent-600 transition-colors duration-150">
            {tool.name}
          </h3>
          <p className="text-[15px] text-neutral-500 leading-relaxed mb-4">
            {tool.tagline}
          </p>

          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full ${getPricingColor(tool.pricing)}`}>
              {getPricingLabel(tool.pricing)}
            </span>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2">
            {tool.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[11px] font-medium text-neutral-400 bg-neutral-50 px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

function ToolCard({ tool, showTrending }: { tool: Tool; showTrending?: boolean }) {
  const isNewTool = isNew(tool.addedDate);
  
  return (
    <a
      href={`/tools/${tool.id}`}
      className="group block bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm hover:border-neutral-300 transition-all duration-200"
    >
      {/* Store-style logo alanı */}
      <div className="aspect-square w-full max-h-[140px] min-h-[120px] bg-neutral-50 border-b border-neutral-100 flex items-center justify-center p-6">
        <div className="w-20 h-20 rounded-2xl bg-white border border-neutral-100 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
          {tool.logo ? (
            <img src={tool.logo} alt="" className="w-full h-full object-contain p-1.5" />
          ) : (
            <span className="text-4xl" aria-hidden>{tool.emoji}</span>
          )}
        </div>
      </div>

      <div className="p-5">
        {/* Badges */}
        <div className="flex items-center gap-1.5 mb-2 min-h-[24px] flex-wrap">
          {isNewTool && (
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
              NEW
            </span>
          )}
          {showTrending && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3 h-3" />
              TREND
            </span>
          )}
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${getPricingColor(tool.pricing)}`}>
            {getPricingLabel(tool.pricing)}
          </span>
        </div>

        <h3 className="text-[17px] font-semibold text-neutral-900 leading-snug mb-1.5 group-hover:text-accent-600 transition-colors duration-150">
          {tool.name}
        </h3>
        <p className="text-[15px] text-neutral-500 leading-relaxed line-clamp-2 mb-4">
          {tool.tagline}
        </p>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-neutral-400">
            <Tag className="w-3.5 h-3.5" />
            {tool.category}
          </span>
          <span className="text-[13px] font-medium text-neutral-500 group-hover:text-neutral-900">İncele →</span>
        </div>
      </div>
    </a>
  );
}

function CollectionSection({
  title,
  subtitle,
  tools,
  showTrending = false,
}: {
  title: string;
  subtitle?: string;
  tools: Tool[];
  showTrending?: boolean;
}) {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight mb-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[15px] text-neutral-500">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} showTrending={showTrending} />
        ))}
      </div>
    </section>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tümü');
  const [quickFilter, setQuickFilter] = useState<string | null>(null);

  const tools = toolsData as Tool[];

  // Filter logic
  const filtered = useMemo(() => {
    let result = tools;
    
    // Category filter
    if (category !== 'Tümü') {
      result = result.filter((t) => t.category === category);
    }
    
    // Quick filter
    if (quickFilter === 'popular') {
      result = result.sort((a, b) => b.votes - a.votes).slice(0, 9);
    } else if (quickFilter === 'new') {
      result = result.filter((t) => isNew(t.addedDate));
    } else if (quickFilter === 'free') {
      result = result.filter((t) => t.pricing === 'free' || t.pricing === 'freemium');
    }
    
    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    
    return result;
  }, [tools, category, search, quickFilter]);

  // Collections
  const featured = useMemo(
    () => tools.filter((t) => t.featured).sort((a, b) => b.votes - a.votes),
    [tools]
  );

  const trending = useMemo(
    () =>
      tools
        .filter((t) => !t.featured)
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 6),
    [tools]
  );

  const newest = useMemo(() => 
    tools
      .filter((t) => isNew(t.addedDate))
      .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
      .slice(0, 6),
    [tools]
  );

  const isFiltered = search.trim() || category !== 'Tümü' || quickFilter !== null;

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Hero / Search Section */}
        <div className="pt-12 pb-8 text-center">
          {/* Tab Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-white border border-neutral-200 mb-8">
            <a
              href="/"
              className="relative px-6 py-2 rounded-lg text-[15px] font-medium transition-colors duration-150 bg-neutral-900 text-white"
            >
              Keşfet
            </a>
            <a
              href="/learn"
              className="relative px-6 py-2 rounded-lg text-[15px] font-medium transition-colors duration-150 text-neutral-600 hover:text-neutral-900"
            >
              Öğren
            </a>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-neutral-900 tracking-tight mb-2">
            Yapay Zeka Araçları
          </h1>
          <p className="text-[13px] text-neutral-400 mb-3">
            {tools.length}+ AI Aracı • Her gün güncelleniyor
          </p>
          <p className="text-lg text-neutral-500 mb-8 max-w-xl mx-auto">
            En iyi AI araçlarını keşfedin ve projelerinize entegre edin
          </p>

          {/* Search - Primary Focus */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Araç, kategori veya özellik ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white border border-neutral-200 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-50 transition-all duration-150"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {QUICK_FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setQuickFilter(quickFilter === filter.key ? null : filter.key)}
                className={`inline-flex items-center gap-1.5 px-4 h-9 rounded-full text-[13px] font-medium transition-all duration-150 ${
                  quickFilter === filter.key
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <span>{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 pb-8 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`px-5 h-10 rounded-full text-[14px] font-medium whitespace-nowrap transition-all duration-150 ${
                category === cat.key
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Collections or Filtered Results */}
        <div className="pb-20">
          {isFiltered ? (
            // Filtered view
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight mb-1">
                  Sonuçlar
                </h2>
                <p className="text-[15px] text-neutral-500">
                  {filtered.length} araç bulundu
                </p>
              </div>
              {filtered.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-neutral-200">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-neutral-900 font-medium mb-2">Araç bulunamadı</p>
                  <p className="text-sm text-neutral-400 mb-6">Farklı bir arama veya kategori deneyin</p>
                  <button
                    onClick={() => {
                      setSearch('');
                      setCategory('Tümü');
                      setQuickFilter(null);
                    }}
                    className="inline-flex items-center justify-center h-10 px-6 rounded-xl bg-neutral-900 text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors duration-150"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
                </div>
              )}
            </section>
          ) : (
            // Collections view
            <>
              {/* Featured - Large Cards */}
              {featured.length > 0 && (
                <section className="mb-16">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight mb-1">
                      Öne Çıkanlar
                    </h2>
                    <p className="text-[15px] text-neutral-500">En popüler ve güçlü yapay zeka araçları</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {featured.map((tool) => (
                      <FeaturedToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </section>
              )}

              {trending.length > 0 && (
                <CollectionSection
                  title="Trendler"
                  subtitle="Şu anda en çok oy alan araçlar"
                  tools={trending}
                  showTrending={true}
                />
              )}

              {newest.length > 0 && (
                <CollectionSection
                  title="Yeni Eklenenler"
                  subtitle="Son 7 günde eklenen yapay zeka araçları"
                  tools={newest}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
