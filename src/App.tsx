import React, { useState } from 'react';
import {
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  Search,
  X,
  Menu,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Heart,
  Eye,
  Truck,
  ShieldCheck,
  ArrowUpRight,
  Filter
} from 'lucide-react';

// Custom SVG for Instagram
const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Product Data Definition
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  badge: string;
  badgeColor: string;
  image: string;
  details: string;
  fabric: string;
  sizes: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Keten Kimono Elbise (Taş Renk)',
    category: 'Elbiseler & Kimono',
    price: 950,
    badge: 'Yeni Sezon',
    badgeColor: 'bg-stone-900 text-white',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    details: 'Rahat kesim, %100 doğal keten kumaş. Yaz akşamları ve günlük şıklık için ideal.',
    fabric: '%100 Doğal Keten',
    sizes: ['S', 'M', 'L', 'Standart']
  },
  {
    id: 2,
    name: 'Oversize Örgü Triko Kazak (Krem)',
    category: 'Trikolar & Üst Giyim',
    price: 850,
    badge: 'Çok Satan',
    badgeColor: 'bg-amber-800 text-white',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
    details: 'Yumuşak dokulu, dökümlü oversize kesim. Sonbahar-kış sezonunun en sevilen parçası.',
    fabric: 'Yün Karışımlı Triko',
    sizes: ['S/M', 'L/XL']
  },
  {
    id: 3,
    name: 'Saten Kruvaze Bluz (Zümrüt Yeşili)',
    category: 'Trikolar & Üst Giyim',
    price: 720,
    badge: 'Stokta Son 2',
    badgeColor: 'bg-rose-700 text-white',
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&q=80&w=800',
    details: 'Parlak ve dökümlü ithal saten kumaş. Özel davetler ve akşam şıklığı için tasarlandı.',
    fabric: 'İthal Saten Saten',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 4,
    name: 'Yüksek Bel Pileli Kumaş Pantolon',
    category: 'Pantolon & Etek',
    price: 890,
    badge: 'Yeni Sezon',
    badgeColor: 'bg-stone-900 text-white',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
    details: 'Maskülen ve şık kesim. Çift pile detaylı, yüksek bel ve geniş paça rahatlığı.',
    fabric: 'Krep & Dokuma Kumaş',
    sizes: ['36', '38', '40', '42']
  },
  {
    id: 5,
    name: 'Özel Dokuma Bohem Makrome Çanta',
    category: 'Aksesuarlar & Çanta',
    price: 650,
    badge: 'Özel Seçki',
    badgeColor: 'bg-emerald-800 text-white',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    details: 'El yapımı özel dokuma makrome çanta. Ahşap saplı ve keten astarlı iç hacim.',
    fabric: 'El Yapımı Pamuk Makrome',
    sizes: ['Tek Ebat']
  },
  {
    id: 6,
    name: 'Desenli İpek Kumaş Fular & Aksesuar Seti',
    category: 'Aksesuarlar & Çanta',
    price: 420,
    badge: 'Hediye Seçeneği',
    badgeColor: 'bg-purple-900 text-white',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800',
    details: 'Zarif floral desenli %100 ipek dokulu fular. Çanta veya boyun aksesuarı olarak kullanım.',
    fabric: '%100 İpek Dokulu Viskon',
    sizes: ['70x70 cm']
  },
  {
    id: 7,
    name: 'Desenli Midi Boy Viskon Elbise',
    category: 'Elbiseler & Kimono',
    price: 1150,
    badge: 'Çok Satan',
    badgeColor: 'bg-amber-800 text-white',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    details: 'Hafif ve nefes alan viskon kumaş. V yakalı ve kuşaklı zarif silüet.',
    fabric: '%100 Doğal Viskon',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 8,
    name: 'Cashmere Dokulu Trençkot (Vizon)',
    category: 'Trikolar & Üst Giyim',
    price: 1650,
    badge: 'VIP Koleksiyon',
    badgeColor: 'bg-amber-900 text-white',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
    details: 'Kruvaze kapamalı, astarlı ve su tutmaz özellikli lüks trençkot.',
    fabric: 'Süet & Cashmere Dokulu Gabardin',
    sizes: ['S/M', 'L/XL']
  }
];

const CATEGORIES = [
  'Tümü',
  'Elbiseler & Kimono',
  'Trikolar & Üst Giyim',
  'Pantolon & Etek',
  'Aksesuarlar & Çanta'
];

