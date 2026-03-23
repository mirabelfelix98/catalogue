import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories } from './data';
import { Product } from './types';

const App: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    const base = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
    window.location.href = base + '02best-solar.html';
  };

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.cat === activeFilter);

  const openLb = (product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
    // Meta Pixel Tracking
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', { content_name: 'Product Enquiry - ' + product.name });
    }
  };

  const closeLb = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-sun/30">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-5 md:px-10 py-3.5 flex justify-between items-center border-b ${isScrolled ? 'bg-bg/97 backdrop-blur-lg border-border shadow-sm' : 'bg-transparent border-transparent'}`}>
        <div className="font-serif font-bold text-lg md:text-xl tracking-tight">
          <span className="text-dark">02</span>
          <span className="text-sun">Best</span>
          <span className="text-dark"> Solar</span>
        </div>
        <a 
          href="02best-solar.html" 
          onClick={goHome}
          className="bg-sun hover:bg-amber text-white px-5 py-2.25 rounded-full text-[0.83rem] font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
        >
          ← Main Page
        </a>
      </nav>

      {/* Hero Banner */}
      <header className="relative bg-deep pt-32 pb-20 md:pt-40 md:pb-28 px-5 md:px-10 overflow-hidden text-center">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-sun/7 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-gold/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block bg-gold/10 border border-gold/20 text-gold px-4 py-1.5 rounded-full text-[0.7rem] font-bold tracking-widest uppercase mb-6">
            02Best Solar Limited · CAC Reg. 9414644
          </div>
          <h1 className="font-serif font-black text-white leading-[1.1] mb-6 text-[clamp(1.9rem,5vw,3.5rem)]">
            Our Full <span className="italic text-gold">Product</span> Catalogue
          </h1>
          <p className="text-white/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Every major solar brand in one place — inverters, batteries, panels, charge controllers & accessories. All genuine. All in stock.
          </p>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-10">
            <div className="text-center">
              <div className="text-white font-serif font-bold text-2xl md:text-3xl mb-1">134</div>
              <div className="text-white/40 text-[0.7rem] uppercase tracking-widest font-bold">Products</div>
            </div>
            <div className="text-center border-x border-white/10 px-8 md:px-16">
              <div className="text-white font-serif font-bold text-2xl md:text-3xl mb-1">10+</div>
              <div className="text-white/40 text-[0.7rem] uppercase tracking-widest font-bold">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-white font-serif font-bold text-2xl md:text-3xl mb-1">5</div>
              <div className="text-white/40 text-[0.7rem] uppercase tracking-widest font-bold">Categories</div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <section className="sticky top-[60px] z-40 bg-bg/80 backdrop-blur-md py-6 px-5 md:px-10 border-b border-border">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-5 py-2.25 rounded-full text-[0.85rem] font-medium transition-all duration-300 border ${
                activeFilter === cat.key 
                  ? 'bg-sun border-sun text-white shadow-md' 
                  : 'bg-white border-border text-muted hover:border-sun/50 hover:text-sun'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-[1180px] mx-auto px-5 md:px-10 pt-10 pb-24">
        {categories.filter(c => c.key !== 'all').map((cat) => {
          const catProducts = products.filter(p => p.cat === cat.key);
          if (activeFilter !== 'all' && activeFilter !== cat.key) return null;
          
          return (
            <div key={cat.key} className="mb-16 last:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.25 h-6.5 bg-sun rounded-full" />
                <h2 className="font-serif text-xl md:text-2xl font-bold text-dark flex items-center gap-3">
                  {cat.label}
                  <span className="bg-sun/10 text-sun text-[0.7rem] px-2.5 py-0.75 rounded-full font-bold">
                    {catProducts.length} Items
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {catProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    onClick={() => openLb(product)}
                    className="bg-white border border-border rounded-[18px] overflow-hidden cursor-pointer hover:shadow-[0_18px_55px_rgba(200,130,0,0.13)] hover:-translate-y-1.25 hover:border-sun/30 transition-all duration-300 group"
                  >
                    <div className="h-[220px] bg-[#f0ede8] overflow-hidden relative flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center text-sun/20">
                        <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://picsum.photos/seed/${product.id}/400/300`;
                        }}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 relative z-10"
                      />
                      <div className="absolute top-3 left-3 bg-sun text-white text-[0.67rem] font-bold tracking-widest uppercase px-2.75 py-1 rounded-full shadow-[0_4px_12px_rgba(232,160,32,0.4)]">
                        {product.badge}
                      </div>
                    </div>
                    <div className="p-[18px] pb-5">
                      <h3 className="font-serif text-base font-bold text-dark mb-1.75 leading-tight">{product.name}</h3>
                      <p className="text-[0.84rem] leading-relaxed text-muted line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mt-3.5 pt-2.75 border-t border-border">
                        <span className="text-[0.72rem] text-[#2A8A40] font-semibold">● In Stock</span>
                        <span className="bg-sun/10 text-sun px-3.25 py-1.5 rounded-2xl text-[0.76rem] font-semibold">Enquire →</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLb}
            className="fixed inset-0 z-[999] bg-deep/93 backdrop-blur-md flex items-center justify-center p-5 md:p-10"
          >
            <button 
              onClick={closeLb}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-sun text-white rounded-full flex items-center justify-center transition-colors duration-300 z-[1001]"
            >
              ✕
            </button>
            <motion.div 
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[22px] overflow-hidden max-w-[860px] w-full grid grid-cols-1 md:grid-cols-2 max-h-[88vh]"
            >
              <div className="bg-[#f0ede8] h-[210px] md:h-auto min-h-[300px] flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center text-sun/20">
                  <svg className="animate-spin h-10 w-10" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/seed/${selectedProduct.id}/800/600`;
                  }}
                  className="w-full h-full object-cover relative z-10"
                />
              </div>
              <div className="p-8.5 overflow-y-auto flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-sun/10 text-sun px-3 py-1 rounded-full text-[0.7rem] font-bold tracking-widest uppercase mb-4">
                    {selectedProduct.badge}
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-dark mb-4 leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-[0.91rem] text-muted leading-relaxed mb-8">
                    {selectedProduct.description}
                  </p>
                </div>
                <a 
                  href="https://wa.link/g9xdzn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sun hover:bg-amber text-white py-3.5 px-8 rounded-full font-bold text-center transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  💬 WhatsApp to Enquire
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      <section className="bg-deep py-20 px-5 md:px-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-br from-sun/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-serif font-black text-white leading-tight mb-6 text-[clamp(1.7rem,4vw,2.8rem)]">
            Ready for <span className="italic text-gold">Free Power?</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg mb-10 max-w-xl mx-auto">
            Tell us your budget and load — we will recommend the perfect brand and system size, completely free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://wa.link/g9xdzn"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-sun text-deep px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-xl hover:shadow-gold/20 hover:-translate-y-1"
            >
              💬 WhatsApp for Free Quote
            </a>
            <a 
              href="02best-solar.html" 
              onClick={goHome}
              className="bg-transparent border-2 border-white/20 hover:border-gold hover:text-gold text-white px-8 py-4 rounded-full font-bold transition-all duration-300"
            >
              ← Back to Main Page
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0a05] py-10 px-5 md:px-10 text-center border-t border-white/5">
        <p className="text-white/30 text-[0.8rem] tracking-wide">
          © 2026 02Best Solar Limited · CAC Reg. No. 9414644 · Built by 02Best Solar Limited
        </p>
      </footer>
    </div>
  );
};

export default App;
