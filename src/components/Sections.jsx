// ===== Bé rắn góp vui · Lời chúc xoay vòng + 4 tấm thiệp · Góc cảm hứng huyền thoại =====
import { useEffect, useState } from 'react';
import { GREETING_CARDS, ROTATING_WISHES, SNAKE_LINES } from '../data';

export function SnakeSection() {
  const [line, setLine] = useState(SNAKE_LINES[0]);
  return (
    <section className="section" id="be-ran">
      <h2 className="section-title">🐍 BÉ RẮN NGẬM HOA GÓP VUI 🐍</h2>
      <div className="snake-box">
        <span className="snake-big" aria-hidden="true">🐍🌹</span>
        <p>{line}</p>
        <button
          type="button"
          className="btn-shiny btn-green"
          onClick={() => setLine(SNAKE_LINES[(Math.random() * SNAKE_LINES.length) | 0])}
        >
          🐍 NGHE RẮN CHÚC NỮA
        </button>
      </div>
    </section>
  );
}

export function CardsSection() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % ROTATING_WISHES.length), 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="section" id="thiep-san">
      <h2 className="section-title">💐 LỜI CHÚC SẾN XOAY VÒNG 💐</h2>
      <p className="rotating-wish" key={idx}>{ROTATING_WISHES[idx]}</p>
      <div className="cards-grid">
        {GREETING_CARDS.map((c) => (
          <article className={`g-card ${c.color}`} key={c.to}>
            <div className="gc-emoji">{c.emoji}</div>
            <h3 className="display-font">Tặng {c.to}</h3>
            <p>{c.wish}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function InspoCorner() {
  // Tải lười module ảnh cảm hứng (dynamic import) để bundle ban đầu nhẹ, trang mở nhanh
  const [imgs, setImgs] = useState(null);
  useEffect(() => {
    let on = true;
    import('../assetsInspo').then((m) => { if (on) setImgs(m); });
    return () => { on = false; };
  }, []);

  return (
    <section className="section" id="cam-hung">
      <h2 className="section-title">🖼️ GÓC CẢM HỨNG HUYỀN THOẠI 🖼️</h2>
      <p className="section-desc">Hai tấm thiệp mẫu bất hủ đã truyền cảm hứng cho cả cái web sến này!</p>
      {imgs ? (
        <div className="inspo-grid">
          <figure>
            <img src={imgs.INSPO_1} alt="Thiệp mẫu: Rất tuyệt vời — tặng hoa em nhé, nền hoa đỏ trời xanh" loading="lazy" />
            <figcaption>🌹 "RẤT TUYỆT VỜI — Tặng hoa em nhé!"</figcaption>
          </figure>
          <figure>
            <img src={imgs.INSPO_2} alt="Thiệp mẫu: Đêm muộn chúc ngủ ngon, mơ đẹp nhé, hoa hồng phát sáng" loading="lazy" />
            <figcaption>🌙 "Đêm muộn — Chúc Ngủ Ngon — Mơ đẹp nhé"</figcaption>
          </figure>
        </div>
      ) : (
        <p className="section-desc">Đang rước hai tấm thiệp huyền thoại về… 🌹</p>
      )}
    </section>
  );
}
