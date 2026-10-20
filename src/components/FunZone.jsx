// ===== Khu vui chơi sến hài: Đo Độ Sến · Bói Hoa · Bằng Khen · Phong Bao =====
import { useMemo, useState } from 'react';
import {
  FORTUNES_ELDER, FORTUNES_FUN, METER_VERDICTS, CERTIFICATES, ENVELOPE_BLESSINGS,
} from '../data';
import { playPop, playSmallWin, playClick } from '../sounds';

function TackyMeter({ relInfo, recipientName }) {
  const [value, setValue] = useState(0);
  const [verdict, setVerdict] = useState('');
  const [scanning, setScanning] = useState(false);

  const role = relInfo.role; // 'con' | 'em' | 'tui'
  const label =
    role === 'con' ? 'ĐO ĐỘ SẾN CỦA CON' : role === 'em' ? 'ĐO ĐỘ SẾN CỦA EM' : 'ĐO ĐỘ SẾN CỦA TUI';

  const run = () => {
    playClick();
    setScanning(true);
    setVerdict(
      role === 'con'
        ? `Máy đang quét độ sến của con… ${recipientName} ngồi yên xinh đẹp chờ coi nè…`
        : role === 'em'
          ? `Máy đang quét độ sến của em… ${recipientName} đừng lén ghi sổ đầu bài nha…`
          : 'Máy đang quét độ sến… đứng yên xinh đẹp vào…'
    );
    setValue(8);
    setTimeout(() => {
      const v = 100 + Math.floor(Math.random() * 101); // 100–200%
      setValue(v);
      const list = METER_VERDICTS[role];
      const text = list[(Math.random() * list.length) | 0].replaceAll('{name}', recipientName);
      setVerdict(text);
      setScanning(false);
      playSmallWin();
    }, 1500);
  };

  return (
    <div className="fun-box">
      <h3>📏 MÁY ĐO ĐỘ SẾN</h3>
      <p className="desc">Đo thử coi mức độ sến của mình tới đâu — máy này không biết nói dối đâu!</p>
      <div className="meter-track"><div className="meter-fill" style={{ width: `${Math.min(value / 2, 100)}%` }} /></div>
      <p className="meter-result">{value > 0 ? `ĐỘ SẾN: ${value}%` : 'Chưa đo — bấm nút đi!'}</p>
      <p className="meter-verdict">{verdict}</p>
      <button type="button" className="btn-shiny" onClick={run} disabled={scanning}>
        {scanning ? 'ĐANG QUÉT… 🌀' : `🌹 ${label}`}
      </button>
    </div>
  );
}

function FlowerFortune({ relInfo }) {
  const [fortune, setFortune] = useState(null);
  const elder = relInfo.id === 'me' || relInfo.id === 'cogiao';

  const draw = () => {
    playPop();
    const pool = elder ? FORTUNES_ELDER : FORTUNES_FUN;
    setFortune(pool[(Math.random() * pool.length) | 0]);
  };

  return (
    <div className="fun-box">
      <h3>🔮 BÓI HOA 20/10</h3>
      <p className="desc">
        {elder
          ? 'Rút quẻ hoa xem vận mệnh: toàn quẻ sức khỏe, con cháu sum vầy — hợp người lớn tuổi nè!'
          : 'Rút quẻ hoa phán vận mệnh sến: nghe cho vui, tin thì… càng vui!'}
      </p>
      <div className="fortune-result">
        {fortune ? (
          <>
            <span className="f-flower">{fortune.flower}</span>
            {fortune.text}
          </>
        ) : (
          'Chưa rút quẻ nào hết — hoa đang chờ người hữu duyên… 🌼'
        )}
      </div>
      <button type="button" className="btn-shiny btn-green" onClick={draw}>🌸 RÚT QUẺ HOA</button>
    </div>
  );
}

function Certificates({ relInfo, recipientName, role }) {
  const [idx, setIdx] = useState(0);
  const list = CERTIFICATES[relInfo.id] || CERTIFICATES.banthan;
  const cert = list[idx % list.length];

  const issue = () => {
    playSmallWin();
    setIdx((i) => i + 1);
  };

  return (
    <div className="fun-box">
      <h3>🏆 BẰNG KHEN TREO TƯỜNG</h3>
      <p className="desc">Cấp bằng khen sến chính hãng — đóng khung vàng, mang treo tường được luôn!</p>
      <div className="certificate">
        <p className="cert-head">✦ BẰNG KHEN ✦</p>
        <p className="cert-title">{cert.title}</p>
        <p className="desc" style={{ margin: 0 }}>Trao tặng</p>
        <p className="cert-name script-font">{recipientName}</p>
        <p className="cert-note">{cert.note}</p>
        <p className="cert-seal">🏅</p>
        <p className="cert-note">
          {role === 'con' ? 'Con ký tên (đã đóng dấu bằng trái tim ❤️)' : role === 'em' ? 'Em ký tên (kèm lời hứa ngoan ❤️)' : 'Ký tên: người tặng sến nhất quả đất ❤️'}
        </p>
      </div>
      <button type="button" className="btn-shiny btn-gold" onClick={issue} style={{ marginTop: 14 }}>
        🏆 CẤP BẰNG KHEN CHO {recipientName.toUpperCase()}
      </button>
    </div>
  );
}

function Envelope() {
  const [opened, setOpened] = useState(false);
  const [blessing, setBlessing] = useState('');

  const open = () => {
    playPop();
    setOpened(true);
    setBlessing(ENVELOPE_BLESSINGS[(Math.random() * ENVELOPE_BLESSINGS.length) | 0]);
  };

  return (
    <div className="fun-box">
      <h3>🧧 PHONG BAO LỜI CHÚC</h3>
      <p className="desc">Phong bao đỏ thắm chứa lời chúc may mắn — bấm vào bao để mở coi trong có gì!</p>
      <div className="envelope" onClick={open} role="button" aria-label="Mở phong bao lời chúc" title="Bấm để mở phong bao">
        <span className="env-fu">福</span>
      </div>
      <p className="env-blessing">
        {opened ? blessing : 'Bao còn niêm phong nè… bấm vào chữ Phúc để mở nha! 👆'}
      </p>
      {opened && (
        <button type="button" className="btn-shiny" onClick={open}>🧧 MỞ BAO KHÁC</button>
      )}
    </div>
  );
}

export default function FunZone({ relInfo, recipientName }) {
  const role = useMemo(() => relInfo.role, [relInfo]);
  return (
    <section className="section" id="khu-vui-choi">
      <h2 className="section-title">🎪 KHU VUI CHƠI SẾN HÀI 🎪</h2>
      <p className="section-desc">
        {role === 'con'
          ? `Khu này con xưng "con" với ${recipientName} cho đúng lễ phép nè!`
          : role === 'em'
            ? `Khu này em xưng "em" với ${recipientName} cho đúng vai học trò nè!`
            : 'Đo sến, bói hoa, nhận bằng khen, mở phong bao — chơi mệt nghỉ luôn!'}
      </p>
      <div className="fun-grid">
        <TackyMeter relInfo={relInfo} recipientName={recipientName} />
        <FlowerFortune relInfo={relInfo} />
        <Certificates relInfo={relInfo} recipientName={recipientName} role={role} />
        <Envelope />
      </div>
    </section>
  );
}
