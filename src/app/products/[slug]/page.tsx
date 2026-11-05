import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";
import ProductPurchase from "./purchase";
export function generateStaticParams() { return products.map(product => ({ slug: product.slug })); }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params; const product = products.find(item => item.slug === slug); if (!product) notFound();
 return <main className="detail-page"><nav className="detail-nav"><Link href="/">kaarigiri.</Link><Link href="/#collection">Continue shopping</Link></nav><div className="detail-layout"><div className="detail-photo"><img src={product.image} alt={product.name}/></div><section className="detail-copy"><div className="eyebrow">{product.category} · KAARIGIRI EDIT</div><h1 className="serif">{product.name}</h1><p>{product.description}</p><div className="detail-price">Rs. {product.pricePKR.toLocaleString("en-PK")} <span>/ ${product.priceUSD.toFixed(2)}</span></div><p className="detail-note">Thoughtfully selected for everyday living. Availability is confirmed at checkout.</p><ProductPurchase slug={product.slug}/><Link href="/#collection" className="detail-back">← Back to collection</Link></section></div></main>;
}
