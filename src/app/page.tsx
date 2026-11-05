"use client";

import { useEffect, useMemo, useState } from "react";
import { ShoppingBag, ArrowUpRight, X, Plus, Minus, Check, Search, Trash2 } from "lucide-react";
import { products } from "@/lib/products";
import { calculateCartSubtotal, countCartItems, sanitizeCart } from "@/lib/cart";
import PWARegister from "./PWARegister";

type Currency = "PKR" | "USD";
const CART_KEY = "kaarigiri-cart-v1";
const CURRENCY_KEY = "kaarigiri-currency-v1";

export default function Home() {
  const [currency, setCurrency] = useState<Currency>("PKR");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartReady, setCartReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      const savedCurrency = localStorage.getItem(CURRENCY_KEY);
      if (savedCart) setCart(sanitizeCart(JSON.parse(savedCart)));
      if (savedCurrency === "PKR" || savedCurrency === "USD") setCurrency(savedCurrency);
    } catch {
      localStorage.removeItem(CART_KEY);
    } finally {
      setCartReady(true);
    }
  }, []);

  useEffect(() => {
    if (cartReady) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, cartReady]);

  useEffect(() => {
    localStorage.setItem(CURRENCY_KEY, currency);
  }, [currency]);

  const count = useMemo(() => countCartItems(cart), [cart]);
  const total = useMemo(() => calculateCartSubtotal(cart, currency), [cart, currency]);
  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesSearch = `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const money = (amount: number) => currency === "PKR"
    ? `Rs. ${amount.toLocaleString("en-PK")}`
    : `$${amount.toFixed(2)}`;

  function add(id: string) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setNotice("Added to your bag");
    window.setTimeout(() => setNotice(""), 1800);
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => {
      const next = { ...current, [id]: Math.max(0, (current[id] || 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  }

  return (
    <>
      <div className="announcement">THOUGHTFULLY MADE · DELIVERED WITH CARE</div>
      <header className="container site-header">
        <a href="#collection" className="eyebrow shop-link">SHOP</a>
        <a href="#" className="wordmark" aria-label="Kaarigiri home">kaarigiri<span>.</span></a>
        <div className="header-actions">
          <PWARegister />
          <label className="currency-picker">
            <span className="sr-only">Display currency</span>
            <select aria-label="Currency" value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}>
              <option value="PKR">PKR</option>
              <option value="USD">USD</option>
            </select>
          </label>
          <button className="bag-trigger" onClick={() => setOpen(true)} aria-label={`Open shopping bag, ${count} items`}>
            <ShoppingBag size={17} /> BAG ({count})
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">CRAFTED WITH PURPOSE · ROOTED IN CULTURE</div>
            <h1 className="serif">Objects with<br /><i>a story</i> to tell.</h1>
            <p>Discover thoughtfully crafted pieces that bring the beauty of skilled hands and meaningful traditions into everyday life.</p>
            <a href="#collection" className="btn">Explore the collection <ArrowUpRight size={15} /></a>
          </div>
          <div className="hero-image" role="img" aria-label="Warm, considered artisan-inspired home interior" />
        </section>

        <section className="container collection" id="collection">
          <div className="collection-heading">
            <div>
              <div className="eyebrow">THE KAARIGIRI EDIT</div>
              <h2 className="serif">Made to be lived with.</h2>
            </div>
            <p>A considered collection of everyday pieces.</p>
          </div>

          <div className="catalogue-tools">
            <label className="search-box">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection" aria-label="Search products" />
              {search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={15} /></button>}
            </label>
            <div className="category-list" aria-label="Filter by category">
              {categories.map((item) => (
                <button key={item} className={category === item ? "category-chip active" : "category-chip"} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>
              ))}
            </div>
          </div>

          <div className="products-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.tag && <span className="product-tag">{product.tag}</span>}
                  <button className="add-product" onClick={() => add(product.id)} aria-label={`Add ${product.name} to bag`}><Plus size={18} /></button>
                </div>
                <div className="product-info">
                  <div><div className="name">{product.name}</div><div className="eyebrow product-category">{product.category}</div></div>
                  <div className="price">{money(currency === "PKR" ? product.pricePKR : product.priceUSD)}</div>
                </div>
                <p className="product-description">{product.description}</p>
              </article>
            ))}
            {visibleProducts.length === 0 && <div className="empty-results">No pieces found. Try another search or category.</div>}
          </div>
        </section>

        <section className="belief">
          <div className="eyebrow">OUR BELIEF</div>
          <h2 className="serif">Good things take time. Beautiful things carry meaning.</h2>
          <p>Celebrating makers, materials and the stories woven into every detail.</p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div><div className="footer-wordmark serif">kaarigiri.</div><div className="footer-tagline">CRAFTED WITH PURPOSE.</div></div>
          <div className="copyright">© 2026 KAARIGIRI. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>

      {notice && <div role="status" className="toast"><Check size={14} />{notice}</div>}

      {open && (
        <div className="cart-backdrop" onClick={() => setOpen(false)}>
          <aside className="cart-panel" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="cart-heading">
              <h2 className="serif" id="cart-title">Your bag ({count})</h2>
              <button onClick={() => setOpen(false)} aria-label="Close shopping bag"><X /></button>
            </div>
            {!cartReady ? <p className="cart-empty">Restoring your bag…</p> : products.filter((product) => cart[product.id]).map((product) => (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt="" />
                <div className="cart-item-details">
                  <div className="cart-product-name serif">{product.name}</div>
                  <div className="cart-product-price">{money(currency === "PKR" ? product.pricePKR : product.priceUSD)}</div>
                  <div className="quantity-control">
                    <button onClick={() => changeQuantity(product.id, -1)} aria-label={`Remove one ${product.name}`}><Minus size={14} /></button>
                    <span>{cart[product.id]}</span>
                    <button onClick={() => changeQuantity(product.id, 1)} aria-label={`Add one ${product.name}`}><Plus size={14} /></button>
                    <button className="remove-item" onClick={() => setCart((current) => { const next = { ...current }; delete next[product.id]; return next; })} aria-label={`Remove ${product.name} from bag`}><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
            {count === 0 ? <p className="cart-empty">Your bag is waiting for something special.</p> : (
              <>
                <div className="cart-subtotal"><span>Subtotal</span><b>{money(total)}</b></div>
                <p className="checkout-note">Shipping and taxes are calculated at checkout. Online checkout is being prepared; no payment will be collected here yet.</p>
                <button className="btn checkout-disabled" disabled>Checkout coming soon</button>
                <button className="continue-shopping" onClick={() => setOpen(false)}>Continue shopping</button>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
