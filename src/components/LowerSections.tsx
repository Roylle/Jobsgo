import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import './LowerSections.css';

type MediaAsset = { path: string; width: number | string; height: number | string };
const media: Record<string, Record<string, MediaAsset>> = {
  "187-4461": {
    "imgJobsGoV2IconSparkles": {
      "path": "/assets/187-4461-4ba7f.svg",
      "width": "32",
      "height": "32"
    },
    "imgToolIcon": {
      "path": "/assets/187-4461-a9473.svg",
      "width": "68",
      "height": "68"
    },
    "imgForwardCircle": {
      "path": "/assets/187-4461-5744b.svg",
      "width": "27.8453",
      "height": "27.8453"
    },
    "imgAiToolsFilledConstellationMark": {
      "path": "/assets/187-4461-6a993.svg",
      "width": "39.779",
      "height": "39.779"
    }
  },
  "187-4467": {
    "imgToolIcon": {
      "path": "/assets/187-4467-a9473.svg",
      "width": "68",
      "height": "68"
    },
    "imgForwardCircle": {
      "path": "/assets/187-4467-5744b.svg",
      "width": "27.8453",
      "height": "27.8453"
    }
  },
  "187-4481": {
    "imgToolIcon": {
      "path": "/assets/187-4481-a9473.svg",
      "width": "68",
      "height": "68"
    },
    "imgForwardCircle": {
      "path": "/assets/187-4481-5744b.svg",
      "width": "27.8453",
      "height": "27.8453"
    }
  },
  "187-4495": {
    "imgToolIcon": {
      "path": "/assets/187-4495-a9473.svg",
      "width": "68",
      "height": "68"
    },
    "imgForwardCircle": {
      "path": "/assets/187-4495-5744b.svg",
      "width": "27.8453",
      "height": "27.8453"
    }
  },
  "187-4509": {
    "imgToolIcon": {
      "path": "/assets/187-4509-a9473.svg",
      "width": "68",
      "height": "68"
    },
    "imgForwardCircle": {
      "path": "/assets/187-4509-5744b.svg",
      "width": "27.8453",
      "height": "27.8453"
    }
  },
  "187-4521": {
    "imgEditorialConversationPngExact15565ReferenceSlotOriginalPlaced": {
      "path": "/assets/187-4521-b4b23.png",
      "width": 1964,
      "height": 801
    },
    "imgEditorialAiOfficePngExact15565ReferenceSlotOriginalPlaced": {
      "path": "/assets/187-4521-90369.png",
      "width": 1965,
      "height": 800
    },
    "imgEditorialCvDevicesV2PngOriginalPlaced": {
      "path": "/assets/187-4521-167d1.png",
      "width": 1961,
      "height": 802
    },
    "imgEditorialCodingLaptopPngExact15565ReferenceSlotOriginalPlaced": {
      "path": "/assets/187-4521-92882.png",
      "width": 1964,
      "height": 801
    },
    "imgFrame": {
      "path": "/assets/187-4521-36912.svg",
      "width": "35.8011",
      "height": "35.8011"
    }
  },
  "187-4551": {
    "imgPairTabletFormalV2PngOriginalPlaced": {
      "path": "/assets/187-4551-35695.png",
      "width": 1484,
      "height": 1060
    },
    "imgFrame": {
      "path": "/assets/187-4551-dd2c5.svg",
      "width": "32",
      "height": "32"
    },
    "imgRecruiterBoundedBlueIllumination": {
      "path": "/assets/187-4551-178e0.svg",
      "width": "640",
      "height": "229"
    },
    "imgCyanEnergyHaze": {
      "path": "/assets/187-4551-04d32.svg",
      "width": "250.608",
      "height": "204.862"
    },
    "imgGroup": {
      "path": "/assets/187-4551-5f924.svg",
      "width": "189.234",
      "height": "211.033"
    },
    "imgGroup1": {
      "path": "/assets/187-4551-cc30e.svg",
      "width": "75.5801",
      "height": "155.138"
    },
    "imgStatisticCircularIconHost": {
      "path": "/assets/187-4551-6551c.svg",
      "width": "49.9337",
      "height": "49.9337"
    },
    "imgGroup2": {
      "path": "/assets/187-4551-eba96.svg",
      "width": "19.1391",
      "height": "19.1391"
    },
    "imgGroup3": {
      "path": "/assets/187-4551-1d388.svg",
      "width": "15.9427",
      "height": "16.5958"
    },
    "imgDimensionalIndustryArtwork": {
      "path": "/assets/187-4551-96c5d.svg",
      "width": "36",
      "height": "36"
    },
    "imgGroup4": {
      "path": "/assets/187-4551-6d068.svg",
      "width": "15.9427",
      "height": "16.5958"
    }
  },
  "190-4663": {
    "imgEllipse": {
      "path": "/assets/190-4663-e25f2.svg",
      "width": "1328.62",
      "height": "224.751"
    },
    "imgFrame": {
      "path": "/assets/190-4663-e6a24.svg",
      "width": "93.4807",
      "height": "21.4619"
    },
    "imgGroup": {
      "path": "/assets/190-4663-d4472.svg",
      "width": "109.37",
      "height": "46.0243"
    },
    "imgGroup1": {
      "path": "/assets/190-4663-a768c.svg",
      "width": "105.645",
      "height": "38.0549"
    },
    "imgFrame1": {
      "path": "/assets/190-4663-2536e.svg",
      "width": "147.182",
      "height": "27.4698"
    },
    "imgFrame2": {
      "path": "/assets/190-4663-698a1.svg",
      "width": "121.326",
      "height": "31.9981"
    },
    "imgFrame3": {
      "path": "/assets/190-4663-ec701.svg",
      "width": "154.832",
      "height": "55.6906"
    },
    "imgGroup2": {
      "path": "/assets/190-4663-9f439.svg",
      "width": "86.5691",
      "height": "33.4149"
    },
    "imgG1261": {
      "path": "/assets/190-4663-3adde.svg",
      "width": "85.5306",
      "height": "35.2225"
    },
    "imgG1160": {
      "path": "/assets/190-4663-36995.svg",
      "width": "83.1234",
      "height": "32.759"
    }
  },
  "190-4807": {
    "imgAppCroppedOpenEyedRobotIndependentOriginal": {
      "path": "/assets/190-4807-fd1f0.png",
      "width": 1114,
      "height": 1412
    },
    "imgGroup": {
      "path": "/assets/190-4807-f9a6b.svg",
      "width": "101.153",
      "height": "33.8123"
    },
    "imgGroup1": {
      "path": "/assets/190-4807-fb307.svg",
      "width": "14.976",
      "height": "18.4073"
    },
    "imgGroup2": {
      "path": "/assets/190-4807-2324c.svg",
      "width": "63.4487",
      "height": "13.2038"
    },
    "imgGroup3": {
      "path": "/assets/190-4807-240a7.svg",
      "width": "58.4479",
      "height": "5.37473"
    },
    "imgFrame": {
      "path": "/assets/190-4807-a7eb2.svg",
      "width": "113.979",
      "height": "33.8122"
    },
    "imgGroup4": {
      "path": "/assets/190-4807-d7b0f.svg",
      "width": "71.6022",
      "height": "138.827"
    },
    "imgJobsGoAppIcon": {
      "path": "/assets/190-4807-4caf4.svg",
      "width": "23.7019",
      "height": "23.7019"
    }
  },
  "190-5255": {
    "imgGenuineIndependentJobsGoPartnerAsset": {
      "path": "/assets/190-5255-4bf61.png",
      "width": 346,
      "height": 200
    },
    "imgIndependentRobotHeadCrop": {
      "path": "/assets/190-5255-fd1f0.png",
      "width": 1114,
      "height": 1412
    },
    "imgFooterSlantedNativeWhitePlane": {
      "path": "/assets/190-5255-12e48.svg",
      "width": "1395",
      "height": "184"
    },
    "imgGroup": {
      "path": "/assets/190-5255-77db8.svg",
      "width": "53.261",
      "height": "49.3157"
    },
    "imgSocialFacebookVector": {
      "path": "/assets/190-5255-d02b5.svg",
      "width": "21",
      "height": "21"
    },
    "imgSocialDiscordVector": {
      "path": "/assets/190-5255-d1b3a.svg",
      "width": "21",
      "height": "21"
    },
    "imgSocialLinkedInVector": {
      "path": "/assets/190-5255-6299b.svg",
      "width": "21",
      "height": "21"
    },
    "imgSocialTikTokVector": {
      "path": "/assets/190-5255-5eb58.svg",
      "width": "21",
      "height": "21"
    },
    "imgChatBlueCircularAssistantSymbol": {
      "path": "/assets/190-5255-474d3.svg",
      "width": "22",
      "height": "22"
    }
  },
  "I187-4467-186-3866": {
    "imgToolIcon": {
      "path": "/assets/I187-4467-186-3866-1682e.svg",
      "width": "68",
      "height": "68"
    }
  },
  "I187-4481-186-3866": {
    "imgToolIcon": {
      "path": "/assets/I187-4481-186-3866-0d29d.svg",
      "width": "68",
      "height": "68"
    }
  },
  "I187-4495-186-3866": {
    "imgToolIcon": {
      "path": "/assets/I187-4495-186-3866-f7e41.svg",
      "width": "68",
      "height": "68"
    }
  },
  "I187-4509-186-3866": {
    "imgToolIcon": {
      "path": "/assets/I187-4509-186-3866-5281e.svg",
      "width": "68",
      "height": "68"
    }
  }
};
const asset = (node: string, name: string) => media[node][name];
const localUrl = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '');
const scrollBehavior = (): ScrollBehavior => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

