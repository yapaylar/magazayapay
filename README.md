# 🚀 Yapaylar

> Apple kalitesinde, modern ve minimalist Yapay Zeka Marketi ve Eğitim Platformu

## ✨ Özellikler

- 🎨 **Apple-Style Tasarım**: San Francisco font ailesi ve glassmorphism efektleri
- 📱 **Mobile-First & PWA**: Mobil cihazlarda native app deneyimi
- 🌙 **Dark Mode**: Sistem tercihine göre otomatik tema desteği
- ⚡ **Blazing Fast**: Astro SSG ile ultra hızlı sayfa yüklemeleri
- 🎯 **Sıfır Veritabanı**: Tüm veriler JSON dosyalarından çekiliyor
- 🧩 **Component-Driven**: Yeniden kullanılabilir React bileşenleri
- 🎬 **Netflix-Style UI**: Akıcı yatay scroll ve premium kartlar

## 🛠 Teknoloji Stack

- **Framework**: [Astro](https://astro.build) (SSG Mode)
- **UI Library**: [React](https://react.dev) (Interaktivite için)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Type Safety**: TypeScript (Strict mode)

## 📁 Proje Yapısı

```
magazayapay/
├── src/
│   ├── components/       # React bileşenleri
│   │   ├── BottomNav.tsx
│   │   ├── Header.tsx
│   │   ├── ToolCard.tsx
│   │   ├── FeaturedToolCard.tsx
│   │   ├── CourseCard.tsx
│   │   ├── FeaturedCourseCard.tsx
│   │   └── CategoryFilter.tsx
│   ├── data/            # JSON veri dosyaları
│   │   ├── tools.json
│   │   └── courses.json
│   ├── layouts/         # Layout şablonları
│   │   └── Layout.astro
│   ├── pages/           # Sayfa rotaları
│   │   ├── index.astro          # Keşfet sayfası
│   │   ├── learn.astro          # Öğren sayfası
│   │   ├── courses/[id].astro   # Kurs detay
│   │   └── tools/[id].astro     # Araç detay
│   └── styles/
│       └── global.css   # Global stiller
├── public/              # Static dosyalar
│   ├── favicon.svg
│   └── manifest.json
└── package.json
```

## 🚀 Hızlı Başlangıç

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev

# Production build
npm run build

# Build'i önizle
npm run preview
```

### Development

Development server'ı çalıştırdıktan sonra tarayıcınızda şu adresi açın:

```
http://localhost:4321
```

## 🎯 Sayfalar

### 1️⃣ Keşfet (Ana Sayfa)
- **Öne Çıkan Araçlar**: Yatay kaydırmalı hero kartlar
- **Kategori Filtreleri**: Metin, Video, Görsel, Kodlama
- **Araç Listesi**: Dikey akan, detaylı araç kartları

### 2️⃣ Öğren
- **Yeni Eklenenler**: Netflix-style poster kartlar
- **Kütüphane**: Tüm eğitim arşivi
- **Ücretsiz İçerik**: Tüm kurslar ücretsiz etiketli

### 3️⃣ Kurs Detay
- **Video Player**: Placeholder ile video oynatıcı
- **Ders Listesi**: Tüm bölümlerin listesi
- **İlerleme Takibi**: Hangi derslerin tamamlandığı

### 4️⃣ Araç Detay
- **Özellikler**: Aracın tüm özellikleri
- **Gradyan Tasarım**: Her araca özel renk paleti
- **CTA Buton**: "Şimdi Dene" aksiyonu

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: Apple Blue (#007AFF)
- **Dark Mode**: Dinamik gray tonları
- **Glassmorphism**: backdrop-blur-md efektleri

### Tipografi
- **Font Family**: SF Pro Display benzeri sistem fontları
- **Başlıklar**: Bold, 2xl-3xl
- **Body**: Regular, sm-base

### Bileşenler
- **Cards**: rounded-2xl, shadow-sm
- **Buttons**: rounded-full, active:scale-95
- **Badges**: pill shape, kategori renkleri

## 💾 Veri Yönetimi

Tüm veriler `src/data/` klasöründeki JSON dosyalarında saklanır:

- `tools.json`: AI araçları
- `courses.json`: Eğitim kursları

### Yeni Araç Ekleme

```json
{
  "id": "tool-id",
  "name": "Tool Name",
  "description": "Description",
  "category": "Metin|Video|Görsel|Kodlama",
  "logo": "image-url",
  "featured": true|false,
  "color": "#HEX"
}
```

### Yeni Kurs Ekleme

```json
{
  "id": "course-id",
  "title": "Course Title",
  "description": "Description",
  "instructor": "Instructor Name",
  "duration": "X saat Y dakika",
  "level": "Başlangıç|Orta|İleri",
  "price": "Ücretsiz",
  "thumbnail": "image-url",
  "featured": true|false,
  "publishedAt": "2026-01-01",
  "lessons": [...]
}
```

## 🌙 Dark Mode

Dark mode otomatik olarak sistem tercihine göre aktif hale gelir. Kullanıcı tercihi `localStorage`'da saklanır.

## 📱 PWA Özellikleri

- ✅ Manifest.json
- ✅ Adaptive icons
- ✅ Standalone mode
- ✅ Theme color
- ⚠️ Service Worker (opsiyonel - eklenebilir)

## 🔧 Özelleştirme

### Renkleri Değiştirme

`tailwind.config.mjs` dosyasındaki `colors` bölümünü düzenleyin:

```js
colors: {
  apple: {
    blue: '#007AFF',
    // ...
  }
}
```

### Font Değiştirme

`tailwind.config.mjs` dosyasındaki `fontFamily` bölümünü düzenleyin.

## 📦 Production

```bash
# Build oluştur
npm run build

# Dist klasörü oluşturuldu
# dist/ klasörünü herhangi bir static hosting'e deploy edebilirsiniz:
# - Vercel
# - Netlify
# - Cloudflare Pages
# - GitHub Pages
```

## 🎯 Gelecek Özellikler

- [ ] Arama fonksiyonu
- [ ] Profil sayfası
- [ ] Favori/Bookmark sistemi
- [ ] Gerçek video player entegrasyonu
- [ ] Backend API entegrasyonu
- [ ] Kullanıcı yorumları
- [ ] Rating sistemi

## 📄 Lisans

MIT

---

**Yapaylar** ile yapay zeka dünyasını keşfedin! 🚀✨
