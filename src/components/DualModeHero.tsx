import { useState } from 'react';
import { ArrowRight, Sparkles, GraduationCap, TrendingUp, BookOpen, Zap } from 'lucide-react';
import toolsData from '../data/tools.json';
import coursesData from '../data/courses.json';

type Mode = 'explore' | 'learn';

interface Tool {
  id: string;
  name: string;
  tagline: string;
  category: string;
  emoji: string;
  logo?: string;
  votes: number;
  pricing: string;
  tags: string[];
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  emoji: string;
  logo?: string;
  level: string;
  featured?: boolean;
  lessons?: { id: number; title: string; duration: string; completed: boolean; vimeoId?: string; unit?: string }[];
}

function MiniToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={`/tools/${tool.id}`}
      className="group block bg-white rounded-xl border border-neutral-200 p-4 hover:border-neutral-300 transition-all duration-150 min-w-[200px]"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {tool.logo ? (
            <img src={tool.logo} alt="" className="w-full h-full object-contain p-1" />
          ) : (
            <span className="text-xl">{tool.emoji}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-semibold text-neutral-900 truncate group-hover:text-accent-600 transition-colors">
            {tool.name}
          </h4>
        </div>
      </div>
      <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
        {tool.tagline}
      </p>
    </a>
  );
}

function MiniCourseCard({ course }: { course: Course }) {
  const previewVimeoId = course.lessons?.[0]?.vimeoId;
  return (
    <a
      href={`/courses/${course.id}`}
      className="group block bg-white rounded-xl border border-neutral-200 p-3 hover:border-neutral-300 transition-all duration-150 min-w-[220px]"
    >
      <div className="w-full h-[100px] bg-neutral-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative border border-neutral-100 pointer-events-none">
         {previewVimeoId ? (
           <iframe 
             src={`https://player.vimeo.com/video/${previewVimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`} 
             className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2"
             frameBorder="0" 
             allow="autoplay; fullscreen; picture-in-picture"
           />
         ) : course.logo ? (
           <img src={course.logo} alt="" className="w-full h-full object-contain p-2" />
         ) : (
           <span className="text-4xl">{course.emoji}</span>
         )}
         <div className="absolute top-2 left-2 flex items-center gap-1">
             <span className="px-1.5 py-0.5 bg-white/90 backdrop-blur-sm text-[9px] font-bold rounded text-neutral-800 shadow-sm">{course.level}</span>
         </div>
         <div className="absolute bottom-2 right-2 flex items-center gap-1">
             <span className="px-1.5 py-0.5 bg-black/70 backdrop-blur-sm text-[9px] font-medium rounded text-white shadow-sm">{course.duration}</span>
         </div>
      </div>
      <div className="px-1">
         <h4 className="text-[13px] font-semibold text-neutral-900 line-clamp-1 mb-2 group-hover:text-accent-600 transition-colors">
            {course.title}
         </h4>
      </div>
    </a>
  );
}

export default function DualModeHero() {
  const [selectedMode, setSelectedMode] = useState<Mode>('explore');

  const tools = toolsData as Tool[];
  const courses = coursesData as Course[];

  const trendingTools = tools.sort((a, b) => b.votes - a.votes).slice(0, 5);
  const featuredCourses = courses.filter(c => c.featured).slice(0, 5);

  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        {/* Main Headline */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-semibold text-neutral-900 tracking-tight mb-4">
            Yapay Zeka Ekosistemi
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Projeleri keşfet, karşılaştır, değerlendir. Aynı teknolojileri sıfırdan öğren, uygulamaya geç.
          </p>
        </div>

        {/* Dual Mode Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* KEŞFET Card */}
          <button
            onClick={() => setSelectedMode('explore')}
            className={`group relative bg-white rounded-3xl p-8 text-left transition-all duration-200 ${
              selectedMode === 'explore'
                ? 'border-2 border-neutral-900 shadow-sm'
                : 'border-2 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 text-white text-[12px] font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              KEŞFET
            </div>

            {/* Content */}
            <h2 className="text-3xl font-semibold text-neutral-900 mb-3 tracking-tight">
              AI Projeler
            </h2>
            <p className="text-[15px] text-neutral-500 leading-relaxed mb-6">
              Projeleri keşfet, filtrele, karşılaştır
            </p>

            {/* Features */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-[13px] text-neutral-600">
                <TrendingUp className="w-4 h-4 text-neutral-400" />
                <span>Trend projeler</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-neutral-600">
                <Zap className="w-4 h-4 text-neutral-400" />
                <span>Kategoriler • Etiketler • Fiyat/Model</span>
              </div>
            </div>

            {/* CTA */}
            <div
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-150 ${
                selectedMode === 'explore'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'
              }`}
            >
              Keşfet'e Geç
              <ArrowRight className="w-4 h-4" />
            </div>

            {/* Selected Indicator */}
            {selectedMode === 'explore' && (
              <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-neutral-900" />
            )}
          </button>

          {/* ÖĞREN Card */}
          <button
            onClick={() => setSelectedMode('learn')}
            className={`group relative bg-white rounded-3xl p-8 text-left transition-all duration-200 ${
              selectedMode === 'learn'
                ? 'border-2 border-neutral-900 shadow-sm'
                : 'border-2 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 text-white text-[12px] font-semibold mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              ÖĞREN
            </div>

            {/* Content */}
            <h2 className="text-3xl font-semibold text-neutral-900 mb-3 tracking-tight">
              AI Eğitimler
            </h2>
            <p className="text-[15px] text-neutral-500 leading-relaxed mb-6">
              Aynı konuyu sıfırdan öğren, uygulamaya geç
            </p>

            {/* Features */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-[13px] text-neutral-600">
                <BookOpen className="w-4 h-4 text-neutral-400" />
                <span>Kısa dersler • Uygulamalı</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-neutral-600">
                <Zap className="w-4 h-4 text-neutral-400" />
                <span>Yol haritaları • Başlangıçtan ileri seviyeye</span>
              </div>
            </div>

            {/* CTA */}
            <div
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-150 ${
                selectedMode === 'learn'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'
              }`}
            >
              Öğren'e Geç
              <ArrowRight className="w-4 h-4" />
            </div>

            {/* Selected Indicator */}
            {selectedMode === 'learn' && (
              <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-neutral-900" />
            )}
          </button>
        </div>

        {/* Conditional Carousel */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">
              {selectedMode === 'explore' ? 'Trend Projeler' : 'Bu Haftanın Eğitimleri'}
            </h3>
            <a
              href={selectedMode === 'explore' ? '/explore' : '/learn'}
              className="text-[13px] font-medium text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              Tümünü Gör →
            </a>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {selectedMode === 'explore'
              ? trendingTools.map((tool) => <MiniToolCard key={tool.id} tool={tool} />)
              : featuredCourses.map((course) => <MiniCourseCard key={course.id} course={course as Course} />)
            }
          </div>
        </div>
      </section>
    </div>
  );
}