/** Scale the image's wrapper while preserving the original SVG root dimensions. */
function FigmaSvg({ node, name, width, height, className = '', style, alt = '' }: {
  node: string; name: string; width?: number; height?: number; className?: string; style?: CSSProperties; alt?: string;
}) {
  const image = asset(node, name);
  const rootWidth = Number(image.width);
  const rootHeight = Number(image.height);
  const targetWidth = width ?? rootWidth;
  const targetHeight = height ?? rootHeight;
  return <span className={`lower-svg ${className}`} style={{ width: targetWidth, height: targetHeight, ...style }}>
    <img src={localUrl(image.path)} alt={alt} style={{ transform: `scale(${targetWidth / rootWidth}, ${targetHeight / rootHeight})` }} />
  </span>;
}

const tools = [
  { node: '187-4467', title: 'Tạo CV bằng AI', description: ['Tạo CV chuyên nghiệp', 'trong 1 phút'], color: 'cv' },
  { node: '187-4481', title: 'Phân tích CV', description: ['Nhận điểm mạnh & gợi ý', 'cải thiện'], color: 'scan' },
  { node: '187-4495', title: 'So sánh lương', description: ['Biết giá trị thị trường', 'của bạn'], color: 'salary' },
  { node: '187-4509', title: 'Hỏi đáp nghề nghiệp', description: ['Tư vấn 24/7 cùng', 'JobsGO AI'], color: 'chat' },
];

