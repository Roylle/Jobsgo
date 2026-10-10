import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { allJobs, filterJobs, internshipJobs, recommendedJobs, urgentJobs, type Job } from './jobs-data';
import './JobsSections.css';

export type { Job } from './jobs-data';
export { allJobs, urgentJobs, recommendedJobs, internshipJobs } from './jobs-data';

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const capabilityFiles: Record<string, string> = {
  '387-12856': 'I387-12856-178-3844-58b53.svg',
  '387-12857': 'I387-12857-178-3844-71c64.svg',
  '387-12858': 'I387-12858-178-3844-a9ba9.svg',
  '387-12859': 'I387-12859-178-3844-71c64.svg',
  '387-12860': 'I387-12860-178-3844-6caa2.svg',
};
type JobsProps = { onOpenJob?: (job: Job) => void };
type SearchProps = JobsProps & { query?: string; location?: string };

const logos: Record<string, { file: string; tile?: string }> = {
  fpt: { file: '177-3869-96c53.svg' },
  vietcombank: { file: '177-3869-52e17.svg' },
  shopee: { file: '177-3869-990ab.svg' },
  vingroup: { file: '177-3869-4e910.svg' },
  tiki: { file: '177-3869-e0738.svg' },
  samsung: { file: '177-3869-db02b.svg', tile: '#09158d' },
  masan: { file: '177-3869-f81cd.svg' },
  gamigo: { file: '177-3869-d8399.svg', tile: '#fc7118' },
  grab: { file: '185-4289-70ebe.svg', tile: '#02a94d' },
  unilever: { file: '185-4289-86406.svg' },
  aeon: { file: '185-4289-165db.svg', tile: '#a51793' },
};

function AcbLogo({ featured = false }: { featured?: boolean }) {
  const files = featured ? ['bd951', '8718a', '12283', '83acd'] : ['60ffe', '6efa5', '9f8c4', '38004'];
  return <span className={`jg-acb-mark ${featured ? 'jg-acb-mark-featured' : ''}`} aria-hidden="true">
    {files.map((file, i) => <img className={`jg-acb-part jg-acb-part-${i}`} src={asset(`${featured ? '182-4290' : '177-3869'}-${file}.svg`)} alt="" key={file} />)}
  </span>;
}

function EmployerLogo({ name, featured = false }: { name: string; featured?: boolean }) {
  if (featured) {
    const featuredFiles: Record<string, string> = { fpt: '344a1', vingroup: '33ca5', vietcombank: '384a1', shopee: 'fcc02', samsung: 'd1992', vinamilk: 'ccfb7', tiki: '3530f' };
    return <span className="jg-logo jg-featured-logo" aria-hidden="true">
      {name === 'acb' ? <AcbLogo featured /> : <img src={asset(`182-4290-${featuredFiles[name]}.svg`)} alt="" />}
    </span>;
  }
  if (name.startsWith('387-')) return <span className="jg-logo jg-logo-capability" aria-hidden="true"><img src={asset(capabilityFiles[name])} alt="" /></span>;
  if (name === 'techcombank') return <span className="jg-logo jg-logo-techcombank" aria-hidden="true">
    <span className="jg-techcombank-source"><img src={asset('185-4289-c6533.svg')} alt="" /></span>
    <span className="jg-techcombank-stack"><img className="jg-techcombank-symbol" src={asset('185-4289-3bdff.svg')} alt="" /><img className="jg-techcombank-wordmark" src={asset('185-4289-2a0e4.svg')} alt="" /></span>
  </span>;
  if (name === 'acb') return <span className="jg-logo" style={{ backgroundColor: '#1038a4' }} aria-hidden="true"><AcbLogo /></span>;
  const logo = logos[name];
  return <span className="jg-logo" style={{ backgroundColor: logo?.tile }} aria-hidden="true"><img src={asset(logo?.file ?? '177-3869-96c53.svg')} alt="" /></span>;
}

