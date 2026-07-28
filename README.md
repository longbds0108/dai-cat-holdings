# ĐẠI CÁT HOLDINGS — Website

Website công ty bất động sản, xây bằng Node.js (Express + EJS), MySQL (Sequelize), có trang quản trị nội dung (Admin CMS) và hỗ trợ song ngữ Việt/Anh.

## Công nghệ

- **Backend:** Node.js, Express, EJS (server-rendered, tốt cho SEO)
- **CSS:** Tailwind CSS
- **Database:** Sequelize ORM — SQLite khi chạy local (không cần cài server DB), MySQL khi lên production/cPanel
- **Rich text:** Quill (self-host, không phụ thuộc CDN ngoài) + DOMPurify sanitize trước khi lưu DB
- **Ảnh:** Multer (upload) + Sharp (resize, convert WebP)
- **Bảo mật:** Helmet (CSP), CSRF (double-submit cookie), rate limiting, express-validator

## Chạy ở local

```bash
npm install
cp .env.example .env
npm run css:build
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev
```

Mở `http://localhost:3000` (tự chuyển sang `/vi` hoặc `/en`).

Tài khoản admin mặc định (đổi ngay sau khi deploy thật): lấy từ `.env` — `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Đăng nhập tại `/admin/login`.

`npm run dev` chạy song song server (tự reload qua nodemon) và Tailwind ở chế độ watch.

## Cấu trúc thư mục

```
app.js                 # Entry point (cPanel Passenger cũng chạy file này)
src/
  server.js            # Cấu hình Express, middleware, mount route
  config/              # database.js (Sequelize), i18n.js, csrf.js
  models/              # Project, NewsPost, Inquiry, AdminUser, SiteSetting
  migrations/ seeders/ # Sequelize CLI
  controllers/         # publicController, adminController, seoController
  routes/              # public.js (/vi, /en), admin.js (/admin), api.js
  middlewares/         # locale, auth, upload
  views/                # EJS templates (pages/, admin/, partials/, layouts/)
  locales/             # vi.json, en.json — toàn bộ text hiển thị
public/                # CSS build, JS client, ảnh, file upload
```

## Thay nội dung/thương hiệu thật

Dữ liệu mẫu (3 dự án, 2 tin tức, ảnh Pexels placeholder) nằm trong `src/seeders/20260101000010-demo-content.js` — chỉ dùng để xem giao diện. Khi có nội dung thật:

1. Đăng nhập `/admin`, xoá/sửa dữ liệu mẫu qua giao diện quản trị (Dự án, Tin tức, Cài đặt), hoặc
2. Sửa trực tiếp file seeder rồi chạy lại `npx sequelize-cli db:seed:all` trên DB sạch.
3. Logo: thay `public/images/favicon.svg` và thêm logo chính thức vào `partials/nav.ejs`.
4. Bảng màu/font: khai báo ở `tailwind.config.js` (đang dùng đen `#1C1917` + vàng đồng `#A16207`, font Cinzel/Josefin Sans).

## Đưa code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<tai-khoan>/<ten-repo>.git
git push -u origin main
```

## Deploy lên cPanel

Yêu cầu: gói hosting cPanel có tính năng **"Setup Node.js App"** (Phusion Passenger) — kiểm tra trong cPanel trước khi làm theo các bước dưới.

### 1. Tạo MySQL database

cPanel → **MySQL® Databases** → tạo database + user, gán quyền ALL PRIVILEGES cho user vào database đó. Ghi lại tên database, username, password (thường có tiền tố `cpaneluser_`).

### 2. Tạo Node.js App

cPanel → **Setup Node.js App** → Create Application:
- **Node.js version:** 18.x trở lên
- **Application mode:** Production
- **Application root:** ví dụ `dai-cat-holdings-website` (thư mục riêng, KHÔNG phải `public_html`)
- **Application URL:** domain hoặc subdomain của bạn
- **Application startup file:** `app.js`

Sau khi tạo, cPanel cho một lệnh dạng `source /home/USERNAME/nodevenv/dai-cat-holdings-website/18/bin/activate` — dùng lệnh này để cập nhật `.cpanel.yml` (xem bước 4).

### 3. Đưa code lên cPanel qua Git

cPanel → **Git Version Control** → Create:
- Clone URL: repo GitHub của bạn
- Repository Path: trùng với "Application root" ở bước 2

### 4. Cập nhật `.cpanel.yml`

Mở file `.cpanel.yml` ở gốc repo, thay `USERNAME` và tên app (`dai-cat-holdings-website`) bằng giá trị thật của tài khoản cPanel (lấy từ lệnh activate ở bước 2). File này sẽ tự chạy `npm install`, build CSS, chạy migration, và restart app mỗi khi bạn pull code mới trong Git Version Control.

### 5. Tạo file `.env` trên server

Qua File Manager hoặc SSH, tạo `.env` trong Application root (copy từ `.env.example`) với:
- `NODE_ENV=production`
- `DB_DIALECT=mysql` + thông tin DB ở bước 1
- `SESSION_SECRET`, `CSRF_SECRET`: chuỗi ngẫu nhiên dài, khác nhau
- `BASE_URL`: domain thật, có `https://`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`: tài khoản admin đầu tiên (đổi mật khẩu ngay sau khi đăng nhập lần đầu)
- Thông tin SMTP nếu muốn nhận email khi có khách liên hệ

**Không commit file `.env` lên Git** (đã có trong `.gitignore`).

### 6. Chạy lần đầu

Trong cPanel → Git Version Control → repo vừa tạo → **Manage** → **Update from Remote** rồi **Deploy HEAD Commit** (chạy các tác vụ trong `.cpanel.yml`, bao gồm `db:migrate`). Sau đó chạy seed dữ liệu mẫu (tuỳ chọn) qua SSH:

```bash
source /home/USERNAME/nodevenv/dai-cat-holdings-website/18/bin/activate
cd ~/dai-cat-holdings-website
npx sequelize-cli db:seed:all --env production
```

Cuối cùng vào **Setup Node.js App** → bấm **Restart** để chắc chắn app chạy bản mới nhất.

### Các lần deploy sau

Chỉ cần: push code lên GitHub → cPanel Git Version Control → Update from Remote → Deploy HEAD Commit. `.cpanel.yml` lo phần còn lại.