const articles = [
  { category: 'Cẩm nang', title: 'Top 10 kỹ năng nhà tuyển dụng tìm kiếm năm 2025', lines: ['Top 10 kỹ năng nhà tuyển dụng', 'tìm kiếm năm 2025'], date: '12 Thg 3, 2025', image: 'imgEditorialConversationPngExact15565ReferenceSlotOriginalPlaced' },
  { category: 'Xu hướng', title: 'AI có thay thế con người? Cơ hội nghề nghiệp trong thời đại AI', lines: ['AI có thay thế con người?', 'Cơ hội nghề nghiệp trong thời đại AI'], date: '10 Thg 3, 2025', image: 'imgEditorialAiOfficePngExact15565ReferenceSlotOriginalPlaced' },
  { category: 'Kinh nghiệm', title: 'Cách viết CV thu hút nhà tuyển dụng trong 6 giây đầu tiên', lines: ['Cách viết CV thu hút nhà tuyển', 'dụng trong 6 giây đầu tiên'], date: '8 Thg 3, 2025', image: 'imgEditorialCvDevicesV2PngOriginalPlaced' },
  { category: 'Thị trường', title: 'Mức lương IT 2025: Cập nhật mới nhất từ khảo sát', lines: ['Mức lương IT 2025: Cập nhật', 'mới nhất từ khảo sát'], date: '5 Thg 3, 2025', image: 'imgEditorialCodingLaptopPngExact15565ReferenceSlotOriginalPlaced' },
];

