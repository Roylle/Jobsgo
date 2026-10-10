import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Hero } from './components/Hero';
import { CareerCampaign, CareerTools } from './components/Campaigns';
import { UrgentJobs, RecommendedJobs, FeaturedEmployers, Internships, Industries, allJobs } from './components/JobsSections';
import type { Job } from './components/JobsSections';
import { LowerSections } from './components/LowerSections';
import { DesignImage } from './components/DesignImage';

function Atmosphere() {
  const glows: [string, number, number, number, number][] = [
    ['e15da.svg',-350,380,1200,1100],['fd86b.svg',760,930,1040,760],['f61fb.svg',-260,1180,1260,550],
    ['92ad8.svg',730,1250,940,500],['9356c.svg',79.56,1173.48,1233.149,1233.149],
    ['cf2d2.svg',-370,2210,1260,810],['d2fd9.svg',770,2450,1050,650],['c1bac.svg',-556.91,2466.3,1591.16,1292.818],
    ['fbdb8.svg',80,2940,1450,850],['39339.svg',795.58,2923.76,1093.923,1233.149],
    ['27e0e.svg',-350,3640,1190,670],['20f91.svg',-258.56,3520.44,1173.481,934.807],['dd442.svg',950,3810,850,430],
  ];
  return <div className="page-atmosphere" aria-hidden="true">{glows.map(([file,x,y,width,height]) => <DesignImage key={file} section="200-4689" {...{file,x,y,width,height}} />)}<div className="light-bands"><DesignImage section="200-4689" file="1d905.svg" x={-265} y={795.58} width={1963.88} height={3529.92}/><DesignImage section="200-4689" file="a0e96.svg" x={-298.34} y={1153.59} width={2002.01} height={2885.85}/></div><DesignImage section="200-4689" file="fb7d0.svg" x={0} y={3530} width={1440} height={790}/></div>;
}

