// ===== Cổng chào: hỏi thông tin người nhận trước khi mở thiệp =====
import { useState } from 'react';
import { RELATIONSHIPS, STYLES } from '../data';
import { playClick } from '../sounds';

export default function Gate({ onOpen, onSkip }) {
  const [name, setName] = useState('');
  const [rel, setRel] = useState('me');
  const [style, setStyle] = useState('sen');

  const handleOpen = () => {
    playClick();
    onOpen({ name: name.trim(), rel, style });
  };

  return (
    <div className="gate-overlay">
      <div className="gate-card">
        <p className="gate-sub">🌺💐🌺🥀❤️🪷</p>
        <h2 className="gate-title">CHÚC MỪNG 20/10</h2>
        <p className="gate-sub">🌹🩵🌷🌻🪻❤️‍🔥🐍</p>

        <p className="gate-q">✍️ Thiệp này tặng cho ai nè? (ghi tên người nhận)</p>
        <input
          className="gate-input"
          type="text"
          maxLength={40}
          placeholder="Ví dụ: Mẹ Hường, Cô Lan, bé Na…"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p className="gate-q">💝 Người ấy là ai của bạn?</p>
        <div className="chip-row">
          {RELATIONSHIPS.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`chip${rel === r.id ? ' selected' : ''}`}
              onClick={() => { setRel(r.id); playClick(); }}
            >
              {r.emoji} {r.label}
            </button>
          ))}
        </div>

        <p className="gate-q">🎨 Gu nhận thiệp của người ấy?</p>
        <div className="chip-row">
          {STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`chip${style === s.id ? ' selected' : ''}`}
              onClick={() => { setStyle(s.id); playClick(); }}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        <button type="button" className="btn-shiny gate-open-btn" onClick={handleOpen}>
          💐 MỞ THIỆP NGAY 💐
        </button>
        <br />
        <button type="button" className="gate-skip" onClick={onSkip}>
          lười điền quá, cho coi lén trước đi 👀
        </button>
      </div>
    </div>
  );
}