const footerColumns = [
  { title: 'Về JobsGO', links: ['Giới thiệu', 'Blog nghề nghiệp', 'Tuyển dụng', 'Liên hệ'] },
  { title: 'Dành cho ứng viên', links: ['Tìm việc làm', 'Tạo CV', 'Công cụ AI', 'Hỏi đáp nghề nghiệp'] },
  { title: 'Dành cho nhà tuyển dụng', links: ['Đăng tuyển', 'Giải pháp tuyển dụng', 'Bảng giá', 'Trung tâm hỗ trợ'] },
  { title: 'Hỗ trợ', links: ['Điều khoản', 'Chính sách bảo mật', 'Quy chế hoạt động', 'Câu hỏi thường gặp'] },
];

// Native Figma rectangles: this is an illustrative pattern without a configured destination.
const qrPattern = [
  '11111110100101010101001111111', '10000011000110001110001000001', '10111010001110001100011011101',
  '10111010010101010100101011101', '10111011111100000011111011101', '10000010110010011001101000001',
  '11111111001001011010011111111', '00000000000000000000000000000', '01101001001011010010010110100',
  '01100100110011001001100110010', '00000011111000000111110000001', '10101010100101010101001010101',
  '11000111000110001110001100011', '11000110001110001100011100011', '10101010010101010100101010101',
  '10000001111100000011111000000', '01001100110010011001100100110', '00101101001001011010010010110',
  '00000000000000000000000000000', '01101001001011010010010110100', '01100100110011001001100110010',
  '00000011111000000111110000001', '11111110100101010101001010101', '10000011000110001110001100011',
  '10111010001110001100011100011', '10111010010101010100101010101', '10111011111100000011111000000',
  '10000010110010011001100100110', '11111111001001011010010010110',
];

function AppStoreBadge() {
  return <span className="lower-appstore-art" aria-hidden="true">
    <FigmaSvg node="190-4807" name="imgGroup" />
    <FigmaSvg node="190-4807" name="imgGroup1" className="lower-appstore-apple" />
    <FigmaSvg node="190-4807" name="imgGroup2" className="lower-appstore-wordmark" />
    <FigmaSvg node="190-4807" name="imgGroup3" className="lower-appstore-caption" />
  </span>;
}

export type LowerSectionsProps = { onAction?: (action: string) => void };

