import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Admin() {
  // --- Login new States ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIn, setUserIn] = useState('');
  const [passIn, setPassIn] = useState('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [processingTime, setProcessingTime] = useState(''); 
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]); 
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    'Resin Art Creations', 'Wedding Ring Holders', 'Flower Bunch', 
    'Flower Vase', 'Teddy Bears', 'Birthday Packages', 'Gift Box'
  ];

  const [category, setCategory] = useState(categories[0]); 

  useEffect(() => {
    if (isLoggedIn) fetchProducts();
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) { console.error(err); }
  };

  // --- Check Login Function ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (userIn === 'admin' && passIn === 'hashi@123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password!');
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditId(product._id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setProcessingTime(product.processingTime || ''); 
    setImage(null); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('processingTime', processingTime); 
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, formData);
        alert('Product Updated!');
      } else {
        await axios.post('http://localhost:5000/api/products', formData);
        alert('Product Added!');
      }
      setName(''); setPrice(''); setProcessingTime(''); setImage(null); setIsEditing(false);
      fetchProducts();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) { console.error(err); }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0f051d] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-[#1a0b2e]/90 backdrop-blur-3xl p-10 rounded-[3rem] border border-purple-500/20 shadow-2xl text-center">
          <div className="w-20 h-20 rounded-full border border-[#d4b5a3]/30 p-1 mb-6 mx-auto">
              <img src="/logo.jpeg" alt="Logo" className="w-full h-full rounded-full object-cover" />
          </div>
          <h2 className="text-xl font-light tracking-[0.3em] text-[#d4b5a3] uppercase mb-8">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="text" placeholder="Username" 
              className="w-full bg-[#0f051d]/50 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none text-white text-sm"
              onChange={(e) => setUserIn(e.target.value)}
              required
            />
            <input 
              type="password" placeholder="Password" 
              className="w-full bg-[#0f051d]/50 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none text-white text-sm"
              onChange={(e) => setPassIn(e.target.value)}
              required
            />
            <button type="submit" className="w-full py-4 bg-[#d4b5a3] text-black font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f051d] text-white flex flex-col font-sans relative">
      
      {/* --- Navbar --- */}
      <nav className="w-full py-6 px-8 md:px-16 flex justify-between items-center bg-[#0f051d]/80 backdrop-blur-md sticky top-0 z-[1000] border-b border-white/5">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4">
            <img src="/logo.jpeg" className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-[#d4b5a3]/20" alt="Logo" />
            <h1 className="text-sm md:text-xl font-bold tracking-[0.3em] text-[#d4b5a3] uppercase">HASHI CREATIONS</h1>
          </Link>
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center space-x-12 text-[11px] font-bold tracking-[0.2em] uppercase">
            <Link to="/" className="text-white hover:text-[#d4b5a3] transition-colors">HOME</Link>
            
            {/* මෙතන ලින්ක් එක වෙනස් කළා scroll එක වැඩ කරන්න */}
            <Link 
                to="/" 
                className="text-white hover:text-[#d4b5a3] transition-colors"
                onClick={() => {
                    setTimeout(() => {
                        const el = document.getElementById('collection');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                }}
            >
                COLLECTION
            </Link>
          </div>
          
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="text-white hover:text-red-400 transition-colors"
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">LOGOUT</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-col items-center py-12 p-6 relative">
        <div className="absolute w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>
        
        {/* Form Section */}
        <div className="w-full max-w-lg bg-[#1a0b2e]/80 backdrop-blur-2xl p-10 rounded-[3rem] border border-purple-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-12 mt-4">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-full border border-[#d4b5a3]/30 p-1 mb-4">
               <img src="/logo.jpeg" alt="Logo" className="w-full h-full rounded-full object-cover opacity-80" />
            </div>
            <h2 className="text-2xl font-light tracking-[0.3em] text-[#d4b5a3] uppercase">{isEditing ? 'Edit Product' : 'Admin Panel'}</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-7">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Creation Name" className="w-full bg-[#0f051d]/50 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none text-sm text-white" required />
            
            <div className="relative group">
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full bg-[#0f051d]/50 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none text-sm appearance-none cursor-pointer group-hover:border-purple-500/40 transition-all text-white"
              >
                {categories.map(cat => <option key={cat} value={cat} className="bg-[#1a0b2e]">{cat}</option>)}
              </select>
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-purple-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (LKR)" className="w-full bg-[#0f051d]/50 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none text-sm text-white" required />
            <input type="text" value={processingTime} onChange={(e) => setProcessingTime(e.target.value)} placeholder="Processing Time" className="w-full bg-[#0f051d]/50 border border-purple-500/20 rounded-2xl px-5 py-4 outline-none text-sm text-white" />
            
            {isEditing && !image && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-[9px] text-[#d4b5a3] uppercase tracking-[0.2em]">Current Image</p>
                <img 
                  src={products.find(p => p._id === editId)?.imageUrl} 
                  alt="Current" 
                  className="w-24 h-24 object-cover rounded-2xl border border-purple-500/30"
                />
              </div>
            )}

            <label className="w-full flex flex-col items-center px-4 py-6 bg-[#0f051d]/30 border-2 border-dashed border-purple-500/20 rounded-2xl cursor-pointer hover:bg-purple-500/5 transition-all group">
              <svg className="w-8 h-8 text-purple-400 group-hover:text-[#d4b5a3] transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">{image ? image.name : (isEditing ? "Change Image (Optional)" : "Select Image File")}</span>
              <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} required={!isEditing} />
            </label>

            <button type="submit" className="w-full py-5 bg-[#d4b5a3] text-black font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all">
              {isEditing ? 'Update Product' : 'List Product'}
            </button>
            
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setName(''); setPrice(''); setProcessingTime(''); setImage(null); }} className="w-full text-[9px] text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
                Cancel Editing
              </button>
            )}
          </form>
        </div>

        {/* Manage Inventory Section */}
        <div className="w-full max-w-5xl">
          <h3 className="text-xl font-bold tracking-[0.4em] text-[#d4b5a3] uppercase text-center mb-10">Manage Inventory</h3>
          
          <div className="max-w-md mx-auto mb-8">
            <input 
              type="text" 
              placeholder="Search items..." 
              className="w-full px-6 py-4 rounded-2xl bg-[#1a0b2e]/60 border border-purple-500/20 outline-none text-sm text-center text-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategory(activeCategory === tab ? null : tab)}
                    className={`px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all border ${
                        activeCategory === tab 
                        ? 'bg-[#d4b5a3] text-black border-[#d4b5a3]' 
                        : 'bg-[#1a0b2e]/60 text-purple-300 border-purple-500/20 hover:border-purple-500/50'
                    }`}
                  >
                      {tab}
                  </button>
              ))}
          </div>

          <div className="space-y-8">
            {(activeCategory || searchTerm) ? (
              <div className="animate-fadeIn">
                {activeCategory && (
                  <h4 className="text-[12px] font-bold tracking-[0.3em] text-purple-300 uppercase mb-6 text-center border-b border-purple-500/10 pb-4">
                    {activeCategory}
                  </h4>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter(p => (!activeCategory || p.category === activeCategory) && p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(p => (
                      <div key={p._id} className="flex items-center gap-4 bg-[#1a0b2e]/60 p-5 rounded-[2rem] border border-purple-500/10">
                        <img src={p.imageUrl} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                        <div className="flex-grow">
                          <p className="text-[10px] font-bold uppercase text-gray-200">{p.name}</p>
                          <p className="text-[9px] text-[#d4b5a3]">Rs. {p.price}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button onClick={() => handleEdit(p)} className="text-[9px] text-blue-400 p-1 hover:underline font-bold">Edit</button>
                          <button onClick={() => handleDelete(p._id)} className="text-[9px] text-red-400 p-1 hover:underline font-bold">Del</button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-[10px] text-purple-300/30 uppercase tracking-[0.2em] mt-10">
                Select a category to manage items
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;