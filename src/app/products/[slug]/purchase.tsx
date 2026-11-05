"use client";
import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
export default function ProductPurchase({slug}:{slug:string}) { const [added,setAdded]=useState(false); function add(){try{const key="kaarigiri-cart-v1";const raw=localStorage.getItem(key);const cart=raw?JSON.parse(raw):{};const current=cart&&typeof cart==="object"&&!Array.isArray(cart)?cart:{};current[slug]=Math.min(99,(Number(current[slug])||0)+1);localStorage.setItem(key,JSON.stringify(current));setAdded(true);window.setTimeout(()=>setAdded(false),1800);window.dispatchEvent(new Event("kaarigiri-cart-updated"));}catch{setAdded(false);}} return <button className="btn detail-add" onClick={add}>{added?<><Check size={16}/> Added to bag</>:<><ShoppingBag size={16}/> Add to bag</>}</button>; }
