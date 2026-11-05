import Link from "next/link";

export default function OfflinePage() {
  return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:24,background:"#f7f5ef",color:"#22231f",textAlign:"center"}}>
    <div style={{maxWidth:520}}>
      <div style={{fontFamily:"Georgia,serif",fontSize:38}}>kaarigiri<span style={{color:"#b66d4b"}}>.</span></div>
      <p style={{fontSize:10,letterSpacing:".2em",textTransform:"uppercase",color:"#77786f",marginTop:34}}>A LITTLE PAUSE</p>
      <h1 style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:"clamp(38px,7vw,62px)",lineHeight:1.05}}>You’re currently offline.</h1>
      <p style={{fontSize:14,lineHeight:1.8,color:"#77786f"}}>It looks like your connection has taken a break. Please reconnect and try again. Your Kaarigiri experience will be here when you return.</p>
      <Link href="/" style={{display:"inline-block",marginTop:20,background:"#25271f",color:"#fff",padding:"15px 24px",fontSize:11,letterSpacing:".12em",textTransform:"uppercase"}}>Back to Kaarigiri</Link>
    </div>
  </main>;
}
