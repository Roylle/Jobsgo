import { useState } from 'react';
import type { FormEvent } from 'react';
import './Hero.css';

const asset = (file: string) => `${import.meta.env.BASE_URL}assets/hero-${file}`;
const tools = [
  ['Tạo CV bằng AI', '05ecb.svg', '#eee5ff'], ['Phân tích CV', '51f2c.svg', '#dfeeff'],
  ['Gợi ý việc làm', '47447.svg', '#ddf9f7'], ['Lộ trình nghề nghiệp', '533e3.svg', '#fff1dd'],
  ['So sánh lương', '5474c.svg', '#ddf8f1'], ['Hỏi đáp AI', 'c2333.svg', '#ddf5ff'],
];

export function Brand() {
  return <span className="brand" aria-label="JobsGO — Việc tốt hơn. Tương lai sáng hơn">
    <span className="brand-symbol"><img src={asset('4bf61.png')} alt="" /></span>
    <span className="brand-word"><img src={asset('4bf61.png')} alt="" /></span>
    <span className="brand-tagline">Việc tốt hơn. Tương lai sáng hơn</span>
  </span>;
}

export function Hero({ onSearch, onAction }: { onSearch: (query: string, location: string) => void; onAction: (action: string) => void }) {
  const [tab, setTab] = useState(0);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [menu, setMenu] = useState(false);
  const links = [['Việc làm', '#urgent-jobs'], ['Công ty', '#employers'], ['Cẩm nang nghề nghiệp', '#career-editorial'], ['AI Career', '#career-tools'], ['Ưu đãi', '#career-campaign']];
  const submit = (e: FormEvent) => { e.preventDefault(); onSearch(query, location); };
  const popular = ['Marketing', 'IT', 'Kế toán', 'Remote', 'Fresher', 'Hà Nội', 'TP. Hồ Chí Minh'];
  return <section className="hero-section" data-node-id="171:3841">
    <header className="site-header"><div className="header-inner">
      <a className="brand-link" href="#" aria-label="JobsGO trang chủ"><Brand /></a>
      <nav className="desktop-nav" aria-label="Điều hướng chính">{links.map(([text, href]) => <a key={text} href={href}>{text}</a>)}</nav>
      <div className="header-actions"><button className="notification" onClick={() => onAction('Thông báo')} aria-label="Thông báo"><img src={asset('49a9b.svg')} alt="" /><img className="notification-dot" src={asset('8a5eb.svg')} alt="" /></button><button className="login-button" onClick={() => onAction('Đăng nhập')}>Đăng nhập</button><button className="register-button" onClick={() => onAction('Đăng ký')}>Đăng ký</button></div>
      <div className="header-end"><button className="menu-button" aria-label="Mở menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>☰</button></div>
      {menu && <nav className="menu-popover" aria-label="Menu">{links.map(([text, href]) => <a key={text} href={href} onClick={() => setMenu(false)}>{text}</a>)}<button onClick={() => { onAction('Việc làm đã lưu'); setMenu(false); }}>Việc làm đã lưu</button></nav>}
    </div></header>
    <div className="hero-canvas">
      <div className="hero-sky" aria-hidden="true"><img className="hero-skyline" src={asset('25b52.png')} alt="" /><div className="sky-wash" /><div className="sky-left-fade" /><div className="sky-bottom-fade" /></div>
      <div className="hero-art" aria-hidden="true">
        <img className="hero-bloom" src={asset('24fc0.svg')} alt="" />
        <img className="hero-haze" src={asset('2a67b.svg')} alt="" />
        <img className="hero-platform" src={asset('a0fec.svg')} alt="" />
        <img className="hero-pink" src={asset('e90fa.svg')} alt="" />
        <img className="hero-orbit" src={asset('f84fe.svg')} alt="" />
        <img className="hero-robot" src={asset('fd1f0.png')} alt="" />
        <div className="floating-card floating-cv"><img src={asset('947b2.svg')} alt="" /><span>Phân tích CV<br />bằng AI</span></div>
        <div className="floating-card floating-job"><img src={asset('15ec5.svg')} alt="" /><span>Gợi ý việc làm<br />phù hợp nhất</span></div>
        <div className="floating-card floating-path"><img src={asset('efc4e.svg')} alt="" /><span>Lộ trình nghề nghiệp<br />cá nhân hóa</span></div>
        <div className="hero-handwriting-box"><p className="hero-handwriting">Better Career<br />Brighter You.</p></div>
        <div className="floating-card floating-stat"><img src={asset('df8ad.svg')} alt="" /><span><strong>1,200,000+</strong><small>Việc làm đang tuyển</small></span></div>
      </div>
      <div className="hero-copy"><h1>Tìm việc thông minh hơn<br />cùng <span>JobsGO <b>AI</b></span></h1><p>Hàng triệu cơ hội việc làm. Trợ lý AI đồng hành cùng bạn<br className="desktop-break" /> trên mọi chặng đường sự nghiệp.</p></div>
      <div className="hero-search-area">
        <div className="search-tabs" role="tablist" aria-label="Loại tìm kiếm">{['Tìm việc', 'Tên công ty', 'Tìm kỹ năng'].map((text, i) => <button key={text} role="tab" aria-selected={tab === i} className={tab === i ? 'active' : ''} onClick={() => setTab(i)}>{text}</button>)}</div>
        <form className="search-form" onSubmit={submit}>
          <label className="query-input"><img src={asset('2cf4c.svg')} alt="" /><input aria-label={['Tìm vị trí, kỹ năng hoặc công ty', 'Tìm tên công ty', 'Tìm kỹ năng'][tab]} placeholder={['Bạn muốn tìm vị trí, kỹ năng hoặc công ty nào?', 'Nhập tên công ty bạn muốn tìm', 'Nhập kỹ năng bạn muốn tìm'][tab]} value={query} onChange={e => setQuery(e.target.value)} /></label>
          <label className="location-input"><img src={asset('73b41.svg')} alt="" /><select aria-label="Địa điểm làm việc" value={location} onChange={e => setLocation(e.target.value)}><option value="">Tất cả địa điểm</option><option>Hà Nội</option><option>TP. HCM</option><option>Bắc Ninh</option><option>Remote</option></select></label>
          <button className="search-submit" type="submit"><img src={asset('a0820.svg')} alt="" />Tìm kiếm</button>
        </form>
        <div className="popular-search"><span>Tìm kiếm phổ biến:</span>{popular.map(text => <button key={text} onClick={() => { if (text === 'Hà Nội' || text === 'TP. Hồ Chí Minh') { const area = text === 'Hà Nội' ? text : 'TP. HCM'; setQuery(''); setLocation(area); onSearch('', area); } else { setQuery(text); setLocation(''); onSearch(text, ''); } }}>{text}</button>)}</div>
      </div>
      <div className="hero-shortcuts">{tools.map(([title, icon, color]) => <button key={title} className="shortcut" onClick={() => title === 'Gợi ý việc làm' ? document.getElementById('recommended-jobs')?.scrollIntoView({ behavior: 'smooth' }) : onAction(title)}><span className="shortcut-icon" style={{ background: color }}><img src={asset(icon)} alt="" /></span><span>{title}</span></button>)}</div>
    </div>
  </section>;
}