function DemoDialog({ action, job, close, onOpenJob }: { action: string; job: Job | null; close: () => void; onOpenJob: (job: Job) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{text:string; from:'guide'|'user'}[]>([{text:'Chào bạn! Đây là trợ lý hướng dẫn trong bản demo. Mình có thể giúp bạn tìm phần việc làm, tạo CV hoặc xem các công cụ nghề nghiệp.',from:'guide'}]);
  useEffect(() => { const el = dialog.current; el?.showModal(); document.body.style.overflow = 'hidden'; return () => { el?.close(); document.body.style.overflow = ''; }; }, []);
  const auth = /Đăng nhập|Đăng ký/.test(action);
  const cv = /Tạo CV/.test(action);
  const upload = /Phân tích CV/.test(action);
  const contact = /tuyển ngay|tư vấn|Liên hệ|Ứng tuyển|Đăng tuyển/.test(action);
  const chat = /Chat|Hỏi đáp/.test(action);
  const title = job && action === 'Chi tiết việc làm' ? job.title : action;
  let savedJobs: Job[] = [];
  try { const saved = JSON.parse(localStorage.getItem('jobsgo-saved-jobs') ?? '[]'); if (Array.isArray(saved)) savedJobs = allJobs.filter(j => saved.includes(j.id)); } catch { /* An invalid stored value is treated as an empty saved list. */ }
  const submit = (e: FormEvent) => {e.preventDefault();setDone(true);};
  const downloadCV = (e: FormEvent) => { e.preventDefault(); const blob = new Blob([`${name}\n${role}\n\nKỸ NĂNG\n${skills}\n\nCV tạo từ bản demo JobsGO.`], {type:'text/plain;charset=utf-8'}); const url=URL.createObjectURL(blob); const link=document.createElement('a');link.href=url;link.download='JobsGO-CV.txt';link.click();URL.revokeObjectURL(url);setDone(true); };
  const sendChat = (e: FormEvent) => {e.preventDefault();if(!chatInput.trim())return; const text=chatInput.trim();const reply=/cv/i.test(text)?'Bạn có thể dùng mục “Tạo CV bằng AI” để nhập thông tin và tải bản CV văn bản, hoặc mở “Phân tích CV” để thử chọn tệp. Phân tích AI chưa được kết nối trong demo.':/lương|thu nhập/i.test(text)?'Mức lương được hiển thị trên từng thẻ việc làm. Bạn có thể mở chi tiết công việc hoặc dùng bộ lọc ngành để so sánh các mức lương trong dữ liệu demo.':'Bạn hãy dùng ô tìm kiếm ở đầu trang để nhập vị trí, công ty hoặc kỹ năng, sau đó chọn địa điểm. Việc làm yêu thích có thể lưu bằng biểu tượng trái tim.';setMessages(v=>[...v,{text,from:'user'},{text:reply,from:'guide'}]);setChatInput('');};
  return <dialog ref={dialog} className="demo-dialog" aria-labelledby="dialog-title" onCancel={close} onClick={e=>{if(e.target===e.currentTarget)close();}}><div className="dialog-body"><button className="dialog-close" onClick={close} aria-label="Đóng">×</button><span className="demo-label">JOBSGO · BẢN DEMO</span><h2 id="dialog-title">{title}</h2>
    {job && action==='Chi tiết việc làm' ? <><p className="detail-company">{job.company || 'Việc làm gợi ý'}</p><div className="detail-facts"><div><small>Mức lương</small><strong>{job.salary}</strong></div><div><small>Địa điểm</small><strong>{job.location}</strong></div></div><div className="detail-tags">{job.tags.map(tag=><span key={tag}>{tag}</span>)}</div><p className="dialog-note">Thông tin được lấy từ thiết kế Figma. Bản demo chưa kết nối hệ thống tuyển dụng.</p><button className="primary-button" onClick={()=>setDone(true)}>Ứng tuyển</button>{done&&<p role="status" className="success-note">Bạn đang xem bản demo. Chức năng gửi hồ sơ sẽ khả dụng khi kết nối backend.</p>}</>
    : chat ? <><p className="dialog-note">Hướng dẫn tương tác có sẵn trong demo; chưa kết nối dịch vụ AI.</p><div className="chat-messages" aria-live="polite">{messages.map((m,i)=><p key={i} className={`chat-message ${m.from}`}>{m.text}</p>)}</div><form className="chat-form" onSubmit={sendChat}><input aria-label="Nhập tin nhắn" placeholder="Bạn muốn tìm hiểu điều gì?" value={chatInput} onChange={e=>setChatInput(e.target.value)} maxLength={500} required/><button className="primary-button" type="submit">Gửi</button></form></>
    : cv ? <><p className="dialog-note">Thử tạo CV và tải bản văn bản về máy. AI tạo nội dung chưa được kết nối.</p><form className="dialog-form" onSubmit={downloadCV}><label>Họ và tên<input value={name} onChange={e=>setName(e.target.value)} required autoComplete="name" /></label><label>Vị trí mong muốn<input value={role} onChange={e=>setRole(e.target.value)} required placeholder="Ví dụ: UI/UX Designer" /></label><label>Kỹ năng & kinh nghiệm<textarea value={skills} onChange={e=>setSkills(e.target.value)} required rows={4} placeholder="Nhập thông tin bạn muốn đưa vào CV" /></label><button className="primary-button" type="submit">Tạo và tải CV</button>{done&&<p role="status" className="success-note">CV văn bản đã được tạo để tải về.</p>}</form></>
    : upload ? <><p className="dialog-note">Chọn CV để thử giao diện tải tệp. Tệp chỉ ở trên máy của bạn; demo chưa gửi hoặc phân tích bằng AI.</p><label className="file-picker">Chọn CV (.pdf, .doc, .docx)<input type="file" accept=".pdf,.doc,.docx" onChange={e=>setFileName(e.target.files?.[0]?.name??'')}/></label>{fileName&&<p className="success-note" role="status">Đã chọn: {fileName}</p>}</>
    : auth ? <><p className="dialog-note">Xem trước biểu mẫu tài khoản. Bản demo chưa đăng nhập hoặc tạo tài khoản thật.</p><form className="dialog-form" onSubmit={submit}>{action==='Đăng ký'&&<label>Họ và tên<input required autoComplete="name" /></label>}<label>Email<input type="email" required autoComplete="email" placeholder="ban@example.com" /></label><label>Mật khẩu<input type="password" required minLength={6} autoComplete={action==='Đăng ký'?'new-password':'current-password'} placeholder="Tối thiểu 6 ký tự" /></label><button className="primary-button" type="submit">Kiểm tra biểu mẫu</button>{done&&<p className="success-note" role="status">Thông tin đúng định dạng. Đây là bản demo, chưa xác thực tài khoản.</p>}</form></>
    : contact ? <><p className="dialog-note">Thử biểu mẫu liên hệ. Thông tin không được gửi đi trong bản demo.</p><form className="dialog-form" onSubmit={submit}><label>Họ và tên<input required autoComplete="name" /></label><label>Email<input type="email" required autoComplete="email" /></label><label>Nội dung<textarea required rows={4} placeholder="Bạn cần hỗ trợ điều gì?" /></label><button className="primary-button" type="submit">Kiểm tra thông tin</button>{done&&<p className="success-note" role="status">Thông tin đã hợp lệ. Demo chưa kết nối dịch vụ gửi liên hệ.</p>}</form></>
    : action==='Thông báo' ? <p className="dialog-note">Bạn chưa có thông báo mới trong bản demo.</p>
    : action==='Việc làm đã lưu' ? <><p className="dialog-note">{savedJobs.length ? `${savedJobs.length} việc làm được lưu trên trình duyệt này.` : 'Bạn chưa lưu việc làm nào. Bấm biểu tượng trái tim trên thẻ công việc để thêm vào danh sách.'}</p><div className="saved-job-list">{savedJobs.map(j=><button key={j.id} onClick={()=>onOpenJob(j)}><strong>{j.title}</strong><span>{j.company} · {j.salary}</span></button>)}</div></>
    : /Tải ứng dụng/.test(action) ? <p className="dialog-note">Đây là bản demo giao diện tải ứng dụng. Liên kết cửa hàng ứng dụng chưa được cấu hình.</p>
    : <><p className="dialog-note">Bạn đang xem trước mục {action}. Nội dung và dịch vụ của mục này sẽ được bổ sung khi kết nối hệ thống JobsGO.</p><div className="dialog-tool-links">{['Tạo CV bằng AI','Phân tích CV','Tìm việc làm'].map(t=><button key={t} onClick={()=>{close();document.getElementById(t==='Tìm việc làm'?'urgent-jobs':'ai-tools')?.scrollIntoView({behavior:'smooth'});}}>{t} <span>→</span></button>)}</div></>}
  </div></dialog>;
}

export default function App() {
  const [search,setSearch]=useState({query:'',location:''});
  const [action,setAction]=useState<string|null>(null);
  const [job,setJob]=useState<Job|null>(null);
  const openAction=(a:string)=>{ const destinations: Record<string,string> = {'Tìm việc làm':'urgent-jobs','Công cụ AI':'ai-tools','JobsGO AI':'ai-tools','Tin tức & Cẩm nang nghề nghiệp':'career-editorial'}; if(destinations[a]) { document.getElementById(destinations[a])?.scrollIntoView({behavior:'smooth'}); return; } setJob(null);setAction(a);};
  const openJob=(j:Job)=>{setJob(j);setAction('Chi tiết việc làm');};
  const onSearch=(query:string,location:string)=>{setSearch({query,location});requestAnimationFrame(()=>document.getElementById('urgent-jobs')?.scrollIntoView({behavior:'smooth',block:'start'}));};
  return <><a className="skip-link" href="#urgent-jobs">Đến nội dung việc làm</a><div className="app-shell"><Atmosphere/><main className="page-content"><Hero onSearch={onSearch} onAction={openAction}/><UrgentJobs query={search.query} location={search.location} onOpenJob={openJob}/><RecommendedJobs onOpenJob={openJob}/><CareerCampaign onAction={openAction}/><FeaturedEmployers onOpenJob={openJob}/><CareerTools onAction={openAction}/><Internships onOpenJob={openJob}/><Industries onOpenJob={openJob}/><LowerSections onAction={openAction}/></main></div>{action&&<DemoDialog key={`${action}-${job?.id??''}`} action={action} job={job} close={()=>setAction(null)} onOpenJob={openJob}/>}</>;
}