export function LowerSections({ onAction }: LowerSectionsProps) {
  const [article, setArticle] = useState<(typeof articles)[number] | null>(null);
  const articleDialog = useRef<HTMLDialogElement>(null);
  const invoke = (action: string) => onAction?.(action);
  useEffect(() => {
    if (article && articleDialog.current && !articleDialog.current.open) articleDialog.current.showModal();
  }, [article]);
  const footerAction = (label: string) => {
    const destination = label === 'Công cụ AI' ? 'ai-tools' : label === 'Blog nghề nghiệp' ? 'career-editorial' : null;
    if (destination) document.getElementById(destination)?.scrollIntoView({ behavior: scrollBehavior() });
    else invoke(label);
  };

  return <div className="lower-sections">
    <section className="lower-ai lower-container" id="ai-tools" aria-labelledby="ai-tools-title">
      <div className="lower-section-heading">
        <span className="lower-heading-icon lower-heading-constellation" aria-hidden="true">
          <FigmaSvg node="187-4461" name="imgJobsGoV2IconSparkles" width={39.779} height={39.779} />
          <FigmaSvg node="187-4461" name="imgAiToolsFilledConstellationMark" />
        </span>
        <h2 id="ai-tools-title">Công cụ AI miễn phí từ JobsGO</h2>
        <button className="lower-view-all" onClick={() => invoke('Công cụ AI')}>Khám phá tất cả <span aria-hidden="true">→</span></button>
      </div>
      <div className="lower-four-grid lower-ai-grid">
        {tools.map((tool) => <button className="lower-tool-card" key={tool.title} onClick={() => invoke(tool.title)}>
          <span className={`lower-tool-icon lower-tool-icon-${tool.color}`} aria-hidden="true"><FigmaSvg node={`I${tool.node}-186-3866`} name="imgToolIcon" width={68} height={68} /></span>
          <span className="lower-tool-description"><strong>{tool.title}</strong><span>{tool.description.map((line) => <span key={line}>{line}</span>)}</span></span>
          <span className="lower-card-arrow" aria-hidden="true"><FigmaSvg node={tool.node} name="imgForwardCircle" /><span>→</span></span>
        </button>)}
      </div>
    </section>

    <section className="lower-editorial lower-container" id="career-editorial" aria-labelledby="career-editorial-title">
      <div className="lower-section-heading">
        <FigmaSvg node="187-4521" name="imgFrame" className="lower-heading-icon" />
        <h2 id="career-editorial-title">Tin tức &amp; Cẩm nang nghề nghiệp</h2>
        <button className="lower-view-all" onClick={() => invoke('Tin tức & Cẩm nang nghề nghiệp')}>Xem tất cả <span aria-hidden="true">→</span></button>
      </div>
      <div className="lower-four-grid lower-editorial-grid">
        {articles.map((item) => <button className="lower-article-card" key={item.title} onClick={() => setArticle(item)} aria-label={`Đọc ${item.title}`}>
          <img className="lower-article-photo" src={localUrl(asset('187-4521', item.image).path)} alt="" loading="lazy" />
          <span className="lower-article-category">{item.category}</span>
          <span className="lower-article-copy"><strong>{item.lines.map((line) => <span key={line}>{line}</span>)}</strong><span className="lower-article-date">{item.date}</span></span>
        </button>)}
      </div>
    </section>

    <section className="lower-recruiter lower-container" aria-labelledby="recruiter-title">
      <div className="lower-recruiter-banner">
        <div className="lower-recruiter-effects" aria-hidden="true">
          <FigmaSvg node="187-4551" name="imgFrame" width={1292.818} height={228.729} className="lower-recruiter-frame" />
          <FigmaSvg node="187-4551" name="imgRecruiterBoundedBlueIllumination" className="lower-recruiter-illumination" />
          <FigmaSvg node="187-4551" name="imgCyanEnergyHaze" className="lower-recruiter-haze" />
          <FigmaSvg node="187-4551" name="imgGroup" className="lower-recruiter-ribbon-one" />
          <FigmaSvg node="187-4551" name="imgGroup1" className="lower-recruiter-ribbon-two" />
        </div>
        <div className="lower-recruiter-copy"><h2 id="recruiter-title">Bạn đang tìm nhân tài?</h2><p>Đăng tuyển ngay trên JobsGO và tiếp cận hàng triệu ứng viên chất lượng.</p>
          <div className="lower-recruiter-actions"><button className="lower-recruiter-primary" onClick={() => invoke('Đăng tuyển ngay')}>Đăng tuyển ngay</button><button className="lower-recruiter-secondary" onClick={() => invoke('Liên hệ tư vấn')}>Liên hệ tư vấn</button></div>
        </div>
        <img className="lower-recruiter-people" src={localUrl(asset('187-4551', 'imgPairTabletFormalV2PngOriginalPlaced').path)} alt="Hai nhà tuyển dụng trao đổi bên máy tính bảng" loading="lazy" />
        <div className="lower-recruiter-statistics">
          {[['500,000+', 'Ứng viên tiềm năng'], ['95%', 'Hài lòng từ nhà tuyển dụng']].map(([value, label]) => <div className="lower-recruiter-stat" key={value}>
            <span className="lower-recruiter-stat-icon" aria-hidden="true"><FigmaSvg node="187-4551" name="imgStatisticCircularIconHost" /><FigmaSvg node="187-4551" name="imgDimensionalIndustryArtwork" /></span>
            <span><strong>{value}</strong><span>{label}</span></span>
          </div>)}
        </div>
      </div>
    </section>

    <section className="lower-press" aria-label="Doanh nghiệp tin tưởng JobsGO">
      <div className="lower-press-stage">
        <FigmaSvg node="190-4663" name="imgEllipse" className="lower-press-glow" />
        <p>Được tin tưởng bởi hơn 10,000+ doanh nghiệp hàng đầu</p>
        <div className="lower-press-logos">
          <FigmaSvg node="190-4663" name="imgFrame" className="lower-press-dantri" alt="Dân Trí" />
          <span className="lower-press-cafebiz"><FigmaSvg node="190-4663" name="imgGroup1" alt="CafeBiz" style={{ maskImage: `url(${localUrl(asset('190-4663', 'imgGroup').path)})`, maskRepeat: 'no-repeat', maskSize: '139.971px 58.902px', maskPosition: '-.02px -5.251px' }} /></span>
          <FigmaSvg node="190-4663" name="imgFrame1" className="lower-press-vnexpress" alt="VnExpress" />
          <FigmaSvg node="190-4663" name="imgFrame2" className="lower-press-genk" alt="GenK" />
          <span className="lower-press-kenh14"><FigmaSvg node="190-4663" name="imgFrame3" alt="Kênh14" /><span>kenh14.vn</span></span>
          <FigmaSvg node="190-4663" name="imgGroup2" className="lower-press-vietnamnet" alt="VietnamNet" />
          <span className="lower-press-vtv"><FigmaSvg node="190-4663" name="imgG1261" alt="VTV" /><FigmaSvg node="190-4663" name="imgG1160" /></span>
        </div>
      </div>
    </section>

    <section className="lower-download" aria-labelledby="app-download-title">
      <div className="lower-download-stage">
        <div className="lower-download-robot"><img src={localUrl(asset('190-4807', 'imgAppCroppedOpenEyedRobotIndependentOriginal').path)} alt="Trợ lý JobsGO AI" loading="lazy" /></div>
        <div className="lower-phone" aria-hidden="true"><FigmaSvg node="190-4807" name="imgJobsGoAppIcon" /><strong>JobsGO</strong><span>Việc làm dành cho bạn</span><span className="lower-phone-category">Marketing</span><span className="lower-phone-category">Công nghệ thông tin</span><span className="lower-phone-category">Kế toán</span><small>Tìm việc · Tạo CV · AI</small></div>
        <div className="lower-download-copy"><h2 id="app-download-title">TẢI ỨNG DỤNG JOBSGO</h2><strong>Tìm việc mọi lúc mọi nơi</strong><p>Cập nhật việc làm mới, nhận thông báo phù hợp với bạn.</p>
          <div className="lower-store-buttons"><button onClick={() => invoke('Tải ứng dụng JobsGO trên App Store')} aria-label="Tải ứng dụng JobsGO trên App Store"><AppStoreBadge /></button><button onClick={() => invoke('Tải ứng dụng JobsGO trên Google Play')} aria-label="Tải ứng dụng JobsGO trên Google Play"><FigmaSvg node="190-4807" name="imgFrame" /></button></div>
        </div>
        <button className="lower-qr" aria-label="Mã QR minh họa. Xem thông tin tải ứng dụng JobsGO" onClick={() => invoke('Tải ứng dụng JobsGO')}>
          {qrPattern.map((row, y) => [...row].map((value, x) => value === '1' ? <span key={`${x}-${y}`} style={{ left: 5.37 + x * 2.213, top: 4.3 + y * 2.213 }} /> : null))}
        </button>
        <FigmaSvg node="190-4807" name="imgGroup4" className="lower-download-constellation" />
        <dl className="lower-app-statistics">{[['1M+', 'Người dùng'], ['200k+', 'Việc làm mới mỗi tháng'], ['4.8★', 'Đánh giá trung bình']].map(([value, label]) => <div key={value}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>
      </div>
    </section>

    <footer className="lower-footer">
      <FigmaSvg node="190-5255" name="imgFooterSlantedNativeWhitePlane" className="lower-footer-plane" />
      <div className="lower-footer-main lower-container">
        <div className="lower-footer-brand-column">
          <button className="lower-footer-brand" aria-label="JobsGO - Về đầu trang" onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}>
            <span className="lower-brand-mark"><img src={localUrl(asset('190-5255', 'imgGenuineIndependentJobsGoPartnerAsset').path)} alt="" /></span>
            <span className="lower-brand-wordmark"><img src={localUrl(asset('190-5255', 'imgGenuineIndependentJobsGoPartnerAsset').path)} alt="JobsGO" /></span>
            <span className="lower-brand-tagline">Việc tốt hơn. Tương lai sáng hơn</span>
          </button>
          <div className="lower-social-links">{[['Facebook', 'imgSocialFacebookVector'], ['Discord', 'imgSocialDiscordVector'], ['LinkedIn', 'imgSocialLinkedInVector'], ['TikTok', 'imgSocialTikTokVector']].map(([name, image]) => <button key={name} aria-label={`JobsGO trên ${name}`} onClick={() => invoke(name)}><FigmaSvg node="190-5255" name={image} /></button>)}</div>
        </div>
        {footerColumns.map((column) => <nav className="lower-footer-column" key={column.title} aria-label={column.title}><h3>{column.title}</h3>{column.links.map((label) => <button key={label} onClick={() => footerAction(label)}>{label}</button>)}</nav>)}
      </div>
      <div className="lower-footer-bottom"><div className="lower-container"><p>© 2025 JobsGO. All rights reserved.</p></div></div>
      <button className="lower-chat-button" onClick={() => invoke('Chat với JobsGO AI')}><FigmaSvg node="190-5255" name="imgChatBlueCircularAssistantSymbol" /><span>Chat với JobsGO AI</span><span className="lower-chat-avatar"><img src={localUrl(asset('190-5255', 'imgIndependentRobotHeadCrop').path)} alt="" /></span></button>
    </footer>

    <dialog ref={articleDialog} className="lower-article-dialog" aria-labelledby="article-dialog-title" onClose={() => setArticle(null)} onClick={(event) => { if (event.target === event.currentTarget) articleDialog.current?.close(); }}>
      {article && <><button className="lower-dialog-close" aria-label="Đóng bài viết" onClick={() => articleDialog.current?.close()}>×</button><img className="lower-dialog-image" src={localUrl(asset('187-4521', article.image).path)} alt="" /><div className="lower-dialog-copy"><span>{article.category} · {article.date}</span><h2 id="article-dialog-title">{article.title}</h2><p>Đây là bản xem trước của bài viết. Nội dung đầy đủ chưa được kết nối.</p><button className="lower-dialog-button" onClick={() => articleDialog.current?.close()}>Đóng bản xem trước</button></div></>}
    </dialog>
  </div>;
}

export default LowerSections;
