// ===== Máy Pachislot "SUPER SẾN — Hoa Hòe — PACHISLOT EDITION · 20/10" =====
import { useEffect, useRef, useState } from 'react';
import { SLOT_SYMBOLS, SLOT_WISHES } from '../data';
import { playTing, playJackpot, playSmallWin, playClick } from '../sounds';
import { renderWishPng } from '../cardExport';

const LEN = SLOT_SYMBOLS.length * 3; // 24 ô mỗi cuộn (3 vòng lặp)

// Dải biểu tượng cố định cho từng cuộn (xoay lệch pha nhau)
function makeStrip(reelIdx) {
  const rot = SLOT_SYMBOLS.map((_, i) => SLOT_SYMBOLS[(i + reelIdx * 3) % SLOT_SYMBOLS.length]);
  const strip = [];
  for (let c = 0; c < 3; c++) strip.push(...rot);
  return strip;
}
const STRIPS = [makeStrip(0), makeStrip(1), makeStrip(2)];

function decideOutcome(misses) {
  // Pity: hụt 2 lượt liên tiếp → lượt sau bù trúng chắc
  let roll = Math.random();
  if (misses >= 2) roll = Math.random() * 0.45; // ép vào vùng trúng
  const sym = SLOT_SYMBOLS[(Math.random() * SLOT_SYMBOLS.length) | 0];
  if (roll < 0.15) return [sym, sym, sym]; // JACKPOT
  if (roll < 0.48) {
    // Trúng nhỏ: 2 ô giống nhau
    const odd = (Math.random() * 3) | 0;
    let other = SLOT_SYMBOLS[(Math.random() * SLOT_SYMBOLS.length) | 0];
    if (other === sym) other = SLOT_SYMBOLS[(SLOT_SYMBOLS.indexOf(sym) + 1) % SLOT_SYMBOLS.length];
    return [0, 1, 2].map((i) => (i === odd ? other : sym));
  }
  // Hụt: 3 ô khác nhau hết
  const pool = [...SLOT_SYMBOLS].sort(() => Math.random() - 0.5);
  return [pool[0], pool[1], pool[2]];
}

