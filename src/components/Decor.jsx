// ===== Lớp trang trí nền: tia nắng, giấy dán hoa, khung vàng, bó hoa góc, dải chữ chạy, mưa cánh hoa =====
import { useEffect, useRef } from 'react';

const TOP_TEXT = '🌹 CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20-10 🌹 TẶNG HOA EM NHÉ! 🌹 RẤT TUYỆT VỜI 🌹 ';
const BOTTOM_TEXT = '💐 MÃI TUỔI 18 NHÉ 💐 TIỀN VÀO NHƯ NƯỚC 💐 HOA NỞ ĐẦY NHÀ 💐 MƠ ĐẸP NHÉ 💐 ';

function PetalCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let w, h, raf, running = true;
    const petals = [];
    const EMOJIS = ['🌺', '🌹', '🪷', '🌷', '🌻', '💐', '❤️'];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 46; i++) {
      petals.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 16 + Math.random() * 18,
        speedY: 0.6 + Math.random() * 1.6,
        sway: 0.6 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.04,
        rot: Math.random() * Math.PI * 2,
        emoji: EMOJIS[(Math.random() * EMOJIS.length) | 0],
      });
    }

    let last = performance.now();
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.phase += dt * p.sway;
        p.y += p.speedY * 60 * dt;
        p.x += Math.sin(p.phase) * 0.7;
        p.rot += p.spin;
        if (p.y > h + 40) { p.y = -40; p.x = Math.random() * w; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      }
    };
    raf = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className="petal-canvas" aria-hidden="true" />;
}

export default function Decor() {
  return (
    <>
      <div className="sky-rays" aria-hidden="true" />
      <div className="night-stars" aria-hidden="true" />
      <div className="wallpaper" aria-hidden="true" />
      <PetalCanvas />
      <div className="gold-frame" aria-hidden="true">
        <span className="frame-rose tl">🌹</span>
        <span className="frame-rose tr">🌹</span>
        <span className="frame-rose bl">🌹</span>
        <span className="frame-rose br">🌹</span>
      </div>
      <span className="corner-bouquet c-tl" aria-hidden="true">💐🌹</span>
      <span className="corner-bouquet c-tr" aria-hidden="true">🌹💐</span>
      <span className="corner-bouquet c-bl" aria-hidden="true">🌺💐</span>
      <span className="corner-bouquet c-br" aria-hidden="true">💐🌷</span>
      <div className="marquee top" aria-hidden="true">
        <span className="marquee-track">{TOP_TEXT.repeat(4)}</span>
      </div>
      <div className="marquee bottom" aria-hidden="true">
        <span className="marquee-track">{BOTTOM_TEXT.repeat(4)}</span>
      </div>
    </>
  );
}
