// ===== Thiệp riêng theo người nhận + cơ chế trao tặng (ảnh PNG / in giấy) =====
import { useState } from 'react';
import { PERSONAL_WISHES } from '../data';
import { renderCardPng } from '../cardExport';
import { playClick } from '../sounds';

export function PaperCard({ name, callName, wish, signLine }) {
  return (
    <div className="paper-card">
      <p className="pc-flowers">🌹💐🪷💐🌹</p>
      <p className="pc-title">CHÚC MỪNG 20/10</p>
      <p className="pc-to">Gửi {callName} — {name}</p>
      <p className="pc-wish">{wish}</p>
      <p className="pc-sign">{signLine}</p>
    </div>
  );
}

export default function PersonalCard({ recipient, relInfo, onChangePerson }) {
  const [note, setNote] = useState('');
  const [showPrint, setShowPrint] = useState(false);

  const wish = PERSONAL_WISHES[recipient.rel][recipient.style](recipient.name);
  const signLine =
    relInfo.id === 'me'
      ? 'Con của Mẹ ❤️'
      : relInfo.id === 'cogiao'
        ? 'Học trò của Cô ❤️'
        : 'Thương nhiều lắm! ❤️';

  const handleImage = async () => {
    playClick();
    setNote('Đang vẽ thiệp thành ảnh nè… ⏳');
    await renderCardPng({ name: recipient.name, callName: relInfo.callName, wish });
    setNote(`Đã tải ảnh thiệp PNG về máy rồi nè! Gửi qua Zalo / Messenger cho ${recipient.name} liền tay đi 🎁`);
  };

  return (
    <section className="section" id="thiep-rieng">
      <h2 className="section-title">💌 THIỆP RIÊNG CỦA {recipient.name.toUpperCase()} 💌</h2>
      <p className="section-desc">Tấm thiệp viết riêng cho đúng người, đúng gu — không đụng hàng ai hết!</p>
      <div className="personal-card">
        <p className="personal-to">
          Gửi {recipient.name} — {relInfo.label} của {relInfo.role} {relInfo.emoji}
        </p>
        <p className="personal-wish">{wish}</p>
        <p className="personal-sign script-font">{signLine}</p>
        <div>
          <button type="button" className="btn-shiny btn-gold" onClick={handleImage}>
            🎁 LẤY THIỆP THÀNH ẢNH
          </button>
          <button
            type="button"
            className="btn-shiny btn-green"
            onClick={() => { playClick(); setShowPrint(true); }}
          >
            🖨️ IN THIỆP RA GIẤY
          </button>
          <button type="button" className="btn-shiny" onClick={onChangePerson}>
            🔄 ĐỔI NGƯỜI NHẬN KHÁC
          </button>
        </div>
        <p className="gift-note" role="status">{note}</p>
      </div>

      {/* Bản thiệp giấy ẩn — chỉ xuất hiện khi in */}
      <div className="print-sheet" aria-hidden="true">
        <PaperCard name={recipient.name} callName={relInfo.callName} wish={wish} signLine={signLine} />
      </div>

      {showPrint && (
        <div className="print-modal" role="dialog" aria-label="Xem trước bản in thiệp">
          <p className="pm-title">🖨️ BẢN IN THIỆP GIẤY 🖨️</p>
          <p className="pm-help">
            Đây là tấm thiệp giấy sạch sẽ — khi in ra chỉ có đúng tấm thiệp này trên khổ giấy,
            không dính nền hồng, mèo bay hay bé rắn gì hết. Bấm nút bên dưới rồi chọn máy in,
            hoặc bấm Ctrl+P (điện thoại: Chia sẻ → In).
          </p>
          <PaperCard name={recipient.name} callName={relInfo.callName} wish={wish} signLine={signLine} />
          <div style={{ marginTop: 20 }}>
            <button type="button" className="btn-shiny btn-gold" onClick={() => window.print()}>
              🖨️ IN NGAY
            </button>
            <button type="button" className="btn-shiny" onClick={() => setShowPrint(false)}>
              Đóng lại
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
