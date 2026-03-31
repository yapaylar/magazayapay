import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, X, BookOpen, Wrench, Menu } from 'lucide-react';
import coursesData from '../data/courses.json';
import toolsData from '../data/tools.json';

const CATEGORIES = [
  { label: 'Tümü', href: '/', icon: '🌟' },
  { label: 'Metin', href: '/?category=Metin', icon: '📝' },
  { label: 'Görsel', href: '/?category=Görsel', icon: '🎨' },
  { label: 'Video', href: '/?category=Video', icon: '🎬' },
  { label: 'Kodlama', href: '/?category=Kodlama', icon: '💻' },
  { label: 'Ses', href: '/?category=Ses', icon: '🎙️' },
  { label: 'Eğitimler', href: '/learn', icon: '🎓' },
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Search Modal Shortcuts & Focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K or CTRL+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      // ESC to close search
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Focus input when search modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery(''); // clear query on close
    }
  }, [searchOpen]);

  // Filter logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { tools: [], courses: [] };
    
    const query = searchQuery.toLowerCase();
    
    const matchedTools = toolsData.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.tagline.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    ).slice(0, 5);

    const matchedCourses = coursesData.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.description.toLowerCase().includes(query)
    ).slice(0, 3);

    return { tools: matchedTools, courses: matchedCourses };
  }, [searchQuery]);

  return (
    <>
      <header className="sticky top-0 z-40 pt-4 sm:pt-5 pb-0 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto rounded-2xl border border-neutral-200/80 bg-white/90 backdrop-blur-lg shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16 relative">
              
              {/* Sol: Tüm Kategoriler & Akademi */}
              <div className="flex-1 flex justify-start items-center" ref={dropdownRef}>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 sm:gap-2 text-[13px] sm:text-[14px] font-semibold text-neutral-600 hover:text-blue-600 transition-colors duration-150 p-1 sm:p-0 rounded-lg"
                    aria-label="Kategoriler"
                  >
                    <Menu className="w-5 h-5 sm:hidden" />
                    <span className="hidden sm:inline-block">Kategoriler</span>
                    <ChevronDown
                      className={`hidden sm:block w-4 h-4 text-neutral-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-blue-600' : ''}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-3 w-[220px] p-2 bg-white rounded-2xl border border-neutral-200 shadow-xl z-50 transform origin-top-left transition-all">
                      {CATEGORIES.map((cat) => (
                        <a
                          key={cat.label}
                          href={cat.href}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-neutral-700 hover:bg-neutral-50 hover:text-blue-600 transition-colors group"
                        >
                          <span className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-lg group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-neutral-200 transition-all">
                            {cat.icon}
                          </span>
                          {cat.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                
                <a href="/learn" className="hidden lg:block ml-6 text-[14px] font-semibold text-neutral-600 hover:text-blue-600 transition-colors">
                  Akademi
                </a>
              </div>

              {/* Orta: Logo (tam ortada) */}
              <div className="flex-shrink-0 flex justify-center pb-0.5">
                <a
                  href="/"
                  className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 uppercase font-montserrat hover:scale-105 transition-transform origin-center"
                >
                  YAPAYLAR
                </a>
              </div>

              {/* Sağ: Arama */}
              <div className="flex-1 flex justify-end items-center">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="group flex flex-row items-center gap-2 px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl bg-neutral-100/80 hover:bg-neutral-200/80 border border-neutral-200/50 transition-all duration-200"
                  aria-label="Ara"
                >
                  <Search className="w-4 h-4 sm:w-4 sm:h-4 text-neutral-600 group-hover:text-blue-600 transition-colors" />
                  <span className="hidden lg:block text-[13px] font-medium text-neutral-500 pr-1">Ara...</span>
                  <div className="hidden lg:flex items-center gap-0.5">
                    <kbd className="font-sans text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-neutral-200 text-neutral-400 shadow-sm">⌘</kbd>
                    <kbd className="font-sans text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-neutral-200 text-neutral-400 shadow-sm">K</kbd>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-2 sm:pt-[10vh] lg:pt-[15vh] px-2 sm:px-4">
          <div 
            className="absolute inset-0 bg-neutral-900/60 sm:bg-neutral-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setSearchOpen(false)}
          />
          
          <div className="relative w-full max-w-2xl bg-white rounded-[24px] shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 flex flex-col max-h-[90vh] sm:max-h-[80vh]">
            {/* Search Input Box */}
            <div className="flex items-center px-4 sm:px-6 border-b border-neutral-100 flex-shrink-0">
              <Search className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Araç veya eğitim ara..." 
                className="w-full bg-transparent border-0 outline-none px-4 py-6 sm:py-8 text-base sm:text-lg font-medium text-neutral-900 placeholder:text-neutral-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-2 -mr-2 rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content / Results Area */}
            <div className="overflow-y-auto px-3 sm:px-4 py-4 bg-neutral-50/50 flex-1">
              
              {!searchQuery.trim() ? (
                /* Empty State / Suggestions */
                <div className="px-4 py-8 sm:py-12 text-center flex flex-col items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-300" />
                  </div>
                  <p className="text-neutral-500 font-medium text-sm sm:text-base">Arama yapmak için yazmaya başlayın.</p>
                  <p className="text-[12px] sm:text-[13px] text-neutral-400 mt-1">Örn: "ChatGPT", "Görsel", "Prompt"</p>
                </div>
              ) : (
                /* Results */
                <div className="space-y-6">
                  {/* No Results Fallback */}
                  {searchResults.tools.length === 0 && searchResults.courses.length === 0 && (
                    <div className="py-10 text-center text-neutral-500 text-[14px] sm:text-[15px]">
                      "{searchQuery}" için sonuç bulunamadı.
                    </div>
                  )}

                  {/* Tools Results */}
                  {searchResults.tools.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-2 sm:px-3 mb-2 sm:mb-3 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5" />
                        Araçlar
                      </h3>
                      <div className="flex flex-col gap-1">
                        {searchResults.tools.map(t => (
                          <a 
                            key={t.id} 
                            href={`/tools/${t.id}`}
                            className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-neutral-200/60 transition-all group"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl border border-neutral-100 shadow-sm flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                              {t.emoji}
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <h4 className="text-[14px] sm:text-[15px] font-bold text-neutral-900 truncate">{t.name}</h4>
                                <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md uppercase">
                                  {t.category}
                                </span>
                              </div>
                              <p className="text-[12px] sm:text-[13px] text-neutral-500 line-clamp-1">{t.tagline}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Courses Results */}
                  {searchResults.courses.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-2 sm:px-3 mb-2 sm:mb-3 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        Eğitimler
                      </h3>
                      <div className="flex flex-col gap-1">
                        {searchResults.courses.map(c => (
                          <a 
                            key={c.id} 
                            href={`/courses/${c.id}`}
                            className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-neutral-200/60 transition-all group"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl border border-neutral-100 shadow-sm flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                              {c.emoji}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-[14px] sm:text-[15px] font-bold text-neutral-900 mb-0.5 truncate">{c.title}</h4>
                              <p className="text-[12px] sm:text-[13px] text-neutral-500 line-clamp-1">{c.description}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="bg-neutral-100 px-4 sm:px-6 py-2 sm:py-3 border-t border-neutral-200 hidden sm:flex items-center justify-between text-[11px] font-medium text-neutral-400 flex-shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-white flex items-center justify-center shadow-sm text-neutral-500 font-bold border border-neutral-200/50">↑</span>
                <span className="w-4 h-4 rounded bg-white flex items-center justify-center shadow-sm text-neutral-500 font-bold border border-neutral-200/50">↓</span>
                Gezinmek için
              </span>
              <span className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-white flex items-center justify-center shadow-sm text-neutral-500 font-bold border border-neutral-200/50">ESC</span>
                Kapatmak için
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