export default function Pachislot() {
  const [cellH, setCellH] = useState(() => (window.innerWidth <= 640 ? 54 : 64));
  const [spinning, setSpinning] = useState(false);
  const [reelModes, setReelModes] = useState(['idle', 'idle', 'idle']);
  const [spins, setSpins] = useState(0);
  const [jackpots, setJackpots] = useState(0);
  const [msg, setMsg] = useState('Kéo cần gạt hoặc bấm QUAY để xổ lời chúc nè! 🎰');
  const [result, setResult] = useState(null);
  const [copyNote, setCopyNote] = useState('');
  const [leverPulled, setLeverPulled] = useState(false);

  const cellRef = useRef(cellH);
  const stripRefs = [useRef(null), useRef(null), useRef(null)];
  const reelsRef = useRef([
    { pos: 0, mode: 'idle', from: 0, to: 0, startT: 0, dur: 0, speed: 0 },
    { pos: 5 * 64, mode: 'idle', from: 0, to: 0, startT: 0, dur: 0, speed: 0 },
    { pos: 11 * 64, mode: 'idle', from: 0, to: 0, startT: 0, dur: 0, speed: 0 },
  ]);
  const targetsRef = useRef(null);
  const missesRef = useRef(0);
  const timeoutsRef = useRef([]);
  const spinningRef = useRef(false);

  // Đổi cỡ ô khi màn hình thay đổi
  useEffect(() => {
    const onResize = () => {
      const c = window.innerWidth <= 640 ? 54 : 64;
      cellRef.current = c;
      setCellH(c);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const drawReel = (i) => {
    const el = stripRefs[i].current;
    if (!el) return;
    const cell = cellRef.current;
    const cycle = LEN * cell;
    const off = ((reelsRef.current[i].pos % cycle) + cycle) % cycle;
    el.style.transform = `translateY(${-off}px)`;
    el.classList.toggle('blur', reelsRef.current[i].mode === 'spin');
  };

  const setMode = (i, mode) => {
    reelsRef.current[i].mode = mode;
    setReelModes((m) => {
      const next = [...m];
      next[i] = mode;
      return next;
    });
  };

  const finishSpin = () => {
    const t = targetsRef.current;
    spinningRef.current = false;
    setSpinning(false);
    if (t[0] === t[1] && t[1] === t[2]) {
      missesRef.current = 0;
      setJackpots((j) => j + 1);
      playJackpot();
      setMsg('🎉 JACKPOT!!! TRÚNG LỚN RỒI NÈ 🎉');
      setResult({ type: 'jackpot', symbol: t[0], wish: SLOT_WISHES[t[0]] });
    } else if (t[0] === t[1] || t[1] === t[2] || t[0] === t[2]) {
      missesRef.current = 0;
      const pair = t[0] === t[1] || t[0] === t[2] ? t[0] : t[1];
      playSmallWin();
      setMsg('✨ TRÚNG NHỎ! Có lời chúc đem về nè ✨');
      setResult({ type: 'small', symbol: pair, wish: SLOT_WISHES[pair] });
    } else {
      missesRef.current += 1;
      setResult(null);
      setMsg(
        missesRef.current >= 2
          ? 'Suýt trúng thôi à! 😿 Máy thấy thương quá, lượt sau BÙ TRÚNG CHẮC luôn!'
          : 'Suýt trúng thôi à! 😿 Kéo thêm lượt nữa đi, hoa sắp về rồi…'
      );
    }
  };

  const stopReel = (i) => {
    const r = reelsRef.current[i];
    if (r.mode !== 'spin') return;
    const cell = cellRef.current;
    const strip = STRIPS[i];
    const target = targetsRef.current[i];
    const currentTop = Math.floor(r.pos / cell);
    let k = currentTop + 6;
    while (strip[(k + 1) % LEN] !== target) k++;
    r.from = r.pos;
    r.to = k * cell;
    r.dur = Math.min(1100, Math.max(450, 320 + (r.to - r.from) * 0.9));
    r.startT = performance.now();
    setMode(i, 'stop');
  };

  // Vòng lặp vật lý: bước cố định theo thời gian thực, bóng… à nhầm, cuộn chạy mượt
  useEffect(() => {
    let raf;
    let last = performance.now();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      let changed = false;
      reelsRef.current.forEach((r, i) => {
        if (r.mode === 'spin') {
          r.pos += r.speed * dt;
          changed = true;
        } else if (r.mode === 'stop') {
          const p = Math.min((now - r.startT) / r.dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          r.pos = r.from + (r.to - r.from) * eased;
          changed = true;
          if (p >= 1) {
            r.pos = r.to;
            setMode(i, 'done');
            playTing();
            if (reelsRef.current.every((x) => x.mode === 'done' || x.mode === 'idle')) {
              if (spinningRef.current) finishSpin();
            }
          }
        }
        if (changed) drawReel(i);
      });
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Vẽ vị trí ban đầu (bắt lại vị trí cho khớp ô khi đổi cỡ màn hình)
  useEffect(() => {
    reelsRef.current.forEach((r, i) => {
      r.pos = Math.round(r.pos / cellRef.current) * cellRef.current;
      drawReel(i);
    });
  }, [cellH]);

  const spin = () => {
    if (spinningRef.current) return;
    playClick();
    setLeverPulled(true);
    setTimeout(() => setLeverPulled(false), 220);
    setResult(null);
    setCopyNote('');
    targetsRef.current = decideOutcome(missesRef.current);
    spinningRef.current = true;
    setSpinning(true);
    setSpins((s) => s + 1);
    setMsg('Đang quay… bấm DỪNG từng cuộn hoặc chờ máy tự dừng nè! 🌀');
    reelsRef.current.forEach((r, i) => {
      r.speed = 1500 + i * 220;
      setMode(i, 'spin');
    });
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [
      setTimeout(() => stopReel(0), 1250),
      setTimeout(() => stopReel(1), 1950),
      setTimeout(() => stopReel(2), 2650),
    ];
  };

  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), []);

  const copyWish = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.wish);
      setCopyNote('Đã chép lời chúc rồi — dán gửi người thương liền đi! 💌');
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = result.wish;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      setCopyNote('Đã chép lời chúc rồi — dán gửi người thương liền đi! 💌');
    }
  };

  const exportWish = async () => {
    if (!result) return;
    setCopyNote('Đang vẽ ảnh lời chúc… ⏳');
    await renderWishPng(result.wish, result.symbol);
    setCopyNote('Đã tải ảnh lời chúc PNG về máy rồi nè! 🎁');
  };

  return (
    <section className="section" id="pachislot">
      <h2 className="section-title">🎰 MÁY PACHISLOT LỜI CHÚC 🎰</h2>
      <p className="section-desc">Đập hộp kiểu Nhật: kéo cần, quay cuộn, trúng hoa là xổ lời chúc sến đem về!</p>

      <div className="slot-cabinet" style={{ '--cell': `${cellH}px` }}>
        <div className="light-strip" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => <span key={i} className="light-dot" />)}
        </div>
        <p className="slot-logo display-font">SUPER SẾN</p>
        <p className="slot-logo-script script-font">~ Hoa Hòe ~</p>
        <p className="slot-edition">PACHISLOT EDITION · 20/10</p>

        <div className="slot-main">
          <div className="reels-frame">
            <div className="reels">
              {STRIPS.map((strip, i) => (
                <div className="reel-window" key={i}>
                  <div className="reel-strip" ref={stripRefs[i]}>
                    {[...strip, ...strip, ...strip].map((s, k) => (
                      <div className="reel-cell" key={k}>{s}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="payline" aria-hidden="true" />
          </div>
          <div className="lever-zone">
            <button
              type="button"
              className={`lever${leverPulled ? ' pulled' : ''}`}
              onClick={spin}
              disabled={spinning}
              aria-label="Kéo cần gạt quay"
            >
              <span className="lever-ball" />
              <span className="lever-stick" />
              <span className="lever-base" />
            </button>
            <span className="lever-label">KÉO CẦN</span>
          </div>
        </div>

        <div className="slot-lcd">
          <span>LƯỢT QUAY: {spins}</span>
          <span>TRÚNG LỚN: {jackpots}</span>
        </div>

        <div className="stop-row">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              type="button"
              className="stop-btn"
              disabled={!spinning || reelModes[i] !== 'spin'}
              onClick={() => stopReel(i)}
            >
              DỪNG<small>{i + 1}</small>
            </button>
          ))}
        </div>

        <button type="button" className="btn-shiny btn-gold spin-btn" onClick={spin} disabled={spinning}>
          {spinning ? '🌀 ĐANG QUAY…' : '🎰 QUAY'}
        </button>

        <p className="slot-msg" role="status">{msg}</p>

        {result && (
          <div className="slot-wish">
            <span className="jackpot-tag">
              {result.type === 'jackpot' ? `🏆 JACKPOT ${result.symbol}${result.symbol}${result.symbol} 🏆` : `🎁 TRÚNG NHỎ ${result.symbol}`}
            </span>
            {result.wish}
            <div style={{ marginTop: 10 }}>
              <button type="button" className="btn-shiny" onClick={copyWish}>📋 CHÉP LỜI CHÚC</button>
              <button type="button" className="btn-shiny btn-gold" onClick={exportWish}>🎁 LẤY ẢNH LỜI CHÚC</button>
            </div>
            {copyNote && <p className="gift-note">{copyNote}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
