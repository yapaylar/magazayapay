export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="py-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left order-2 sm:order-1">
              <a href="/" className="text-[15px] font-semibold text-neutral-900">
                Yapaylar
              </a>
              <p className="text-[13px] text-neutral-400 mt-1">
                Yapay zeka araçları ve eğitim platformu
              </p>
            </div>

            <nav className="flex items-center gap-8 order-1 sm:order-2">
              <a
                href="mailto:hello@yapaylar.com"
                className="text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                İletişim
              </a>
              <a
                href="/hakkimizda"
                className="text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Hakkında
              </a>
            </nav>

            <div className="text-center sm:text-right order-3">
              <p className="text-[12px] text-neutral-400">
                © 2026 Yapaylar
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
