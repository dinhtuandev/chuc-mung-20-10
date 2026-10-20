import { useEffect, useMemo, useState } from 'react';
import Decor from './components/Decor';
import Gate from './components/Gate';
import PersonalCard from './components/PersonalCard';
import FlyingCat from './components/FlyingCat';
import Pachislot from './components/Pachislot';
import FunZone from './components/FunZone';
import { SnakeSection, CardsSection, InspoCorner } from './components/Sections';
import { RELATIONSHIPS } from './data';

export default function App() {
  const [gateOpen, setGateOpen] = useState(true);
  const [recipient, setRecipient] = useState(null);

  const relInfo = useMemo(
    () => RELATIONSHIPS.find((r) => r.id === (recipient?.rel || 'banthan')),
    [recipient]
  );

  // Khóa cuộn trang nền khi cổng chào đang mở
  useEffect(() => {
    document.body.classList.toggle('locked', gateOpen);
    return () => document.body.classList.remove('locked');
  }, [gateOpen]);

  const handleOpen = ({ name, rel, style }) => {
    const relObj = RELATIONSHIPS.find((r) => r.id === rel);
    setRecipient({ name: name || relObj.callName, rel, style });
    setGateOpen(false);
  };

  const handleSkip = () => {
    setRecipient({ name: 'Bạn thân', rel: 'banthan', style: 'hai' });
    setGateOpen(false);
  };

  return (
    <>
      <Decor />
      <FlyingCat />

      <main className="page">
        <header className="hero">
          <div className="hero-bouquet" aria-hidden="true">💐</div>
          <h1 className="mega-title display-font">RẤT TUYỆT VỜI</h1>
          <h2 className="hero-sub display-font">CHÚC MỪNG 20/10</h2>
          <p className="hero-note">🌹 Tặng hoa em nhé! 🌹 Ngày Phụ Nữ Việt Nam 🌹</p>
        </header>

        {recipient && (
          <PersonalCard
            recipient={recipient}
            relInfo={relInfo}
            onChangePerson={() => setGateOpen(true)}
          />
        )}

        <Pachislot />

        {recipient && <FunZone relInfo={relInfo} recipientName={recipient.name} />}

        <SnakeSection />
        <CardsSection />
        <InspoCorner />

        <p className="footer-note">
          💖 Được làm với 100% độ sến — chúc mừng 20/10, mãi mãi tuổi 18 nhé! 💖
        </p>
      </main>

      {gateOpen && <Gate onOpen={handleOpen} onSkip={handleSkip} />}
    </>
  );
}
