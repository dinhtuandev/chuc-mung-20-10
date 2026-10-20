// ===== Âm thanh bằng WebAudio (không cần file nhạc) =====

let ctx = null;

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, start, dur, type = 'sine', gainVal = 0.12) {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = ac.currentTime + start;
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(gainVal, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

// Tiếng "ting" khi bóng chạm đinh / cuộn dừng
export function playTing() {
  tone(1560 + Math.random() * 500, 0, 0.12, 'triangle', 0.08);
}

// Tiếng click nhẹ
export function playClick() {
  tone(880, 0, 0.08, 'square', 0.05);
}

// Tiếng "meo" — quét tần số lên xuống như mèo kêu
export function playMeow() {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'sawtooth';
  const t0 = ac.currentTime;
  osc.frequency.setValueAtTime(620, t0);
  osc.frequency.exponentialRampToValueAtTime(980, t0 + 0.14);
  osc.frequency.exponentialRampToValueAtTime(430, t0 + 0.42);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(0.06, t0 + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.48);
  // Lọc bớt chói cho giống tiếng mèo hơn
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1600;
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + 0.55);
}

// Nhạc jackpot — đoạn arpeggio vui nhộn
export function playJackpot() {
  const notes = [523, 659, 784, 1047, 784, 1047, 1319, 1568];
  notes.forEach((n, i) => tone(n, i * 0.11, 0.22, 'triangle', 0.11));
  tone(2093, notes.length * 0.11, 0.5, 'triangle', 0.09);
}

// Vài nốt vui khi trúng nhỏ
export function playSmallWin() {
  [660, 880, 1100].forEach((n, i) => tone(n, i * 0.09, 0.16, 'triangle', 0.09));
}

// Tiếng phong bao mở / giấy xột xoạt giả lập bằng nốt trầm
export function playPop() {
  tone(300, 0, 0.1, 'square', 0.07);
  tone(520, 0.06, 0.12, 'triangle', 0.08);
}
