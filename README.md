# JobsGO demo

Bản demo frontend theo [frame Figma Jobsgo, node 171:3840](https://www.figma.com/design/EogMrr7ldhuqQn1h47gOli/Jobsgo?node-id=171-3840), dựng bằng React, TypeScript và Vite.

- [Xem demo](https://roylle.github.io/Jobsgo/)
- [Mã nguồn public](https://github.com/Roylle/Jobsgo)

## Chạy trên máy

Yêu cầu Node.js 22 trở lên và npm.

```sh
npm ci
npm run dev
```

Mở địa chỉ được Vite in ra. Tạo bản production bằng `npm run build`; xem thử bằng `npm run preview`.

## Phạm vi demo

Giao diện desktop theo frame 1440 × 4848, có bố cục responsive cho tablet và điện thoại. Ảnh, logo và SVG được tải từ Figma về `public/assets`; font được đóng gói trong dự án.

Tìm kiếm và bộ lọc dùng danh sách việc làm trong thiết kế. Có xem chi tiết, lưu/bỏ lưu việc làm bằng localStorage, danh sách công ty/ngành nghề, xem trước bài viết và menu điều hướng. Biểu mẫu tạo CV cho phép tải bản văn bản; biểu mẫu phân tích CV chỉ chọn tệp trên máy. Các hộp thoại tài khoản, liên hệ và chat thể hiện rõ trạng thái demo, chưa kết nối backend hoặc dịch vụ AI. Tỷ lệ phù hợp, số lượng việc làm, lương và bài viết là nội dung của mẫu Figma.

## Kiểm tra

```sh
npm run build
npx playwright install chrome
npm run test:e2e
```

Nếu máy đã có Google Chrome, có thể bỏ qua bước cài browser. Bộ E2E dùng context trình duyệt riêng để kiểm tra tìm kiếm, lọc địa điểm, lưu việc sau reload, mở/đóng chi tiết và bài viết, chọn tệp CV, responsive và ảnh local. Test server tự chạy trên cổng 5173 hoặc dùng server có sẵn khi chạy local.

Workflow GitHub Actions kiểm tra các luồng trình duyệt, build rồi deploy `dist` lên GitHub Pages khi push vào `main`. Cấu hình dựa theo [hướng dẫn custom workflow của GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Cấu trúc

```text
src/components/Hero.tsx          Header, hero, tìm kiếm, AI shortcuts
src/components/JobsSections.tsx  Việc làm, công ty, thực tập, ngành nghề
src/components/Campaigns.tsx     Banner AI và công cụ nghề nghiệp
src/components/LowerSections.tsx AI tools, tin tức, tải app, footer
src/App.tsx                     Ghép trang và các hộp thoại demo
public/assets/                  Tài nguyên Figma gốc
tests/demo.spec.ts              Kiểm tra các luồng tương tác
```
