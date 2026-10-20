// ===== Bé mèo trắng có cánh bay khắp màn hình =====
import { useEffect, useRef, useState } from 'react';
import { CAT_IMG } from '../assets';
import { CAT_BUBBLES } from '../data';
import { playMeow } from '../sounds';

const BURST_EMOJIS = ['🌹', '🌺', '🪷', '🌷', '❤️', '✨', '💐'];

export default function FlyingCat() {
  const catRef = useRef(null);
  const stateRef = useRef(null);
  const [bubble, setBubble] = useState('');
  const [bursts, setBursts] = useState([]);

  // Vật lý bay: vị trí + vận tốc có quán tính hướng về điểm đích ngẫu nhiên
  useEffect(() => {
    const el = catRef.current;
    if (!el) return;
    const margin = 130;
    const pickTarget = () => ({
      x: 60 + Math.random() * Math.max(80, window.innerWidth - margin - 120),
      y: 90 + Math.random() * Math.max(80, window.innerHeight - margin - 140),
    });
    const st = {
      x: 80, y: 140, vx: 0, vy: 0,
      target: pickTarget(),
      flip: 1,
    };
    stateRef.current = st;
    let raf;
    let last = performance.now();

    const step = (now) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const dx = st.target.x - st.x;
      const dy = st.target.y - st.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 26) st.target = pickTarget();
      // Gia tốc nhẹ về phía đích → chuyển động có quán tính, lướt mượt
      st.vx += (dx / (dist + 40)) * 130 * dt;
      st.vy += (dy / (dist + 40)) * 130 * dt;
      st.vx *= 0.965;
      st.vy *= 0.965;
      st.x += st.vx * dt * 3.2;
      st.y += st.vy * dt * 3.2 + Math.sin(now / 480) * 0.35;
      st.x = Math.max(4, Math.min(st.x, window.innerWidth - margin));
      st.y = Math.max(70, Math.min(st.y, window.innerHeight - margin - 30));
      if (Math.abs(st.vx) > 4) st.flip = st.vx > 0 ? 1 : -1;
      el.style.transform = `translate(${st.x}px, ${st.y}px)`;
      const img = el.querySelector('.cat-img');
      if (img) img.style.transform = `scaleX(${st.flip})`;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Bong bóng thoại thay đổi theo ngữ cảnh
  useEffect(() => {
    let hide;
    const show = () => {
      setBubble(CAT_BUBBLES[(Math.random() * CAT_BUBBLES.length) | 0]);
      hide = setTimeout(() => setBubble(''), 3400);
    };
    show();
    const iv = setInterval(show, 7000);
    return () => { clearInterval(iv); clearTimeout(hide); };
  }, []);

  const handleClick = () => {
    playMeow();
    setBubble('Meo~ cảm ơn nha! Nhận hoa nè 🌹');
    const st = stateRef.current;
    const cx = (st ? st.x : 120) + 56;
    const cy = (st ? st.y : 160) + 56;
    const parts = Array.from({ length: 14 }, (_, i) => {
      const ang = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 74 + Math.random() * 90;
      return {
        id: Date.now() + '-' + i,
        emoji: BURST_EMOJIS[(Math.random() * BURST_EMOJIS.length) | 0],
        x: cx, y: cy,
        dx: Math.cos(ang) * dist,
        dy: Math.sin(ang) * dist - 26,
        rot: (Math.random() - 0.5) * 260,
      };
    });
    setBursts((b) => [...b, ...parts]);
    setTimeout(() => {
      setBursts((b) => b.filter((p) => !parts.includes(p)));
    }, 1000);
  };

  return (
    <>
      <div
        ref={catRef}
        className="flying-cat"
        style={{ left: 0, top: 0 }}
        onClick={handleClick}
        title="Bé mèo bay — bấm vào mèo thử coi!"
        role="button"
        aria-label="Bé mèo bay chúc 20/10"
      >
        <span className="cat-wings" aria-hidden="true">
          <span className="wing left">🪽</span>
          <span className="wing right">🪽</span>
        </span>
        {bubble && <div className="cat-bubble">{bubble}</div>}
        <img className="cat-img" src={CAT_IMG} alt="Bé mèo trắng có cánh" draggable="false" />
      </div>
      {bursts.map((p) => (
        <span
          key={p.id}
          className="burst-p"
          style={{
            left: p.x, top: p.y,
            '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, '--rot': `${p.rot}deg`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </>
  );
}