const INSTAGRAM_POSTS = [
  { id: 1, img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600', likes: 240, comments: 18 },
  { id: 2, img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600', likes: 412, comments: 32 },
  { id: 3, img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600', likes: 310, comments: 24 },
  { id: 4, img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600', likes: 529, comments: 41 }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const whatsappNumber = '905300000000'; // Target WhatsApp contact number
  const instagramHandle = 'dukkanatakent';

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const generateWhatsAppUrl = (product: Product) => {
    const text = `Merhaba Dükkan Atakent, " ${product.name} " (${product.price} TL) ürünü hakkında bilgi almak ve sipariş vermek istiyorum.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'Tümü' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 font-sans selection:bg-rose-200 selection:text-stone-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl transition-all duration-300 animate-bounce">
          <MessageCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Notification Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Atakent içi <b>Aynı Gün Kurye Teslimatı</b> | Sepet Yok, Doğrudan WhatsApp İle Sipariş!</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse hidden sm:inline" />
      </div>

      {/* Sticky Glassmorphism Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#faf9f6]/90 border-b border-stone-200/70 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex flex-col items-start group">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-stone-900 group-hover:text-stone-700 transition">
              DÜKKAN ATAKENT
            </span>
            <span className="text-[10px] tracking-[0.2em] text-stone-500 uppercase font-light">
              Boutique & Curation
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#koleksiyon" className="hover:text-stone-900 transition-colors">Koleksiyon</a>
            <a href="#hakkimizda" className="hover:text-stone-900 transition-colors">Biz Kimiz</a>
            <a href="#instagram" className="hover:text-stone-900 transition-colors">Instagram</a>
            <a href="#iletisim" className="hover:text-stone-900 transition-colors">Konum & İletişim</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Instagram Button */}
            <a 
              href={`https://instagram.com/${instagramHandle}`} 
              target="_blank" 
              rel="noreferrer"
              aria-label="Instagram sayfamız"
              className="p-2.5 rounded-full border border-stone-200 text-stone-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all"
            >
              <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            {/* WhatsApp Direct CTA */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span className="hidden sm:inline">WhatsApp Bilgi</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
              aria-label="Menü"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-2">
            <a 
              href="#koleksiyon" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-stone-800 hover:text-rose-600"
            >
              Koleksiyon
            </a>
            <a 
              href="#hakkimizda" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-stone-800 hover:text-rose-600"
            >
              Biz Kimiz
            </a>
            <a 
              href="#instagram" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-stone-800 hover:text-rose-600"
            >
              Instagram Görselleri
            </a>
            <a 
              href="#iletisim" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-stone-800 hover:text-rose-600"
            >
              Adres & Çalışma Saatleri
            </a>
            <hr className="border-stone-100 my-2" />
            <div className="flex items-center gap-4 pt-2">
              <a 
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-stone-300 rounded-xl text-sm font-medium"
              >
                <InstagramIcon className="w-4 h-4 text-pink-600" />
                <span>Instagram</span>
              </a>
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden bg-stone-900 text-white">
        
        {/* Background Image with Warm Vignette Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-950/40" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center sm:text-left flex flex-col items-center sm:items-start z-10">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium tracking-widest uppercase text-stone-200 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Atakent Instagram Butiği</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.15] text-stone-100 mb-6 max-w-3xl">
            Atakent’in En Tarz <br />
            <span className="italic font-normal text-amber-100 font-serif">Vitrinini Keşfedin</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl font-light text-stone-300 max-w-xl mb-10 leading-relaxed">
            Özenle seçilmiş zamansız koleksiyonlar, sınırlı sayıda özel parçalar. Karmaşık sepet yok, sadece bir mesaj uzağınızda.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#koleksiyon"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-stone-100 text-stone-900 hover:bg-white px-8 py-4 rounded-full font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Koleksiyonu İncele</span>
              <ChevronRight className="w-5 h-5 text-stone-800" />
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-600/90 hover:bg-emerald-600 backdrop-blur-sm text-white px-7 py-4 rounded-full font-medium text-base border border-emerald-500/50 shadow-lg transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>Canlı Beden Danışma</span>
            </a>
          </div>

          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/10 w-full text-stone-300 text-xs sm:text-sm">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Truck className="w-5 h-5 text-amber-300 flex-shrink-0" />
              <span>Atakent İçi Hızlı Kurye</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-300 flex-shrink-0" />
              <span>%100 Orijinal & Butik Seçki</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <InstagramIcon className="w-5 h-5 text-amber-300 flex-shrink-0" />
              <span>Instagram Canlı Yayın Satışı</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Collection Showcase Section */}
      <section id="koleksiyon" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Subheading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-500">
            DÜKKAN ATAKENT KOLEKSİYONU
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 mt-2 mb-4">
            Haftanın Favorileri
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light">
            Sınırlı adetlerde getirilen en yeni ve trend parçalarımız. Beğendiğiniz ürüne tıklayarak detaylı inceleyebilir ve WhatsApp üzerinden sipariş oluşturabilirsiniz.
          </p>
        </div>

        {/* Filter Controls: Categories & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400 hover:text-stone-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Products Grid (Responsive: 1 col mobile, 2 col tablet, 3-4 col desktop) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
            <Filter className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl text-stone-800">Aramanıza Uygun Ürün Bulunamadı</h3>
            <p className="text-stone-500 text-sm mt-1">Farklı bir kategori seçebilir veya arama kelimesini değiştirebilirsiniz.</p>
            <button 
              onClick={() => { setSelectedCategory('Tümü'); setSearchQuery(''); }}
              className="mt-4 text-xs font-semibold text-rose-700 underline"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map(product => {
              const isFav = favorites.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area with Badge & Action Buttons */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Product Badge */}
                      <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${product.badgeColor}`}>
                        {product.badge}
                      </span>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(product.id, e)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-stone-700 hover:text-rose-600 hover:bg-white shadow-sm transition-all"
                        aria-label="Favorilere ekle"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>

                      {/* Quick View Button on Hover */}
                      <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                          className="w-full py-2.5 bg-stone-900/90 backdrop-blur-md text-white text-xs font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-stone-900 shadow-md"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Hızlı İncele</span>
                        </button>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 sm:p-5">
                      <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider block mb-1">
                        {product.category}
                      </span>
                      
                      <h3 
                        onClick={() => setSelectedProduct(product)}
                        className="font-serif text-lg font-semibold text-stone-900 line-clamp-1 hover:text-stone-600 transition cursor-pointer mb-2"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-stone-500 line-clamp-2 mb-4 leading-relaxed font-light">
                        {product.details}
                      </p>

                      <div className="flex items-baseline justify-between border-t border-stone-100 pt-3">
                        <span className="text-xs text-stone-400">Fiyat:</span>
                        <span className="font-serif text-xl font-bold text-stone-900">
                          {product.price.toLocaleString('tr-TR')} TL
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Direct WhatsApp Order CTA Button */}
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                    <a
                      href={generateWhatsAppUrl(product)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => triggerToast(`"${product.name}" için WhatsApp başlatılıyor...`)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-xs hover:shadow-md"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                      <span>WhatsApp'tan Sipariş Ver</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* Quick View Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-stone-200 max-h-[90vh] flex flex-col md:flex-row">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/10 hover:bg-stone-900/20 text-stone-700 transition"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="md:w-1/2 aspect-[3/4] md:aspect-auto bg-stone-100 relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-4 left-4 text-xs font-semibold uppercase px-3 py-1 rounded-md shadow-sm ${selectedProduct.badgeColor}`}>
                {selectedProduct.badge}
              </span>
            </div>

            {/* Modal Info */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block mb-1">
                  {selectedProduct.category}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mb-3">
                  {selectedProduct.name}
                </h3>

                <div className="font-serif text-2xl font-bold text-stone-900 mb-6">
                  {selectedProduct.price.toLocaleString('tr-TR')} TL
                </div>

                <div className="space-y-4 mb-6 text-xs sm:text-sm text-stone-600">
                  <div>
                    <span className="font-semibold text-stone-800 block mb-1">Ürün Açıklaması:</span>
                    <p className="leading-relaxed font-light">{selectedProduct.details}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-800 block mb-1">Kumaş Bilgisi:</span>
                    <p className="text-stone-500">{selectedProduct.fabric}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-800 block mb-2">Mevcut Bedenler:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map(size => (
                        <span key={size} className="px-3 py-1 rounded-lg border border-stone-200 text-xs font-medium text-stone-700 bg-stone-50">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal WhatsApp Action Button */}
              <div className="pt-4 border-t border-stone-100">
                <a
                  href={generateWhatsAppUrl(selectedProduct)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    triggerToast(`"${selectedProduct.name}" için WhatsApp başlatılıyor...`);
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-md"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>WhatsApp ile Sipariş Oluştur</span>
                </a>
                <p className="text-[11px] text-center text-stone-400 mt-2">
                  * Tıkladığınızda ürün adı ve fiyat bilgisi otomatik olarak WhatsApp mesajına eklenecektir.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* About Us / Concept Section */}
      <section id="hakkimizda" className="py-20 bg-stone-100 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Boutique Image Grid */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=1000"
                  alt="Dükkan Atakent İç Mekan"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 max-w-xs hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-base">Atakent Butik</h4>
                    <p className="text-xs text-stone-500">Kişiye Özel İlgi</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 font-light">
                  "Seri üretimden uzak, her parçasında özen ve zarafet بارındıran seçki."
                </p>
              </div>
            </div>

            {/* Right Story Text */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-500">
                BİZ KİMİZ & HİKAYEMİZ
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 leading-tight">
                Zarafet Ve Özgün Tasarım <br />
                <span className="italic font-normal">Mahallenizde.</span>
              </h2>

              <p className="text-stone-600 text-base leading-relaxed font-light">
                <strong>Dükkan Atakent</strong> olarak, büyük mağazaların seri üretim monotonluğundan sıyrılıp, sadece beğendiğimiz ve giymekten keyif aldığımız özel parçaları sizlerle buluşturuyoruz.
              </p>

              <p className="text-stone-600 text-base leading-relaxed font-light">
                Instagram sayfamız üzerinden başlayan yolculuğumuzu, Atakent'teki samimi butik atmosferimizle taçlandırdık. Her hafta yenilenen koleksiyonlarımızla gardırobunuza zamansız dokunuşlar katıyoruz.
              </p>

              {/* Features List */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-stone-900 text-sm">Sınırlı Adetlerde Seçki</h4>
                    <p className="text-xs text-stone-500 font-light">Pişti olma riski yok, her modelden az ve öz sayıda stoğumuz bulunur.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-stone-900 text-sm">Birebir WhatsApp Beden Danışmanlığı</h4>
                    <p className="text-xs text-stone-500 font-light">Bedeninizden emin değilseniz WhatsApp'tan santim bazlı ölçü paylaşımı yapıyoruz.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-stone-900 text-sm">Atakent İçi Aynı Gün Teslimat</h4>
                    <p className="text-xs text-stone-500 font-light">Atakent bölgesi siparişlerinizi aynı gün kurye ile kapınıza ulaştırıyoruz.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Instagram Feed / Live Story Grid Section */}
      <section id="instagram" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <InstagramIcon className="w-8 h-8 text-pink-600 mx-auto mb-3" />
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900">
            @dukkanatakent Instagram'da
          </h2>
          <p className="text-stone-500 text-sm mt-2 font-light">
            En yeni ürünlerin canlı yayın kombin videolarını ve hikaye paylaşımlarını kaçırmamak için bizi takip edin.
          </p>
          <a
            href={`https://instagram.com/${instagramHandle}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-xs font-semibold text-pink-600 border border-pink-200 bg-pink-50 hover:bg-pink-100 px-5 py-2.5 rounded-full transition"
          >
            <span>Instagram Profilini Ziyaret Et</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4 Image Grid simulating Instagram Feed */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS.map(post => (
            <a
              key={post.id}
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm"
            >
              <img
                src={post.img}
                alt="Instagram Kombin Gönderisi"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white text-sm font-semibold">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer & Location / Contact Section */}
      <footer id="iletisim" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Column 1: Brand & Bio */}
            <div className="space-y-4">
              <span className="font-serif text-2xl font-bold tracking-wider text-white block">
                DÜKKAN ATAKENT
              </span>
              <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm">
                Atakent'in yerel butiği. Kaliteli kumaşlar, zamansız tasarımlar ve samimi iletişim ile stilinizi tamamlıyoruz.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`https://instagram.com/${instagramHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-pink-600 transition"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-emerald-600 transition"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Contact & Working Hours */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold text-white">İletişim & Saatler</h3>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Atakent Mah. 2. Etap 4. Cadde No: 12A, Küçükçekmece / İstanbul</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Pazartesi - Cumartesi: 10:00 - 20:00 (Pazar Kapalı)</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <a href={`tel:+905300000000`} className="hover:text-white transition">
                    +90 (530) 000 00 00
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Styled Google Maps Placeholder Card */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold text-white">Mağaza Konumu</h3>
              <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-850 h-44 group">
                {/* Visual Map Background simulation */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=600')`
                  }}
                />
                <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[1px]" />
                
                <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                  <MapPin className="w-8 h-8 text-rose-500 animate-bounce mb-2" />
                  <span className="text-xs font-semibold text-white">Dükkan Atakent Butik</span>
                  <span className="text-[11px] text-stone-300">Atakent 2. Etap, İstanbul</span>
                  <a
                    href="https://maps.google.com/?q=Atakent+Kucukcekmece+Istanbul"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 text-[11px] font-semibold bg-white/20 hover:bg-white/30 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30 transition flex items-center gap-1"
                  >
                    <span>Haritada Aç</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>© {new Date().getFullYear()} Dükkan Atakent. Tüm hakları saklıdır. Sepet/Ödeme gerektirmeyen doğrudan WhatsApp sipariş vitrini.</p>
            <div className="flex items-center gap-6">
              <a href="#koleksiyon" className="hover:text-stone-300 transition">Koleksiyon</a>
              <a href="#hakkimizda" className="hover:text-stone-300 transition">Hakkımızda</a>
              <a href="#iletisim" className="hover:text-stone-300 transition">İletişim</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
