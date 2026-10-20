# 🌹 Web Chúc Mừng 20/10 — Sến Sứa Chuẩn Gu Người Già 🌹

Trang web chúc mừng **Ngày Phụ nữ Việt Nam 20/10** viết bằng **React + Vite**, tái hiện trọn vẹn phong cách thiệp chúc Facebook của các cô các dì: nền trời xanh chuyển hồng đậm, tia nắng xoay, giấy dán tường hoa hòe, khung vàng kim tuyến, chữ vàng viền xanh lá chói lòa và độ sến **phá vỡ mọi giới hạn**.

> RẤT TUYỆT VỜI — Tặng hoa em nhé! 💐

## ✨ Tính năng

- **Nền "outmeta" huyền thoại**: gradient trời xanh → hồng đậm, tia nắng xoay chậm kiểu thiệp "chào buổi sáng", giấy dán tường họa tiết hoa, mưa cánh hoa rơi khắp trang (tự dừng khi ẩn tab), khung viền vàng kim tuyến hai lớp ôm quanh màn hình, bó hoa khổng lồ đung đưa ở 4 góc, dải chữ chạy marquee trên/dưới. Bật dark mode là chuyển sang nền đêm lấp lánh sao ✨
- **Cổng chào hỏi thông tin**: vừa vào phải khai tên người nhận, quan hệ (Mẹ iu / Cô giáo / Chị–em gái / Bạn thân / Người thương–crush) và gu thiệp (Sến chảy nước / Hài xỉu / Ngọt lịm tim) rồi mới được mở thiệp. Lười thì có nút "coi lén" 👀
- **Thiệp riêng đúng đối tượng**: lời chúc viết riêng cho từng quan hệ × từng gu, kèm cơ chế **trao tặng**:
  - 🎁 **Lấy thiệp thành ảnh** — tải về file PNG 1080×1440 (vẽ bằng canvas) để gửi Zalo/Messenger
  - 🖨️ **In thiệp ra giấy** — bản in sạch sẽ, chỉ in đúng tấm thiệp, không dính nền hồng/mèo/rắn
- **Bé mèo bay** 🐱🪽: bé mèo trắng trong ảnh thật được gắn cánh, bay lượn mượt mà khắp màn hình, phun bong bóng thoại chúc 20/10; bấm vào mèo là hoa nổ tung và mèo kêu "meo" (WebAudio)
- **Máy Pachislot "SUPER SẾN — Hoa Hòe — PACHISLOT EDITION · 20/10"** 🎰: 3 cuộn quay biểu tượng hoa (🌹🪷🌻🌺🌷🔔🐱💎), cần gạt bóng đỏ, 3 nút DỪNG tự tay, trúng 3 ô là JACKPOT nổ nhạc + xổ lời chúc, hụt 2 lượt liên tiếp thì lượt sau máy **bù trúng chắc**; có nút chép lời chúc và lấy ảnh lời chúc PNG
- **Khu vui chơi sến hài** — xưng hô theo vai (chọn Mẹ iu thì xưng "con", Cô giáo thì xưng "em"):
  - 📏 **Máy Đo Độ Sến**: đo ra toàn 100–200% kèm phán quyết "phá vỡ mọi giới hạn"
  - 🔮 **Bói Hoa 20/10**: quẻ hoa phán vận mệnh (Mẹ/Cô giáo được bộ quẻ riêng về sức khỏe, con cháu sum vầy), có quẻ hiếm "Mèo ngậm hoa"
  - 🏆 **Bằng Khen Treo Tường**: danh hiệu khung vàng kiểu "Người Mẹ Vĩ Đại Nhất Mọi Thời Đại", "Cô Giáo Dịu Dàng Nhất Hệ Mặt Trời"
  - 🧧 **Phong Bao Lời Chúc**: mở phong bao đỏ ra lời chúc "phúc như Đông Hải, thọ tỷ Nam Sơn", "bệnh tật né xa ba cây số"…
- **Bé rắn ngậm hoa** 🐍 góp lời chúc, **4 tấm thiệp có sẵn** (Mẹ, Cô giáo, Chị em, Người thương) + lời chúc sến xoay vòng, và **Góc cảm hứng huyền thoại** trưng hai tấm thiệp mẫu bất hủ

## 🖼️ Lưu ý về hình ảnh

Ba tấm ảnh (bé mèo, hai thiệp mẫu) được **nhúng trực tiếp dạng base64 data URI** trong `src/assets.js` — dự án không chứa file ảnh nhị phân nào, để việc đẩy code lên GitHub qua cơ chế snapshot dạng text được trơn tru.

## 🚀 Cách chạy

Yêu cầu: Node.js 18+ và npm.

```bash
# Cài dependencies
npm install

# Chạy môi trường phát triển (mặc định http://localhost:5173)
npm run dev

# Build production (kết quả nằm trong thư mục dist/)
npm run build

# Xem thử bản build
npm run preview
```

## 🗂️ Cấu trúc thư mục

```
chuc-mung-20-10/
├── index.html              # Tiêu đề + Google Fonts (Baloo 2, Dancing Script, Be Vietnam Pro)
├── src/
│   ├── main.jsx            # Điểm vào ứng dụng
│   ├── App.jsx             # Ghép toàn bộ trang + trạng thái cổng chào / người nhận
│   ├── assets.js           # 3 ảnh nhúng base64 (mèo + 2 thiệp mẫu)
│   ├── data.js             # Toàn bộ nội dung sến: lời chúc, quẻ bói, bằng khen, phong bao…
│   ├── sounds.js           # Âm thanh WebAudio: ting, meo, jackpot…
│   ├── cardExport.js       # Vẽ thiệp / lời chúc ra canvas PNG để tải về
│   ├── index.css           # Toàn bộ style sến súa + chế độ tối + bản in
│   └── components/
│       ├── Decor.jsx       # Tia nắng, giấy dán hoa, khung vàng, marquee, mưa cánh hoa
│       ├── Gate.jsx        # Cổng chào hỏi thông tin người nhận
│       ├── PersonalCard.jsx# Thiệp riêng + lấy ảnh PNG + in giấy
│       ├── FlyingCat.jsx   # Bé mèo có cánh bay khắp màn hình
│       ├── Pachislot.jsx   # Máy pachislot SUPER SẾN xổ lời chúc
│       ├── FunZone.jsx     # Đo độ sến, bói hoa, bằng khen, phong bao
│       └── Sections.jsx    # Bé rắn, thiệp có sẵn, góc cảm hứng
└── public/                 # favicon và icons dạng SVG (text)
```

## 🛠️ Công nghệ

React 19 · Vite · CSS thuần · Canvas API (mưa hoa + xuất ảnh thiệp) · WebAudio API (âm thanh) · Google Fonts (Baloo 2 / Dancing Script / Be Vietnam Pro)

---

*Được làm với 100% độ sến. Chúc mừng 20/10 — mãi mãi tuổi 18 nhé!* 🌺🌺💐🌺🥀❤️🪷🪷❤️‍🔥🐍🌹🩵🌷🌻🪻

## Deploy lên Vercel

Project đã có sẵn cấu hình trong `vercel.json` (framework Vite, build `npm run build`, thư mục xuất ra `dist`, Node 20 theo `.nvmrc`).

1. Vào [vercel.com](https://vercel.com) → **Add New → Project**
2. Chọn repo `chuc-mung-20-10` từ GitHub và bấm **Import**
3. Vercel tự nhận diện cấu hình — cứ bấm **Deploy** là xong, không cần chỉnh gì thêm
