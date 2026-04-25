import { useState, useEffect, useRef } from "react";

const flowers = [
  { id: 1, name: "Rose Blush Bouquet", price: 48, tag: "Bestseller", desc: "Twelve premium red & blush roses wrapped in soft silk ribbon.", img: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=600&q=80" },
  { id: 2, name: "Peony Dreams", price: 62, tag: "Seasonal", desc: "Lush garden peonies in shades of dusty rose and cream.", img: "https://images.unsplash.com/photo-1490750967868-88df5691cc18?w=600&q=80" },
  { id: 3, name: "Cherry Blossom Vase", price: 55, tag: "Popular", desc: "Delicate Japanese cherry blossoms in a handcrafted ceramic vase.", img: "https://images.unsplash.com/photo-1524247108137-732e0f642303?w=600&q=80" },
  { id: 4, name: "Pink Wildflower Mix", price: 38, tag: "Everyday", desc: "A cheerful mix of seasonal wildflowers in rosy hues.", img: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&q=80" },
  { id: 5, name: "Tulip Sunset", price: 44, tag: "New", desc: "Vibrant tulips in warm pink and coral tones — pure joy.", img: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=600&q=80" },
  { id: 6, name: "Magnolia Elegance", price: 74, tag: "Premium", desc: "Statement magnolia stems arranged for maximum drama.", img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80" },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500&q=80", label: "Bridal Collection", tall: true },
  { src: "https://images.unsplash.com/photo-1487530811015-780780a9edf5?w=500&q=80", label: "Garden Roses" },
  { src: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=500&q=80", label: "Pink Peonies" },
  { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80", label: "Wildflower Fields", tall: true },
  { src: "https://images.unsplash.com/photo-1455793823903-8285bbb8f2c9?w=500&q=80", label: "Tulip Season" },
  { src: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=500&q=80", label: "Pastel Dreams" },
];

const testimonials = [
  { name: "Sofia Reyes", text: "Frank Flowershop made my wedding day absolutely magical. Every bloom was perfect!", stars: 5, role: "Bride", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { name: "Marcus Lee", text: "I order flowers every month for my mom. She always cries happy tears. Incredible quality.", stars: 5, role: "Regular Customer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { name: "Elena Vasquez", text: "The peonies I ordered lasted two weeks! The freshness and service is unmatched.", stars: 5, role: "Florist Enthusiast", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
];

const navLinks = ["Home", "Shop", "About", "Gallery", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Img({ src, alt, style, fallback = "#fde8f0" }) {
  const [err, setErr] = useState(false);
  if (err) return <div style={{ ...style, background: fallback, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>🌸</div>;
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} loading="lazy" />;
}

function Stars({ n }) {
  return <div style={{ display: "flex", gap: 2 }}>{Array.from({ length: n }).map((_, i) => <span key={i} style={{ color: "#e84393", fontSize: 15 }}>★</span>)}</div>;
}

function FlowerCard({ flower, onAdd }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  function handleAdd() { setAdded(true); onAdd(flower); setTimeout(() => setAdded(false), 1500); }
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", borderRadius: 24, overflow: "hidden", border: "1.5px solid #fde8f0", display: "flex", flexDirection: "column", cursor: "pointer", transition: "all 0.38s cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "translateY(-10px)" : "translateY(0)", boxShadow: hovered ? "0 24px 60px rgba(232,67,147,0.2)" : "0 4px 24px rgba(200,100,150,0.09)" }}>
      <div style={{ position: "relative", height: 230, overflow: "hidden" }}>
        <Img src={flower.img} alt={flower.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.55s ease", transform: hovered ? "scale(1.1)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.15))", transition: "all 0.4s" }} />
        <span style={{ position: "absolute", top: 14, right: 14, background: "#e84393", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 0.8, padding: "4px 12px", borderRadius: 20, textTransform: "uppercase", boxShadow: "0 2px 12px rgba(232,67,147,0.4)" }}>{flower.tag}</span>
        {hovered && <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderRadius: 30, padding: "6px 18px", fontSize: 12, fontWeight: 700, color: "#e84393", whiteSpace: "nowrap" }}>✨ Quick View</div>}
      </div>
      <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <h3 style={{ margin: 0, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: "#1a0a12", fontWeight: 700 }}>{flower.name}</h3>
        <p style={{ margin: 0, fontSize: 13.5, color: "#8b4a68", lineHeight: 1.6 }}>{flower.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 14 }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: "#e84393" }}>${flower.price}</span>
          <button onClick={handleAdd} style={{ background: added ? "#4caf7d" : "#e84393", color: "#fff", border: "none", borderRadius: 14, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.25s ease", boxShadow: added ? "0 4px 16px rgba(76,175,125,0.4)" : "0 4px 16px rgba(232,67,147,0.35)" }}>{added ? "✓ Added!" : "Add to Cart"}</button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onRemove }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ flex: 1, background: "rgba(30,0,20,0.45)", backdropFilter: "blur(6px)" }} />
      <div style={{ width: "min(400px,96vw)", background: "#fff", height: "100%", overflowY: "auto", padding: "30px 24px", display: "flex", flexDirection: "column", gap: 20, boxShadow: "-12px 0 60px rgba(200,80,140,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: "#1a0a12" }}>Your Bouquet 🛒</h2>
          <button onClick={onClose} style={{ background: "#fde8f0", border: "none", borderRadius: 12, width: 38, height: 38, fontSize: 18, cursor: "pointer", color: "#e84393" }}>✕</button>
        </div>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 0", color: "#b06890" }}>
            <Img src="https://images.unsplash.com/photo-1490750967868-88df5691cc18?w=200&q=70" alt="empty" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", margin: "0 auto 16px", display: "block", opacity: 0.5 }} />
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18 }}>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fef4f8", borderRadius: 16, padding: "12px 14px", border: "1px solid #fde8f0" }}>
                  <Img src={item.img} alt={item.name} style={{ width: 54, height: 54, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: "#1a0a12" }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#b06890" }}>${item.price} × {item.qty}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontWeight: 700, color: "#e84393" }}>${item.price * item.qty}</p>
                    <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#c0607e", fontSize: 11, cursor: "pointer" }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1.5px solid #fde8f0", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: "#1a0a12" }}>Total</span>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: "#e84393" }}>${total}</span>
              </div>
              <button style={{ background: "linear-gradient(135deg, #e84393, #f472b6)", color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 24px rgba(232,67,147,0.35)" }}>Checkout — ${total} 🌷</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FadeSection({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)" }}>
      {children}
    </div>
  );
}

export default function FrankFlowershop() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [floatVisible, setFloatVisible] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      setFloatVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function addToCart(f) {
    setCart(prev => {
      const ex = prev.find(i => i.id === f.id);
      return ex ? prev.map(i => i.id === f.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...f, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function goTo(name) {
    const el = document.getElementById(name.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
    setActive(name);
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ fontFamily: "'Lato','Helvetica Neue',sans-serif", background: "#fff5f9", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        *{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;width:100%;overflow-x:hidden}
        @keyframes floatUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        @keyframes petal{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(6deg)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes heroImg{from{opacity:0;transform:scale(1.06)}to{opacity:1;transform:scale(1)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes pulseRing{0%{transform:scale(1);opacity:0.6}100%{transform:scale(1.7);opacity:0}}
        @keyframes fadeSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar{width:8px} ::-webkit-scrollbar-thumb{background:#f4a7b9;border-radius:4px}
        input,textarea{outline:none;font-family:inherit} button{font-family:inherit}
        .dn-mobile{display:flex} .show-mobile{display:none}
        @media(max-width:768px){.dn-mobile{display:none!important}.show-mobile{display:flex!important}}
        @media(max-width:640px){.hero-grid{grid-template-columns:1fr!important}.hero-right{display:none!important}.two-col{grid-template-columns:1fr!important}}
        .float-btn{position:fixed;bottom:30px;right:30px;z-index:800;background:linear-gradient(135deg,#e84393,#f472b6);color:#fff;border:none;border-radius:50px;padding:14px 24px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 8px 32px rgba(232,67,147,0.45);transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);display:flex;align-items:center;gap:8px}
        .float-btn:hover{transform:scale(1.08) translateY(-3px);box-shadow:0 14px 40px rgba(232,67,147,0.55)}
        .float-btn::before{content:'';position:absolute;inset:0;border-radius:50px;background:linear-gradient(135deg,#e84393,#f472b6);animation:pulseRing 1.8s ease-out infinite;z-index:-1}
      `}</style>

      {/* ANNOUNCEMENT BANNER */}
      {!bannerDismissed && (
        <div style={{ background: "linear-gradient(90deg,#c41a6e,#e84393,#f472b6)", color: "#fff", padding: "10px 20px", textAlign: "center", fontSize: 13, fontWeight: 600, position: "relative", letterSpacing: 0.5, zIndex: 600 }}>
          🌹 Free delivery on orders over $50 · Use code <strong>BLOOM20</strong> for 20% off your first order 🌷
          <button onClick={() => setBannerDismissed(true)} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", cursor: "pointer", borderRadius: 8, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✕</button>
        </div>
      )}

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 500, background: scrolled ? "rgba(255,245,249,0.97)" : "transparent", backdropFilter: scrolled ? "blur(18px)" : "none", borderBottom: scrolled ? "1px solid #fde8f0" : "none", transition: "all 0.35s ease", padding: "0 clamp(16px,5vw,60px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => goTo("Home")}>
            <Img src="https://images.unsplash.com/photo-1490750967868-88df5691cc18?w=60&q=80" alt="logo" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid #f9c0d0" }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 700, color: "#c41a6e", lineHeight: 1 }}>Frank</div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#e84393", textTransform: "uppercase", fontWeight: 700 }}>Flowershop</div>
            </div>
          </div>
          <div className="dn-mobile" style={{ gap: 4, alignItems: "center" }}>
            {navLinks.map(l => (
              <button key={l} onClick={() => goTo(l)} style={{ background: active === l ? "#fde8f0" : "transparent", border: "none", padding: "8px 16px", borderRadius: 20, color: active === l ? "#e84393" : "#6b3050", fontWeight: active === l ? 700 : 400, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setCartOpen(true)} style={{ background: "#e84393", color: "#fff", border: "none", borderRadius: 20, padding: "9px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(232,67,147,0.35)" }}>
              🛒 Cart {cartCount > 0 && <span style={{ background: "#fff", color: "#e84393", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900 }}>{cartCount}</span>}
            </button>
            <button className="show-mobile" onClick={() => setMobileMenu(!mobileMenu)} style={{ background: "#fde8f0", border: "none", borderRadius: 12, width: 42, height: 42, fontSize: 20, cursor: "pointer", color: "#e84393", alignItems: "center", justifyContent: "center" }}>{mobileMenu ? "✕" : "☰"}</button>
          </div>
        </div>
        {mobileMenu && (
          <div style={{ background: "#fff", borderTop: "1px solid #fde8f0", padding: "16px 20px 20px", animation: "fadeIn 0.2s ease" }}>
            {navLinks.map(l => <button key={l} onClick={() => goTo(l)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "12px 4px", fontSize: 18, color: "#c41a6e", fontFamily: "'Playfair Display',Georgia,serif", cursor: "pointer", borderBottom: "1px solid #fde8f0" }}>{l}</button>)}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", width: "100%", background: "linear-gradient(155deg,#fce4ef 0%,#fff0f5 45%,#ffd6e7 100%)", display: "flex", alignItems: "center", padding: "80px clamp(16px,5vw,60px) 70px", position: "relative", overflow: "hidden" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "8%", right: "4%", width: "clamp(200px,30vw,360px)", height: "clamp(200px,30vw,360px)", borderRadius: "63% 37% 54% 46%/55% 48% 52% 45%", background: "rgba(255,183,197,0.25)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "14%", left: "2%", width: "clamp(140px,20vw,240px)", height: "clamp(140px,20vw,240px)", borderRadius: "42% 58% 70% 30%/45% 45% 55% 55%", background: "rgba(249,192,208,0.2)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "55%", right: "36%", width: 80, height: 80, borderRadius: "50%", background: "rgba(232,67,147,0.08)", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(30px,6vw,80px)", alignItems: "center", position: "relative", zIndex: 1 }}>
          {/* Left */}
          <div style={{ animation: "floatUp 0.9s cubic-bezier(.22,1,.36,1) 0.1s both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,67,147,0.1)", border: "1px solid #f9c0d0", borderRadius: 30, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ fontSize: 14 }}>🌺</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#c41a6e", letterSpacing: 1.5, textTransform: "uppercase" }}>Fresh & Handcrafted Daily</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(40px,6.5vw,76px)", fontWeight: 700, color: "#1a0a12", margin: "0 0 22px", lineHeight: 1.12 }}>
              Where Every<br /><span style={{ color: "#e84393", fontStyle: "italic" }}>Petal Tells</span><br />a Story
            </h1>
            <p style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "#7a3a58", lineHeight: 1.75, maxWidth: 460, marginBottom: 36 }}>
              Handcrafted bouquets made with love, delivered fresh to your door. Because the most important moments deserve the most beautiful flowers.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={() => goTo("Shop")} style={{ background: "linear-gradient(135deg,#e84393,#f472b6)", color: "#fff", border: "none", borderRadius: 16, padding: "16px 34px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 30px rgba(232,67,147,0.38)", transition: "all 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04) translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                Shop Now 🌷
              </button>
              <button onClick={() => goTo("About")} style={{ background: "transparent", color: "#e84393", border: "2px solid #e84393", borderRadius: 16, padding: "16px 34px", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "all 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fde8f0"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                Our Story
              </button>
            </div>
            <div style={{ display: "flex", gap: 34, marginTop: 46, flexWrap: "wrap" }}>
              {[["500+", "Happy Clients"], ["12+", "Years of Love"], ["100%", "Fresh Flowers"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 30, fontWeight: 700, color: "#e84393" }}>{num}</div>
                  <div style={{ fontSize: 12, color: "#9a5070", letterSpacing: 0.5, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right images */}
          <div className="hero-right" style={{ position: "relative", height: 530, animation: "floatUp 1s cubic-bezier(.22,1,.36,1) 0.25s both" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "73%", height: 400, borderRadius: "58% 42% 50% 50%/40% 50% 50% 60%", overflow: "hidden", boxShadow: "0 30px 80px rgba(232,67,147,0.24)", border: "4px solid rgba(255,255,255,0.75)" }}>
              <Img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=700&q=85" alt="Beautiful pink roses" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", animation: "heroImg 1.3s ease both" }} />
            </div>
            <div style={{ position: "absolute", bottom: 24, left: 0, width: "46%", height: 220, borderRadius: 26, overflow: "hidden", boxShadow: "0 16px 50px rgba(200,80,140,0.22)", border: "4px solid rgba(255,255,255,0.8)", animation: "floatUp 1.1s cubic-bezier(.22,1,.36,1) 0.4s both" }}>
              <Img src="https://images.unsplash.com/photo-1490750967868-88df5691cc18?w=400&q=80" alt="Peonies" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(200,50,110,0.5),transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 12, left: 14, color: "#fff", fontWeight: 700, fontSize: 13 }}>Peonies 🌸</div>
            </div>
            <div style={{ position: "absolute", top: 18, left: "16%", background: "#fff", borderRadius: 20, padding: "10px 16px", boxShadow: "0 8px 30px rgba(200,80,140,0.2)", display: "flex", alignItems: "center", gap: 10, animation: "petal 4s ease-in-out infinite" }}>
              <Img src="https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=60&q=70" alt="rose" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#1a0a12" }}>4.9/5 Rating</div>
                <div style={{ fontSize: 11, color: "#b06890" }}>500+ Reviews</div>
              </div>
            </div>
            {/* extra badge: delivery */}
            <div style={{ position: "absolute", bottom: 60, right: "2%", background: "linear-gradient(135deg,#e84393,#f472b6)", borderRadius: 18, padding: "10px 16px", boxShadow: "0 8px 24px rgba(232,67,147,0.35)", color: "#fff", animation: "petal 5s ease-in-out 1s infinite" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>🚚 Same Day Delivery</div>
              <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2 }}>Order before 2PM</div>
            </div>
          </div>
        </div>
        <svg style={{ position: "absolute", bottom: -2, left: 0, width: "100%", pointerEvents: "none" }} viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#fff5f9" />
        </svg>
      </section>

      {/* SCROLLING MARQUEE STRIP */}
      <div style={{ background: "#1a0a12", padding: "14px 0", overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", animation: "marquee 22s linear infinite", width: "max-content" }}>
          {[...Array(3)].map((_, k) => (
            <div key={k} style={{ display: "flex", gap: 0 }}>
              {["🌸 Fresh Flowers Daily", "✨ Free Gift Wrapping", "🚚 Same-Day Delivery", "🌹 Weddings & Events", "💐 Custom Arrangements", "🌷 Sustainably Sourced"].map(item => (
                <span key={item} style={{ color: "#f9c0d0", fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", padding: "0 40px", whiteSpace: "nowrap" }}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ background: "#fff5f9", padding: "50px clamp(16px,5vw,60px)" }}>
        <FadeSection>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {[
              { icon: "🚚", title: "Free Delivery", sub: "On orders over $50" },
              { icon: "🌿", title: "Farm Fresh", sub: "Sourced sustainably" },
              { icon: "🎀", title: "Gift Wrapping", sub: "Complimentary" },
              { icon: "⚡", title: "Same-Day Orders", sub: "Order by 2PM" },
            ].map(f => (
              <div key={f.title} style={{ background: "#fff", border: "1.5px solid #fde8f0", borderRadius: 20, padding: "22px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 16px rgba(200,100,150,0.06)", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#f4a7b9"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(200,100,150,0.13)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#fde8f0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(200,100,150,0.06)"; }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#fce4ef,#ffd6e7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#1a0a12", fontSize: 15 }}>{f.title}</div>
                  <div style={{ color: "#9a5070", fontSize: 12, marginTop: 2 }}>{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* SHOP */}
      <section id="shop" style={{ padding: "80px clamp(16px,5vw,60px)", background: "#fff5f9", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: 54 }}>
              <div style={{ fontSize: 12, letterSpacing: 3, color: "#e84393", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Our Collection</div>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(32px,5vw,52px)", margin: 0, color: "#1a0a12" }}>Handpicked <em style={{ color: "#e84393" }}>Favorites</em></h2>
              <p style={{ color: "#7a3a58", marginTop: 14, fontSize: 16, maxWidth: 500, margin: "14px auto 0" }}>Each arrangement is crafted with care and delivered in pristine condition.</p>
            </div>
          </FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 26 }}>
            {flowers.map((f, i) => (
              <FadeSection key={f.id} delay={i * 0.08}>
                <FlowerCard flower={f} onAdd={addToCart} />
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "90px clamp(16px,5vw,60px)", background: "linear-gradient(155deg,#fce4ef,#fff5f9)", width: "100%" }}>
        <FadeSection>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 60, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 3, color: "#e84393", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Our Story</div>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(30px,4.5vw,48px)", color: "#1a0a12", margin: "0 0 20px" }}>Blooming Since <em style={{ color: "#e84393" }}>2012</em></h2>
              <p style={{ color: "#6b3050", lineHeight: 1.8, fontSize: 16, marginBottom: 18 }}>Frank Flowershop was born from a simple belief — that flowers have the power to transform any moment into something unforgettable. Our founder Frank started arranging flowers from his grandmother's garden, and what began as a passion became a calling.</p>
              <p style={{ color: "#6b3050", lineHeight: 1.8, fontSize: 16, marginBottom: 28 }}>Today, we work with local farmers and sustainable growers to bring you the freshest blooms, arranged by hand with an eye for beauty and a heart full of care.</p>
              <div style={{ display: "flex", gap: 10 }}>
                {["https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200&q=70", "https://images.unsplash.com/photo-1524247108137-732e0f642303?w=200&q=70", "https://images.unsplash.com/photo-1530092285049-1c42085fd395?w=200&q=70"].map((src, i) => (
                  <Img key={i} src={src} alt="florist" style={{ flex: 1, height: 80, borderRadius: 16, objectFit: "cover", border: "2px solid #fde8f0" }} />
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { src: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&q=80", label: "Roses" },
                { src: "https://images.unsplash.com/photo-1490750967868-88df5691cc18?w=400&q=80", label: "Peonies" },
                { src: "https://images.unsplash.com/photo-1530092285049-1c42085fd395?w=400&q=80", label: "Tulips" },
                { src: "https://images.unsplash.com/photo-1499978697261-d64d4e19bc56?w=400&q=80", label: "Exotics" },
              ].map(item => (
                <div key={item.label} style={{ borderRadius: 22, overflow: "hidden", position: "relative", height: 180, boxShadow: "0 8px 30px rgba(200,80,140,0.12)", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                  <Img src={item.src} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(180,60,110,0.5),transparent 55%)" }} />
                  <div style={{ position: "absolute", bottom: 10, left: 14, color: "#fff", fontWeight: 700, fontSize: 14 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>
      </section>

      {/* BANNER CTA */}
      <section style={{ position: "relative", overflow: "hidden", height: 380, width: "100%" }}>
        <Img src="https://images.unsplash.com/photo-1487530811015-780780a9edf5?w=1400&q=80" alt="flower field" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(200,30,100,0.72),rgba(232,67,147,0.5))", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "0 20px" }}>
          <FadeSection>
            <div style={{ fontSize: 12, letterSpacing: 4, color: "rgba(255,255,255,0.8)", fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>Limited Time Offer</div>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(26px,5vw,52px)", color: "#fff", margin: "0 0 16px", textShadow: "0 2px 20px rgba(0,0,0,0.2)" }}>20% Off Wedding Collections</h2>
            <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 17, marginBottom: 28, maxWidth: 500 }}>Book your bridal bouquet this month and receive a complimentary centerpiece arrangement.</p>
            <button onClick={() => goTo("Contact")} style={{ background: "#fff", color: "#e84393", border: "none", borderRadius: 16, padding: "14px 36px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 24px rgba(0,0,0,0.15)", transition: "all 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              Claim Your Offer 🌹
            </button>
          </FadeSection>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "90px clamp(16px,5vw,60px)", background: "#fff5f9", width: "100%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <div style={{ fontSize: 12, letterSpacing: 3, color: "#e84393", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Testimonials</div>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(30px,4.5vw,48px)", color: "#1a0a12", margin: 0 }}>What Our <em style={{ color: "#e84393" }}>Customers</em> Say</h2>
            </div>
          </FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {testimonials.map((t, i) => (
              <FadeSection key={t.name} delay={i * 0.1}>
                <div style={{ background: "#fff", border: "1.5px solid #fde8f0", borderRadius: 24, padding: "28px 26px", boxShadow: "0 4px 20px rgba(200,100,150,0.07)", transition: "all 0.3s", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 14px 44px rgba(200,100,150,0.15)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,100,150,0.07)"; }}>
                  <Stars n={t.stars} />
                  <p style={{ color: "#4a1a32", lineHeight: 1.75, fontSize: 15, margin: "16px 0" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Img src={t.avatar} alt={t.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: "2.5px solid #f9c0d0", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#1a0a12" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#b06890" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: "80px clamp(16px,5vw,60px)", background: "linear-gradient(135deg,#fce4ef,#fff5f9)", width: "100%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <div style={{ fontSize: 12, letterSpacing: 3, color: "#e84393", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Gallery</div>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(30px,4.5vw,48px)", color: "#1a0a12", margin: 0 }}>A Bloom of <em style={{ color: "#e84393" }}>Beauty</em></h2>
            </div>
          </FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gridAutoRows: "10px", gap: 14 }}>
            {galleryImages.map((item, i) => (
              <div key={i} style={{ gridRowEnd: `span ${item.tall ? 26 : 18}`, borderRadius: 22, overflow: "hidden", position: "relative", cursor: "pointer", boxShadow: "0 4px 20px rgba(200,80,140,0.1)", transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(200,80,140,0.22)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,80,140,0.1)"; }}>
                <Img src={item.src} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(180,50,100,0.6) 0%,transparent 45%)" }} />
                <div style={{ position: "absolute", bottom: 14, left: 14, color: "#fff", fontWeight: 700, fontSize: 13, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEASONAL DEALS */}
      <section style={{ padding: "70px clamp(16px,5vw,60px)", background: "#fff5f9", width: "100%" }}>
        <FadeSection>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 12, letterSpacing: 3, color: "#e84393", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Special Occasions</div>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,4vw,44px)", color: "#1a0a12", margin: 0 }}>Perfect for <em style={{ color: "#e84393" }}>Every Moment</em></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
              {[
                { icon: "💍", label: "Weddings", color: "#fce4ef", accent: "#e84393" },
                { icon: "🎂", label: "Birthdays", color: "#fdf0e8", accent: "#e8a043" },
                { icon: "💕", label: "Romance", color: "#fce4ef", accent: "#c41a6e" },
                { icon: "🏥", label: "Get Well", color: "#e8f5ef", accent: "#4caf7d" },
                { icon: "🎓", label: "Graduation", color: "#e8ecf5", accent: "#4a6ee8" },
              ].map(item => (
                <div key={item.label} onClick={() => goTo("Shop")}
                  style={{ background: item.color, borderRadius: 24, padding: "28px 20px", textAlign: "center", cursor: "pointer", border: `1.5px solid ${item.accent}22`, transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px) scale(1.03)"; e.currentTarget.style.boxShadow = `0 16px 40px ${item.accent}33`; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700, fontSize: 16, color: item.accent }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: "#9a7080", marginTop: 4 }}>Shop now →</div>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "90px clamp(16px,5vw,60px)", background: "#fff5f9", width: "100%" }}>
        <FadeSection>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 50, alignItems: "start" }}>
            <div style={{ borderRadius: 28, overflow: "hidden", boxShadow: "0 16px 60px rgba(200,80,140,0.16)", position: "relative" }}>
              <Img src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=700&q=80" alt="Florist shop" style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(180,40,100,0.48),transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 28, left: 28, color: "#fff" }}>
                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Visit Our Shop</div>
                <div style={{ fontSize: 14, opacity: 0.9 }}>123 Blossom Street, Floral City</div>
                <div style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>Mon–Sat: 8AM – 7PM</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 3, color: "#e84393", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Get in Touch</div>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,4vw,44px)", color: "#1a0a12", margin: "0 0 14px" }}>Send Us a <em style={{ color: "#e84393" }}>Message</em></h2>
              <p style={{ color: "#7a3a58", marginBottom: 28, fontSize: 15, lineHeight: 1.7 }}>Custom orders, wedding inquiries, or just say hello — we'd love to hear from you!</p>
              <div style={{ background: "#fff", border: "1.5px solid #fde8f0", borderRadius: 24, padding: "clamp(20px,3vw,34px)", boxShadow: "0 6px 32px rgba(200,100,150,0.08)" }}>
                <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  {["Your Name", "Email Address"].map(ph => (
                    <input key={ph} placeholder={ph} style={{ border: "1.5px solid #fde8f0", borderRadius: 12, padding: "13px 15px", fontSize: 14, color: "#1a0a12", background: "#fff5f9", width: "100%", transition: "border-color 0.2s" }}
                      onFocus={e => e.target.style.borderColor = "#e84393"} onBlur={e => e.target.style.borderColor = "#fde8f0"} />
                  ))}
                </div>
                <textarea placeholder="Tell us about your dream arrangement... 🌹" rows={5} style={{ width: "100%", border: "1.5px solid #fde8f0", borderRadius: 12, padding: "13px 15px", fontSize: 14, color: "#1a0a12", background: "#fff5f9", resize: "vertical", marginBottom: 16, transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "#e84393"} onBlur={e => e.target.style.borderColor = "#fde8f0"} />
                <button style={{ background: "linear-gradient(135deg,#e84393,#f472b6)", color: "#fff", border: "none", borderRadius: 14, padding: "15px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 24px rgba(232,67,147,0.3)", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                  Send a Message 🌷
                </button>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1a0a12", color: "#f9c0d0", padding: "60px clamp(16px,5vw,60px) 30px", position: "relative", overflow: "hidden", width: "100%" }}>
        <Img src="https://images.unsplash.com/photo-1455793823903-8285bbb8f2c9?w=1200&q=30" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.07, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <Img src="https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=60&q=70" alt="logo" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid #f9c0d0" }} />
                <div>
                  <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 700, color: "#f9c0d0" }}>Frank</div>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: "#e84393", textTransform: "uppercase" }}>Flowershop</div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "#a06080", maxWidth: 220 }}>Where every petal tells a story of love, care, and nature's beauty.</p>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                {["📸", "📌", "👍"].map((icon, i) => (
                  <div key={i} style={{ width: 36, height: 36, background: "rgba(255,255,255,0.07)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(232,67,147,0.3)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>{icon}</div>
                ))}
              </div>
            </div>
            {[
              { title: "Shop", links: ["Bouquets", "Vase Flowers", "Gift Sets", "Seasonal"] },
              { title: "Help", links: ["Delivery Info", "Care Guide", "Returns", "FAQs"] },
              { title: "Connect", links: ["Instagram", "Pinterest", "Facebook", "Newsletter"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#e84393", marginBottom: 18 }}>{col.title}</div>
                {col.links.map(link => <div key={link} style={{ fontSize: 14, color: "#a06080", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#f9c0d0"} onMouseLeave={e => e.target.style.color = "#a06080"}>{link}</div>)}
              </div>
            ))}
          </div>
          {/* Newsletter */}
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: "26px 28px", border: "1px solid rgba(249,192,208,0.12)", marginBottom: 34, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: "#f9c0d0", marginBottom: 4 }}>Stay in Bloom 🌸</div>
              <div style={{ fontSize: 13, color: "#7a4060" }}>Get weekly flower inspiration & exclusive deals.</div>
            </div>
            <div style={{ display: "flex", gap: 10, flex: "1 1 280px", maxWidth: 400 }}>
              <input placeholder="your@email.com" style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(249,192,208,0.18)", borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#f9c0d0", outline: "none" }} />
              <button style={{ background: "#e84393", color: "#fff", border: "none", borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>Subscribe</button>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #2a1020", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div style={{ fontSize: 13, color: "#5a2840" }}>© 2026 Frank Flowershop. Made with 🌸 and love.</div>
            <div style={{ fontSize: 13, color: "#5a2840" }}>Privacy · Terms · Cookies</div>
          </div>
        </div>
      </footer>

      {/* FLOATING SHOP NOW BUTTON */}
      {floatVisible && (
        <button className="float-btn" onClick={() => goTo("Shop")} style={{ position: "fixed", bottom: 30, right: 30, zIndex: 800, background: "linear-gradient(135deg,#e84393,#f472b6)", color: "#fff", border: "none", borderRadius: 50, padding: "14px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(232,67,147,0.45)", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)", display: "flex", alignItems: "center", gap: 8, animation: "fadeSlideIn 0.4s ease both" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08) translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(232,67,147,0.55)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(232,67,147,0.45)"; }}>
          🌷 Shop Now
        </button>
      )}

      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />}
    </div>
  );
}