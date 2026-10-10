export type Job = {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  category: string;
  tags: string[];
  logo: string;
  match?: number;
  hot?: boolean;
};

export const urgentJobs: Job[] = [
  { id: 'fpt-frontend', company: 'FPT Software', title: 'Frontend Developer (ReactJS)', salary: '15 - 30 triệu', location: 'Hà Nội / Hybrid', category: 'IT - Phần mềm', tags: ['React', 'TypeScript', 'Senior'], logo: 'fpt', hot: true },
  { id: 'vcb-business', company: 'Vietcombank', title: 'Chuyên viên Khách hàng Doanh nghiệp', salary: '20 - 35 triệu', location: 'Hà Nội', category: 'Kế toán - Tài chính', tags: ['Tài chính', 'Kinh doanh', 'Banking'], logo: 'vietcombank' },
  { id: 'shopee-product', company: 'Shopee', title: 'Product Manager', salary: '30 - 50 triệu', location: 'TP. HCM · Hybrid', category: 'Khác', tags: ['Product', 'Strategy', 'English'], logo: 'shopee' },
  { id: 'vingroup-hr', company: 'Vingroup', title: 'Chuyên viên Tuyển dụng', salary: '15 - 25 triệu', location: 'Hà Nội', category: 'Nhân sự', tags: ['HR', 'Talent Acquisition', 'Office'], logo: 'vingroup' },
  { id: 'tiki-marketing', company: 'Tiki', title: 'Digital Marketing Specialist', salary: '12 - 20 triệu', location: 'TP. HCM · Hybrid', category: 'Marketing', tags: ['Marketing', 'Ads', 'Growth'], logo: 'tiki', hot: true },
  { id: 'acb-data', company: 'ACB', title: 'Chuyên viên Phân tích dữ liệu', salary: '20 - 40 triệu', location: 'TP. HCM', category: 'IT - Phần mềm', tags: ['Data', 'SQL', 'Power BI'], logo: 'acb' },
  { id: 'samsung-engineer', company: 'Samsung', title: 'Kỹ sư Cơ điện tử', salary: '18 - 32 triệu', location: 'Bắc Ninh', category: 'Sản xuất', tags: ['Engineering', 'Manufacturing', 'Kỹ thuật'], logo: 'samsung' },
  { id: 'masan-sales', company: 'Masan', title: 'Nhân viên Kinh doanh Thị trường', salary: '10 - 18 triệu', location: 'Toàn quốc', category: 'Kinh doanh', tags: ['Sales', 'FMCG', 'Thị trường'], logo: 'masan' },
  { id: 'gamigo-game', company: 'Gamigo', title: 'Game Server Developer', salary: '25 - 45 triệu', location: 'TP. HCM · Hybrid', category: 'IT - Phần mềm', tags: ['Go', 'Linux', 'Game'], logo: 'gamigo', hot: true },
];

export const recommendedJobs: Job[] = [
  { id: 'ai-designer', company: '', title: 'Senior UI/UX Designer', salary: '25 - 40 triệu', location: 'TP. HCM · Hybrid', category: 'Thiết kế', tags: [], logo: '387-12856', match: 96 },
  { id: 'ai-analyst', company: '', title: 'Business Analyst', salary: '20 - 35 triệu', location: 'Hà Nội · Hybrid', category: 'Kinh doanh', tags: [], logo: '387-12857', match: 94 },
  { id: 'ai-marketing', company: '', title: 'Brand Marketing Manager', salary: '50 - 60 triệu', location: 'TP. HCM', category: 'Marketing', tags: [], logo: '387-12858', match: 92 },
  { id: 'ai-data', company: '', title: 'Data Scientist', salary: '40 - 70 triệu', location: 'Hà Nội · Hybrid', category: 'IT - Phần mềm', tags: [], logo: '387-12859', match: 92 },
  { id: 'ai-operations', company: '', title: 'Operations Manager', salary: '25 - 45 triệu', location: 'TP. HCM', category: 'Hành chính', tags: [], logo: '387-12860', match: 99 },
];

export const internshipJobs: Job[] = [
  { id: 'grab-intern', company: 'Grab', title: 'Technology Intern', salary: 'Hỗ trợ: 5 - 8 triệu', location: 'TP. HCM', category: 'IT', tags: ['Thực tập'], logo: 'grab' },
  { id: 'unilever-intern', company: 'Unilever', title: 'Marketing Intern', salary: 'Hỗ trợ: 4 - 7 triệu', location: 'Hà Nội', category: 'Marketing', tags: ['Thực tập'], logo: 'unilever' },
  { id: 'aeon-intern', company: 'AEON', title: 'Business Intern', salary: 'Hỗ trợ: 5 - 8 triệu', location: 'TP. HCM', category: 'Kinh doanh', tags: ['Thực tập'], logo: 'aeon' },
  { id: 'techcombank-intern', company: 'Techcombank', title: 'Finance Intern', salary: 'Hỗ trợ: 5 - 8 triệu', location: 'Hà Nội', category: 'Tài chính', tags: ['Thực tập'], logo: 'techcombank' },
];

export const allJobs = [...urgentJobs, ...recommendedJobs, ...internshipJobs];

export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}

export function filterJobs(jobs: Job[], query = '', location = '', category = 'Tất cả') {
  const search = normalizeSearch(query.trim());
  const area = normalizeSearch(location.trim());
  return jobs.filter((job) => {
    const haystack = normalizeSearch([job.title, job.company, job.category, ...job.tags].join(' '));
    const categoryMatches = category === 'Tất cả' || job.category === category || job.tags.includes(category);
    const locationMatches = !area || area === 'tat ca dia diem' || area === 'tat ca' || normalizeSearch(job.location).includes(area) || (area === 'tp. ho chi minh' && normalizeSearch(job.location).includes('tp. hcm'));
    return haystack.includes(search) && locationMatches && categoryMatches;
  });
}
