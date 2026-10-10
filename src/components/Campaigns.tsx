import { useEffect, useRef, useState } from 'react';
import { assetPath, DesignImage } from './DesignImage';
import './Campaigns.css';
function useScale(width: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => { const el = ref.current; if (!el) return; const observer = new ResizeObserver(entries => setScale(entries[0].contentRect.width / width)); observer.observe(el); return () => observer.disconnect(); }, [width]);
  return { ref, scale };
}
export function CareerCampaign({ onAction }: { onAction: (action: string) => void }) {
  const { ref, scale } = useScale(1292.818);
  const section = '182-4260';
  return <section className="career-campaign root-container" id="career-campaign" data-node-id="182:4260"><div className="campaign-panel" ref={ref}>
    <div className="campaign-canvas" style={{ transform: `scale(${scale})` }}>
      <DesignImage section={section} file="7adf2.png" x={931.55} y={180.62} width={358.53} height={122.8} opacity={.92} />
      <DesignImage section={section} file="7a153.svg" x={342.1} y={-79.56} width={606.63} height={477.348} />
      <DesignImage section={section} file="da67b.svg" x={0} y={0} width={1292.818} height={296.354} />
      <DesignImage section={section} file="3a025.svg" x={0} y={0} width={1292.818} height={296.354} />
      <DesignImage section={section} file="021bf.png" x={472.4} y={.85} width={295.3} height={295.3} />
      <DesignImage section={section} file="65d0f.svg" x={0} y={0} width={1292.818} height={296.354} />
      <div className="campaign-copy"><h2>Nâng cấp sự nghiệp cùng<strong>JobsGO AI</strong></h2><p>Từ tìm việc đến phát triển sự nghiệp — tất cả trong một.</p><button onClick={() => onAction('JobsGO AI')}>Khám phá ngay&nbsp; →</button></div>
      {[['19bc0.svg','Phân tích CV','trong 10 giây',767.73,25.86,169.061],['16fac.svg','Gợi ý công việc','chuẩn xác',809.5,107.4,171.05],['8b324.svg','Lộ trình thăng tiến','cá nhân hóa',799.56,190.94,184.972]].map(([icon,a,b,x,y,w]) => <div className="campaign-benefit" key={String(a)} style={{left:Number(x),top:Number(y),width:Number(w)}}><img src={assetPath(section,String(icon))} alt="" /><span>{a}<br />{b}</span></div>)}
      <div className="campaign-handwriting-box"><p className="campaign-handwriting">AI đồng hành<br />Cùng bạn vươn xa</p></div>
    </div>
    <div className="campaign-mobile-copy"><h2>Nâng cấp sự nghiệp cùng<strong>JobsGO AI</strong></h2><p>Từ tìm việc đến phát triển sự nghiệp — tất cả trong một.</p><button onClick={() => onAction('JobsGO AI')}>Khám phá ngay&nbsp; →</button></div>
  </div></section>;
}
const careerTools = [
  {title:'Tra cứu lương',text:<>Tra cứu lương</>,file:'80ed4.png',size:69.169,x:-16.5,y:-12.89,left:457,top:81},
  {title:'Đổi lương Gross–Net',text:<>Đổi lương<br />Gross–Net</>,file:'608a8.png',size:65.553,x:-11.27,y:-10.99,left:987,top:89},
  {title:'La bàn hướng nghiệp',text:<>La bàn<br />hướng nghiệp</>,file:'7d857.png',size:64.8,x:-11.2,y:-10.79,left:475,top:303},
  {title:'Tính BHXH một lần',text:<>Tính BHXH<br />một lần</>,file:'30776.png',size:66.129,x:-11.51,y:-11.12,left:979,top:313},
];
export function CareerTools({ onAction }: { onAction: (action: string) => void }) {
  const { ref, scale } = useScale(1292);
  const section='387-12793';
  const toolButtons = (mobile: boolean) => careerTools.map(t => <button key={t.title} className="observatory-link" onClick={() => onAction(t.title)} style={mobile ? undefined : {left:t.left,top:t.top}}><span className="observatory-icon"><img src={assetPath(section,t.file)} alt="" style={mobile ? undefined : {left:t.x,top:t.y,width:t.size,height:t.size}} /></span><span className="observatory-label">{t.text}</span><span className="observatory-arrow"><img src={assetPath(section,'71d9c.svg')} alt="" /></span></button>);
  return <section className="career-tools" id="career-tools" data-node-id="387:12793"><div className="root-container observatory-panel" ref={ref}>
    <div className="observatory-canvas" style={{transform:`scale(${scale})`}}>
      <DesignImage section={section} file="8d93d.svg" x={-176} y={-71} width={950} height={580} />
      <DesignImage section={section} file="9686d.svg" x={619} y={59} width={740} height={510} />
      <div className="observatory-floor" />
      <DesignImage section={section} file="7adf2.png" x={221} y={285} width={500} height={171.25} opacity={.27} />
      <div className="observatory-veil" />
      <DesignImage section={section} file="63584.svg" x={399} y={368} width={950} height={114} />
      <DesignImage section={section} file="19b37.svg" x={387} y={368} width={974} height={130} />
      <DesignImage section={section} file="d09ba.svg" x={398} y={362} width={952} height={96} />
      <DesignImage section={section} file="99eb9.svg" x={479.739} y={181.116} width={790.527} height={173.649} />
      <DesignImage section={section} file="6d7b3.svg" x={589.29} y={46.92} width={589.901} height={235.815} />
      <DesignImage section={section} file="0f3a1.svg" x={676} y={402} width={316} height={62} />
      <DesignImage section={section} file="4ebc8.png" x={637} y={35.8} width={424.7} height={424.7} />
      <div className="observatory-copy"><h2>Công cụ phát triển<br />sự nghiệp</h2><p>Hiểu thu nhập. Chọn hướng đi.<br />Chủ động tương lai.</p></div>
      <div className="observatory-desktop-links">{toolButtons(false)}</div>
    </div>
    <div className="observatory-mobile"><h2>Công cụ phát triển<br />sự nghiệp</h2><p>Hiểu thu nhập. Chọn hướng đi.<br />Chủ động tương lai.</p><div className="mobile-compass"><img src={assetPath(section,'4ebc8.png')} alt="La bàn thủy tinh" /></div><div className="mobile-tool-links">{toolButtons(true)}</div></div>
  </div></section>;
}
