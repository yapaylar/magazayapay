import { useMemo } from 'react';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';
import coursesData from '../data/courses.json';

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
  publishedAt: string;
  lessons: { id: number; title: string; duration: string; completed: boolean; vimeoId?: string }[];
}

function FeaturedCard({ course }: { course: Course }) {
  const previewVimeoId = course.lessons?.[0]?.vimeoId;
  return (
    <a
      href={`/courses/${course.id}`}
      className="block flex-shrink-0 w-[280px] rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm hover:border-neutral-300 transition-all duration-200 bg-white"
    >
      {/* Logo/görsel alanı */}
      <div className="h-36 bg-neutral-100 flex items-center justify-center border-b border-neutral-100 relative overflow-hidden pointer-events-none">
        {previewVimeoId ? (
           <iframe 
             src={`https://player.vimeo.com/video/${previewVimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`} 
             className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2"
             frameBorder="0" 
             allow="autoplay; fullscreen; picture-in-picture"
           />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-white border border-neutral-100 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
            {course.logo ? (
              <img src={course.logo} alt="" className="w-full h-full object-contain p-1.5" />
            ) : (
              <span className="text-4xl" aria-hidden>{course.emoji}</span>
            )}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-1 rounded-md">
            {course.level}
          </span>
          <span className="text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-md">
            Ücretsiz
          </span>
        </div>
        <h3 className="font-semibold text-[15px] text-neutral-900 leading-snug line-clamp-2 mb-4">
          {course.title}
        </h3>
        <div className="flex items-center gap-3 text-[13px] text-neutral-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {course.lessons.length} ders
          </span>
        </div>
      </div>
    </a>
  );
}

function CourseCard({ course }: { course: Course }) {
  const previewVimeoId = course.lessons?.[0]?.vimeoId;
  return (
    <a
      href={`/courses/${course.id}`}
      className="group block bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm hover:border-neutral-300 transition-all duration-200"
    >
      {/* Store-style logo alanı */}
      <div className="aspect-video w-full bg-neutral-100 border-b border-neutral-100 flex items-center justify-center relative overflow-hidden pointer-events-none">
        {previewVimeoId ? (
           <iframe 
             src={`https://player.vimeo.com/video/${previewVimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`} 
             className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2"
             frameBorder="0" 
             allow="autoplay; fullscreen; picture-in-picture"
           />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-white border border-neutral-100 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
            {course.logo ? (
              <img src={course.logo} alt="" className="w-full h-full object-contain p-1.5" />
            ) : (
              <span className="text-4xl" aria-hidden>{course.emoji}</span>
            )}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-1 rounded-md">
            {course.level}
          </span>
          <span className="text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-md">
            Ücretsiz
          </span>
        </div>
        <h3 className="font-semibold text-[17px] text-neutral-900 leading-snug line-clamp-2 mb-1 group-hover:text-accent-600 transition-colors duration-150">
          {course.title}
        </h3>
        <p className="text-[13px] text-neutral-500 mb-3">{course.instructor}</p>
        <div className="flex items-center gap-3 text-[13px] text-neutral-400 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {course.lessons.length} ders
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-neutral-500 group-hover:text-neutral-900 mt-auto">
          İncele <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </a>
  );
}

export default function LearnPage() {
  const courses = coursesData as Course[];

  const sortedCourses = useMemo(
    () =>
      [...courses]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    [courses]
  );

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Hero */}
        <div className="pt-16 pb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight mb-4">
            Eğitim Kataloğu
          </h1>
          <p className="text-lg text-neutral-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Yapay zeka araçlarını uzman seviyesinde öğrenin. Sizin için hazırlanan interaktif eğitimlerle kodlama, finans ve üretkenlik süreçlerinizi hızlandırın.
          </p>
        </div>

        {/* All Courses Grid */}
        <section className="pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
