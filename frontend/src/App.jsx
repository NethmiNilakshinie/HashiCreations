import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Admin from './Admin'; 

// --- HomeContent Component ---
const HomeContent = ({ filteredProducts, categories, activeCategory, filterCategory, addToCart }) => {
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setVisibleCount(8);
  }, [activeCategory]);

  const showMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <>
      {/* Hero Section */}
      <header id="home-top" className="relative w-full flex flex-col md:flex-row items-center justify-center px-10 md:px-24 gap-12 pt-12 pb-24">
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] flex items-center justify-center rounded-full animate-float">
            <div className="absolute inset-[-10px] bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#d4b5a3_100%)] animate-water-flow rounded-full"></div>
            <div className="relative w-[96%] h-[96%] rounded-full overflow-hidden border-[4px] border-[#0f051d] z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <img src="/bg.jpg" alt="Hashi Artist" className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f051d]/80 via-transparent to-transparent"></div>
            </div>
            <div className="absolute w-full h-full bg-purple-600/20 rounded-full blur-[80px] -z-10"></div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-purple-400"></div>
              <span className="text-purple-300 text-[10px] font-bold tracking-[0.5em] uppercase">Built with Dedication</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight text-white">
              Crafted with <span className="font-serif italic text-[#d4b5a3]">Passion,</span> <br />
              Perfected for <span className="font-serif italic text-[#d4b5a3]">You.</span>
            </h2>
            <p className="text-purple-100/70 text-base md:text-lg leading-relaxed max-w-md font-serif italic border-l border-[#d4b5a3] pl-4">
              "Every second of dedication, every touch of hard work, brought to life in a world of unique creations—crafted just to make your special moments unforgettable."
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <button onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 bg-[#d4b5a3] text-black text-[10px] font-black tracking-[0.2em] uppercase rounded-full hover:bg-white transition-all shadow-lg active:scale-95">Explore Gallery</button>
          </div>
        </div>
      </header>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-[#0f051d] border-t border-purple-500/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-xl font-bold tracking-[0.4em] text-purple-300 uppercase">About Us</h2>
            <div className="w-16 h-[1px] bg-[#d4b5a3] mt-5 opacity-40"></div>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
            <div className="w-full md:w-1/2 relative h-[500px]">
              <img src="/about.jpg" alt="Artist Work" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f051d] via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-[#0f051d] via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f051d] via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#0f051d] via-transparent to-transparent"></div>
            </div>

            <div className="w-full md:w-1/2 space-y-8">
              <div className="space-y-4">
                <h3 className="text-[#d4b5a3] text-[12px] font-bold tracking-[0.4em] uppercase">The Story Behind</h3>
                <h2 className="text-4xl font-light text-white leading-tight">Meet the Heart Behind <br/><span className="italic font-serif">Hashi Creations</span></h2>
              </div>
              <div className="space-y-6 text-gray-400 text-sm leading-relaxed max-w-lg">
                <p>I believe that art is not just something you look at, but something you feel. What started as a small hobby has grown into a passion-driven creative studio.</p>
                <p>Every piece is 100% handcrafted. We pour hours of care into ensuring every detail is flawless, especially for your special moments.</p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/5 max-w-lg">
                <div>
                  <h4 className="text-white text-[10px] font-bold uppercase tracking-widest mb-2">Our Vision</h4>
                  <p className="text-gray-500 text-[11px]">To turn your stories into everlasting masterpieces.</p>
                </div>
                <div>
                  <h4 className="text-white text-[10px] font-bold uppercase tracking-widest mb-2">Quality First</h4>
                  <p className="text-gray-500 text-[11px]">Using premium materials for durability and shine.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Process Flow Section */}
      <section className="pt-0 pb-12 bg-[#0f051d] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-10">
          <div className="flex flex-col items-center mb-20 text-center">
            <span className="text-[#d4b5a3] text-[10px] font-bold tracking-[0.5em] uppercase mb-3">Simple 3-Step Journey</span>
            <h2 className="text-3xl font-light text-white italic font-serif">How it Works</h2>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
            <div className="hidden md:block absolute top-[30px] left-[10%] right-[10%] h-[2px] bg-white/5 z-0">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[#d4b5a3] to-transparent w-1/2 animate-flow-line"></div>
            </div>

            <div className="relative z-10 flex md:flex-col items-center md:items-center gap-6 md:gap-8 w-full md:w-1/3 group">
              <div className="relative">
                <div className="w-[60px] h-[60px] rounded-full bg-[#1a0b2e] border border-[#d4b5a3]/30 flex items-center justify-center text-[#d4b5a3] font-serif italic text-xl group-hover:border-[#d4b5a3] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(212,181,163,0.2)]">
                  01
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#d4b5a3] rounded-full animate-ping opacity-20"></div>
              </div>
              <div className="flex flex-col items-start md:items-center">
                <h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-2">Pick Your Art</h4>
                <p className="text-gray-500 text-[10px] leading-relaxed md:text-center max-w-[200px]">Explore our collection and find the perfect piece.</p>
              </div>
            </div>

            <div className="relative z-10 flex md:flex-col items-center md:items-center gap-6 md:gap-8 w-full md:w-1/3 group">
              <div className="w-[60px] h-[60px] rounded-full bg-[#1a0b2e] border border-[#d4b5a3]/30 flex items-center justify-center text-[#d4b5a3] font-serif italic text-xl group-hover:border-[#d4b5a3] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(212,181,163,0.2)]">
                02
              </div>
              <div className="flex flex-col items-start md:items-center">
                <h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-2">Add to Bag</h4>
                <p className="text-gray-500 text-[10px] leading-relaxed md:text-center max-w-[200px]">Review your selection in the bag before confirming.</p>
              </div>
            </div>

            <div className="relative z-10 flex md:flex-col items-center md:items-center gap-6 md:gap-8 w-full md:w-1/3 group">
              <div className="w-[60px] h-[60px] rounded-full bg-[#1a0b2e] border border-[#25D366]/30 flex items-center justify-center text-[#25D366] text-xl group-hover:border-[#25D366] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(37,211,102,0.2)]">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="flex flex-col items-start md:items-center">
                <h4 className="text-[#25D366] text-[11px] font-bold uppercase tracking-widest mb-2">WhatsApp Us</h4>
                <p className="text-gray-500 text-[10px] leading-relaxed md:text-center max-w-[200px]">Chat with us to customize your designs. Final price depends on your specific requirements.</p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes flow-line {
            0% { left: -50%; opacity: 0; }
            50% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
          .animate-flow-line {
            animation: flow-line 4s linear infinite;
          }
        `}</style>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-24 bg-[#130724] border-t border-purple-500/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-xl font-bold tracking-[0.4em] text-purple-300 uppercase">Our Creations</h2>
            <div className="w-16 h-[1px] bg-[#d4b5a3] mt-5 opacity-40 mb-10"></div>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => filterCategory(cat)}
                  className={`px-6 py-2 text-[10px] tracking-widest uppercase rounded-full transition-all border ${
                    activeCategory === cat ? 'bg-[#d4b5a3] text-black border-[#d4b5a3]' : 'text-gray-400 border-purple-500/20 hover:border-[#d4b5a3]/50'
                  }`}
                >{cat}</button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayedProducts.map((product) => (
              <div key={product._id} className="group flex flex-col bg-[#1a0b2e]/40 rounded-[2.5rem] p-4 border border-purple-500/5 hover:border-purple-500/20 transition-all duration-500">
                <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#0f051d]">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="mt-5 px-1">
                  <h3 className="text-[11px] font-bold text-gray-200 uppercase tracking-widest leading-tight">{product.name}</h3>
                  
                  {product.processingTime && (
                    <div className="flex items-center gap-2 mt-1.5 opacity-80">
                      <svg className="w-3 h-3 text-[#d4b5a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-[9px] text-purple-300/70 uppercase tracking-tighter italic">Ready in {product.processingTime}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-3">
                    <p className="text-sm font-medium text-[#d4b5a3]">Rs. {product.price.toLocaleString()}.00</p>
                    <button onClick={() => addToCart(product)} className="p-3 bg-purple-500/10 text-purple-300 rounded-xl border border-purple-500/20 hover:bg-purple-600 hover:text-white transition-all shadow-lg active:scale-90">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length > visibleCount && (
            <div className="flex justify-center mt-20">
              <button onClick={showMore} className="group relative px-10 py-4 bg-transparent border border-[#d4b5a3]/30 rounded-full overflow-hidden transition-all hover:border-[#d4b5a3]">
                <span className="relative z-10 text-[10px] font-black tracking-[0.3em] uppercase text-[#d4b5a3] group-hover:text-black transition-colors">See More Creations</span>
                <div className="absolute inset-0 bg-[#d4b5a3] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const whatsappNumber = "94763924953"; 
  const categories = ['All', 'Resin Art Creations', 'Wedding Ring Holders', 'Flower Bunch', 'Flower Vase', 'Teddy Bears', 'Birthday Packages', 'Gift Box'];

  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then(res => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    }).catch(err => console.log("Data Fetching Error:", err));
  }, []);

  const addToCart = (p) => setCart([...cart, p]);
  const removeFromCart = (i) => { let n = [...cart]; n.splice(i, 1); setCart(n); };

  const sendWhatsAppOrder = () => {
      const list = cart.map(i => `- ${i.name} (Rs. ${i.price})`).join('\n');
      const total = cart.reduce((s, i) => s + i.price, 0);
      const msg = `Hi Hashi Creations!\nI want to order:\n\n${list}\n\nTotal: Rs. ${total}.00\n\nI'd like to discuss customization details once you're available!`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filterCategory = (cat) => {
    setActiveCategory(cat);
    setFilteredProducts(cat === 'All' ? products : products.filter(p => p.category === cat));
  };

  const goToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // --- Wrapper to handle Navbar visibility ---
  const LayoutWrapper = ({ children }) => {
    const location = useLocation();
    const isAdmin = location.pathname === '/manage-hashicreations';

    return (
      <div className="min-h-screen bg-[#0f051d] font-sans text-gray-200 scroll-smooth">
        {/* Navbar: Only show if NOT admin */}
        {!isAdmin && (
          <nav className="w-full py-4 px-8 md:px-12 flex justify-between items-center bg-[#1a0b2e]/60 backdrop-blur-xl sticky top-0 z-[100] border-b border-purple-500/10">
            <div className="flex items-center gap-4">
              <Link to="/" onClick={goToTop}><img src="/logo.jpeg" className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-[#d4b5a3]/30" alt="Logo" /></Link>
              <h1 className="text-sm md:text-xl font-bold tracking-[0.4em] text-[#d4b5a3] uppercase">HASHI CREATIONS</h1>
            </div>
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center space-x-8 text-[10px] font-black tracking-[0.2em] uppercase">
                {/* 1. HOME */}
                <Link to="/" onClick={goToTop} className="text-white hover:text-[#d4b5a3]">Home</Link>
                
                {/* 2. ABOUT (පේජ් එකේ දෙවැනියට තියෙන සෙක්ෂන් එක නිසා) */}
                <Link to="/" onClick={() => setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100)} className="text-gray-400 hover:text-white">About</Link>
                
                {/* 3. COLLECTION (පේජ් එකේ අවසානයට තියෙන සෙක්ෂන් එක නිසා) */}
                <Link to="/" onClick={() => setTimeout(() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }), 100)} className="text-gray-400 hover:text-white">Collection</Link>
              </div>
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-[#d4b5a3]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {cart.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cart.length}</span>}
              </button>
            </div>
          </nav>
        )}

        {children}

        {/* Footer */}
        <footer className="bg-[#0b0414] pt-24 pb-12 border-t border-purple-500/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img src="/logo.jpeg" className="h-14 w-14 rounded-full border border-[#d4b5a3]/30" alt="Hashi Logo" />
                  <span className="text-[#d4b5a3] font-black tracking-[0.3em] text-sm uppercase">Hashi Creations</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed font-light tracking-wide italic">"Handcrafting resin wonders and unique gifts that preserve your most precious moments forever."</p>
              </div>

              <div className="space-y-8">
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] border-l-2 border-[#d4b5a3] pl-4">Explore</h4>
                <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] font-bold">
                  <li><Link to="/" onClick={goToTop} className="text-gray-500 hover:text-white">Home</Link></li>
                  {/* Footer එකෙත් About/Collection පිළිවෙල වෙනස් කළා */}
                  <li><a href="#about" className="text-gray-500 hover:text-white">Our Story</a></li>
                  <li><a href="#collection" className="text-gray-500 hover:text-white">The Gallery</a></li>
                </ul>
              </div>

              <div className="space-y-8">
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] border-l-2 border-[#d4b5a3] pl-4">Get In Touch</h4>
                <div className="space-y-4 text-gray-400 text-[10px] tracking-widest uppercase">
                  <div className="flex items-start gap-3">
                    <i className="fa-solid fa-location-dot text-[#d4b5a3] mt-1 shrink-0"></i>
                    <div>
                      <p className="text-white mb-1">Colombo, Sri Lanka</p>
                      <a href="https://maps.google.com/?q=Colombo,SriLanka" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-[#d4b5a3] lowercase tracking-normal">View on Map</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-envelope text-[#d4b5a3] shrink-0"></i>
                    <p className="lowercase">hashicreations@gmail.com</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-phone text-[#d4b5a3] shrink-0"></i>
                    <p>+94 76 392 4953</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] border-l-2 border-[#d4b5a3] pl-4">Social</h4>
                <div className="flex flex-wrap gap-4">
                  <a href="https://web.facebook.com/people/Hashi-Creations/61566992915321/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all border border-white/5">
                    <i className="fa-brands fa-facebook-f text-white"></i>
                  </a>
                  <a href="https://www.tiktok.com/@hashicreations" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-black transition-all border border-white/5">
                    <i className="fa-brands fa-tiktok text-white"></i>
                  </a>
                  <a href="https://www.youtube.com/@hashicreations-m4u" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all border border-white/5">
                    <i className="fa-brands fa-youtube text-white"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="pt-10 border-t border-white/5 text-center">
              <p className="text-gray-600 text-[9px] tracking-[0.5em] uppercase font-medium">© 2026 Hashi Creations • Handcrafted With Love</p>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  return (
    <Router>
      <LayoutWrapper>
        {isCartOpen && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
            <div className="relative w-full max-w-md bg-[#0f051d] h-full p-8 flex flex-col border-l border-purple-500/20">
              <button onClick={() => setIsCartOpen(false)} className="self-end text-gray-400 mb-5 text-[10px] tracking-widest uppercase hover:text-white transition-colors">✕ Close</button>
              <h2 className="text-xl font-bold tracking-[0.3em] text-[#d4b5a3] uppercase mb-10">Your Selections</h2>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {cart.length === 0 ? <p className="text-center text-gray-500 italic py-10">Your bag is empty</p> : cart.map((item, index) => (
                  <div key={index} className="flex gap-4 bg-[#1a0b2e]/60 p-4 rounded-2xl border border-purple-500/5">
                    <img src={item.imageUrl} className="w-16 h-16 rounded-xl object-cover" alt="" />
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-gray-200 uppercase tracking-wide">{item.name}</p>
                      <p className="text-[#d4b5a3] text-sm mt-1">Rs. {item.price.toLocaleString()}.00</p>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="text-red-400/50 hover:text-red-400 text-[9px] font-bold uppercase transition-colors">Remove</button>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="mt-6 pt-6 border-t border-purple-500/10">
                  <div className="bg-[#d4b5a3]/5 border border-[#d4b5a3]/20 p-4 rounded-2xl mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1.5 h-1.5 bg-[#d4b5a3] rounded-full animate-pulse"></div>
                      <h4 className="text-[10px] font-bold text-[#d4b5a3] uppercase tracking-widest">Personalize it!</h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed italic">
                      "Customizations can be discussed via WhatsApp. Final price may change based on your requirements."
                    </p>
                  </div>
                  <div className="flex justify-between mb-6 px-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Total Amount</span>
                    <span className="text-lg font-bold text-white">Rs. {cart.reduce((s, i) => s + i.price, 0).toLocaleString()}.00</span>
                  </div>
                  <button onClick={sendWhatsAppOrder} className="w-full py-4 bg-[#25D366] hover:bg-[#1ebd58] text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg">
                    <i className="fa-brands fa-whatsapp text-2xl"></i> Order via WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <Routes>
          <Route path="/" element={<HomeContent filteredProducts={filteredProducts} categories={categories} activeCategory={activeCategory} filterCategory={filterCategory} addToCart={addToCart} />} />
          <Route path="/manage-hashicreations" element={<Admin />} />
        </Routes>

        <style>{`
          @keyframes water-flow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
          .animate-water-flow { animation: water-flow 4s linear infinite; }
          .animate-float { animation: float 5s ease-in-out infinite; }
          .custom-scrollbar::-webkit-scrollbar { width: 3px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 181, 163, 0.2); border-radius: 10px; }
        `}</style>
      </LayoutWrapper>
    </Router>
  );
}

export default App;