function useSavedJobs() {
  const read = () => {
    try { const stored: unknown = JSON.parse(localStorage.getItem('jobsgo-saved-jobs') ?? '[]'); return Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string') : []; }
    catch { return []; }
  };
  const [saved, setSaved] = useState<string[]>(read);
  useEffect(() => {
    const sync = () => setSaved(read());
    window.addEventListener('storage', sync);
    window.addEventListener('jobsgo:saved', sync);
    return () => { window.removeEventListener('storage', sync); window.removeEventListener('jobsgo:saved', sync); };
  }, []);
  const toggle = (id: string) => {
    const current = read();
    const next = current.includes(id) ? current.filter((value) => value !== id) : [...current, id];
    try { localStorage.setItem('jobsgo-saved-jobs', JSON.stringify(next)); } catch { /* Saved state still works during the current visit. */ }
    setSaved(next);
    window.dispatchEvent(new Event('jobsgo:saved'));
  };
  return { saved, toggle };
}

function JobCard({ job, internship = false, onOpenJob }: { job: Job; internship?: boolean; onOpenJob: (job: Job) => void }) {
  const { saved, toggle } = useSavedJobs();
  const isSaved = saved.includes(job.id);
  return <article className={`jg-job-card ${internship ? 'jg-intern-card' : ''}`}>
    <EmployerLogo name={job.logo} />
    <div className="jg-job-info">
      <p className="jg-company">{job.company}</p>
      <h3><button type="button" className="jg-job-title" onClick={() => onOpenJob(job)}>{job.title}</button></h3>
      <p className="jg-job-meta">{job.salary}{!internship && ` · ${job.location}`}</p>
      {internship && <p className="jg-job-meta">{job.location}</p>}
      <div className="jg-tags">{job.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </div>
    <button type="button" className={`jg-save ${isSaved ? 'is-saved' : ''}`} onClick={() => toggle(job.id)} aria-pressed={isSaved} aria-label={`${isSaved ? 'Bỏ lưu' : 'Lưu'} việc làm ${job.title}`}>
      <img src={asset(`${internship ? '185-4289' : '177-3869'}-afd56.svg`)} alt="" />
    </button>
  </article>;
}

function SectionHeading({ icon, title, subtitle, onView, viewLabel = 'Xem tất cả' }: { icon: string; title: string; subtitle: string; onView: () => void; viewLabel?: string }) {
  return <div className="jg-section-heading">
    <div className="jg-heading-lead"><span className="jg-heading-icon"><img src={asset(icon)} alt="" /></span><div><h2>{title}</h2><p>{subtitle}</p></div></div>
    <button type="button" className="jg-view-all" onClick={onView}>{viewLabel}<span aria-hidden="true">→</span></button>
  </div>;
}

function Filters({ values, selected, onSelect }: { values: string[]; selected: string; onSelect: (value: string) => void }) {
  return <div className="jg-filters" aria-label="Lọc theo ngành nghề">{values.map((value) => <button type="button" key={value} onClick={() => onSelect(value)} className={selected === value ? 'is-active' : ''} aria-pressed={selected === value}>{value}</button>)}</div>;
}

function EmptyJobs({ onReset }: { onReset?: () => void }) {
  return <div className="jg-empty" role="status"><p>Chưa có việc làm phù hợp với lựa chọn này.</p>{onReset && <button type="button" onClick={onReset}>Xem tất cả việc làm</button>}</div>;
}

function JobListDialog({ title, jobs, onClose, onOpenJob }: { title: string; jobs: Job[]; onClose: () => void; onOpenJob: (job: Job) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialog.current?.showModal();
    return () => { dialog.current?.close(); previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="jg-list-dialog" aria-labelledby={titleId} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="jg-dialog-header"><h2 id={titleId}>{title}</h2><button type="button" aria-label="Đóng danh sách" onClick={onClose}>×</button></div>
    <div className="jg-dialog-jobs">{jobs.length ? jobs.map((job) => <JobCard key={job.id} job={job} internship={job.tags.includes('Thực tập')} onOpenJob={(selected) => { onClose(); onOpenJob(selected); }} />) : <EmptyJobs />}</div>
  </dialog>;
}

function useJobList(onOpenJob?: (job: Job) => void) {
  const [list, setList] = useState<{ title: string; jobs: Job[] } | null>(null);
  const [detail, setDetail] = useState<Job | null>(null);
  const open = onOpenJob ?? setDetail;
  const listDialog: ReactNode = list ? <JobListDialog {...list} onClose={() => setList(null)} onOpenJob={open} /> : null;
  const detailDialog = detail ? <LocalJobDetail job={detail} onClose={() => setDetail(null)} /> : null;
  return { setList, open, dialogs: <>{listDialog}{detailDialog}</> };
}

function LocalJobDetail({ job, onClose }: { job: Job; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => { ref.current?.showModal(); }, []);
  return <dialog ref={ref} className="jg-list-dialog jg-detail-dialog" onCancel={onClose} aria-labelledby={titleId}>
    <div className="jg-dialog-header"><h2 id={titleId}>{job.title}</h2><button type="button" onClick={onClose} aria-label="Đóng chi tiết">×</button></div>
    <p>{job.company}</p><p>{job.salary}</p><p>{job.location}</p><div className="jg-tags">{job.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
  </dialog>;
}

export function UrgentJobs({ onOpenJob, query = '', location = '' }: SearchProps) {
  const [category, setCategory] = useState('Tất cả');
  const { setList, open, dialogs } = useJobList(onOpenJob);
  const jobs = filterJobs(urgentJobs, query, location, category);
  return <section className={`jg-section jg-urgent ${category !== 'Tất cả' || query || location ? 'is-filtered' : ''}`} id="urgent-jobs" aria-label="Việc làm tuyển gấp">
    <div className="jg-inner">
      <SectionHeading icon="177-3869-5e005.svg" title="Việc làm tuyển gấp" subtitle="Cơ hội tốt đang chờ bạn. Ứng tuyển ngay hôm nay!" onView={() => setList({ title: 'Việc làm tuyển gấp', jobs: urgentJobs })} />
      <Filters values={['Tất cả', 'IT - Phần mềm', 'Kinh doanh', 'Marketing', 'Kế toán - Tài chính', 'Sản xuất', 'Nhân sự', 'Hành chính', 'Khác']} selected={category} onSelect={setCategory} />
      <div className="jg-job-grid" aria-live="polite">{jobs.length ? jobs.map((job) => <JobCard key={job.id} job={job} onOpenJob={open} />) : <EmptyJobs onReset={() => { setCategory('Tất cả'); if (query || location) setList({ title: 'Việc làm tuyển gấp', jobs: urgentJobs }); }} />}</div>
      {(query || location) && <p className="jg-result-count" role="status">{jobs.length} việc làm phù hợp{query && ` với “${query}”`}{location && ` tại ${location}`}</p>}
    </div>{dialogs}
  </section>;
}

export function RecommendedJobs({ onOpenJob }: JobsProps) {
  const { setList, open, dialogs } = useJobList(onOpenJob);
  return <section className="jg-recommended" id="recommended-jobs" aria-label="Việc làm dành riêng cho bạn">
    <div className="jg-rec-panel">
      <div className="jg-rec-art" aria-hidden="true"><img className="jg-rec-facets" src={asset('387-12835-dbd6d.svg')} alt="" /><img className="jg-rec-stars" src={asset('387-12835-97335.svg')} alt="" /><img className="jg-rec-sparkle" src={asset('387-12835-b5da0.svg')} alt="" /><img className="jg-rec-top-stars" src={asset('387-12835-963dd.svg')} alt="" /></div>
      <SectionHeading icon="387-12835-010be.svg" title="Việc làm dành riêng cho bạn" subtitle="Được gợi ý bởi JobsGO AI dựa trên hồ sơ, kỹ năng và hành vi của bạn." viewLabel="Xem thêm" onView={() => setList({ title: 'Việc làm dành riêng cho bạn', jobs: recommendedJobs })} />
      <div className="jg-recommendations">{recommendedJobs.map((job, index) => <button type="button" className="jg-recommendation" key={job.id} onClick={() => open(job)} aria-label={`Xem ${job.title}, ${job.salary}, ${job.location}, phù hợp ${job.match}%`}>
        <span className={`jg-capability jg-capability-${index}`}><img src={asset(capabilityFiles[job.logo])} alt="" /></span>
        <span className="jg-rec-details"><strong>{job.title}</strong><span className="jg-rec-meta"><img src={asset(`${job.logo}-817fb.svg`)} alt="" />{job.salary}</span><span className="jg-rec-meta"><img src={asset(`${job.logo}-02b3e.svg`)} alt="" />{job.location}</span></span>
        <span className="jg-fit"><span className="jg-fit-check"><img src={asset(`${job.logo}-c32d4.svg`)} alt="" /><span aria-hidden="true">✓</span></span><strong>Phù hợp {job.match}%</strong></span>
      </button>)}</div>
    </div>{dialogs}
  </section>;
}

const employers = [
  { name: 'FPT Software', logo: 'fpt', count: '10.2k+' }, { name: 'Vingroup', logo: 'vingroup', count: '8.4k+' }, { name: 'Vietcombank', logo: 'vietcombank', count: '4.1k+' }, { name: 'Shopee', logo: 'shopee', count: '6.8k+' },
  { name: 'Samsung', logo: 'samsung', count: '5.0k+' }, { name: 'ACB', logo: 'acb', count: '5.0k+' }, { name: 'Vinamilk', logo: 'vinamilk', count: '3.9k+' }, { name: 'Tiki', logo: 'tiki', count: '3.1k+' },
];

export function FeaturedEmployers({ onOpenJob }: JobsProps) {
  const { setList, dialogs } = useJobList(onOpenJob);
  const [showEmployers, setShowEmployers] = useState(false);
  return <section className="jg-section jg-employers" id="employers" aria-label="Nhà tuyển dụng tiêu biểu">
    <div className="jg-inner"><SectionHeading icon="182-4290-b78b4.svg" title="Nhà tuyển dụng tiêu biểu" subtitle="Những công ty hàng đầu đang tuyển dụng trên JobsGO" onView={() => setShowEmployers(true)} />
      <div className="jg-employer-grid">{employers.map((company) => <button type="button" className="jg-employer" key={company.logo} onClick={() => setList({ title: `Việc làm tại ${company.name}`, jobs: allJobs.filter((job) => job.company === company.name) })} aria-label={`${company.name}, ${company.count} việc làm`}><EmployerLogo name={company.logo} featured /><strong>{company.count} việc làm</strong></button>)}</div>
    </div>{dialogs}
    {showEmployers && <EmployerDirectory onClose={() => setShowEmployers(false)} onSelect={(company) => { setShowEmployers(false); setList({ title: `Việc làm tại ${company}`, jobs: allJobs.filter((job) => job.company === company) }); }} />}
  </section>;
}

function EmployerDirectory({ onClose, onSelect }: { onClose: () => void; onSelect: (name: string) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return <dialog ref={ref} className="jg-list-dialog" aria-labelledby="jg-employer-directory-title" onCancel={onClose}><div className="jg-dialog-header"><h2 id="jg-employer-directory-title">Nhà tuyển dụng tiêu biểu</h2><button type="button" aria-label="Đóng danh sách công ty" onClick={onClose}>×</button></div><div className="jg-employer-grid jg-directory-grid">{employers.map((company) => <button type="button" className="jg-employer" key={company.logo} onClick={() => onSelect(company.name)}><EmployerLogo name={company.logo} featured /><strong>{company.name}</strong><span>{company.count} việc làm</span></button>)}</div></dialog>;
}

export function Internships({ onOpenJob }: JobsProps) {
  const [category, setCategory] = useState('Tất cả');
  const { setList, open, dialogs } = useJobList(onOpenJob);
  const jobs = filterJobs(internshipJobs, '', '', category);
  return <section className="jg-section jg-internships" id="internships" aria-label="Việc làm thực tập sinh">
    <img className="jg-intern-plane" src={asset('185-4289-67297.svg')} alt="" aria-hidden="true" />
    <div className="jg-inner"><SectionHeading icon="185-4289-4340d.svg" title="Việc làm thực tập sinh" subtitle="Bắt đầu sự nghiệp từ những cơ hội thực tập giá trị" onView={() => setList({ title: 'Việc làm thực tập sinh', jobs: internshipJobs })} />
      <Filters values={['Tất cả', 'IT', 'Marketing', 'Kinh doanh', 'Thiết kế', 'Nhân sự', 'Tài chính', 'Remote']} selected={category} onSelect={setCategory} />
      <div className="jg-intern-grid" aria-live="polite">{jobs.length ? jobs.map((job) => <JobCard key={job.id} job={job} internship onOpenJob={open} />) : <EmptyJobs onReset={() => setCategory('Tất cả')} />}</div>
    </div>{dialogs}
  </section>;
}

const industries = [
  { name: 'Công nghệ thông tin', count: '120.6k+', icon: '2adf0', color: '239,249,255', categories: ['IT - Phần mềm', 'IT'] },
  { name: 'Kinh doanh', count: '98.4k+', icon: '9f6bf', color: '240,247,255', categories: ['Kinh doanh'] },
  { name: 'Marketing', count: '76.2k+', icon: 'f403b', color: '255,240,247', categories: ['Marketing'] },
  { name: 'Kế toán / Tài chính', count: '64.1k+', icon: 'aedf7', color: '237,244,255', categories: ['Kế toán - Tài chính', 'Tài chính'] },
  { name: 'Nhân sự', count: '32.8k+', icon: 'fff45', color: '251,239,253', categories: ['Nhân sự'] },
  { name: 'Sản xuất', count: '48.8k+', icon: '5fae2', color: '233,252,252', categories: ['Sản xuất'] },
  { name: 'Hành chính / Văn phòng', count: '28.7k+', icon: '47f27', color: '255,246,236', categories: ['Hành chính'] },
  { name: 'Thiết kế / Sáng tạo', count: '36.4k+', icon: '7077c', color: '247,239,255', categories: ['Thiết kế'] },
  { name: 'Giáo dục / Đào tạo', count: '22.1k+', icon: '4340d', color: '231,251,252', categories: ['Giáo dục'] },
  { name: 'Y tế / Dược', count: '18.0k+', icon: 'eb95d', color: '251,240,253', categories: ['Y tế'] },
  { name: 'Bán lẻ / Dịch vụ', count: '40.5k+', icon: '67b68', color: '255,246,237', categories: ['Kinh doanh'] },
  { name: 'Khác', count: '52.1k+', icon: 'c2311', color: '240,245,255', categories: ['Khác'] },
];

export function Industries({ onOpenJob }: JobsProps) {
  const { setList, dialogs } = useJobList(onOpenJob);
  return <section className="jg-section jg-industries" id="industries" aria-label="Ngành nghề nổi bật"><div className="jg-inner">
    <SectionHeading icon="185-4409-9cdd8.svg" title="Ngành nghề nổi bật" subtitle="Khám phá cơ hội việc làm theo ngành nghề" onView={() => setList({ title: 'Tất cả ngành nghề', jobs: allJobs })} />
    <div className="jg-industry-grid">{industries.map((industry) => <button type="button" className="jg-industry" key={industry.name} style={{ '--industry-color': industry.color } as CSSProperties} onClick={() => setList({ title: `Việc làm ${industry.name}`, jobs: allJobs.filter((job) => industry.categories.includes(job.category)) })}>
      <img src={asset(`185-4409-${industry.icon}.svg`)} alt="" /><strong>{industry.name}</strong><span>{industry.count} việc làm</span>
    </button>)}</div>
  </div>{dialogs}</section>;
}
