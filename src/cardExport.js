// ===== Vẽ thiệp / lời chúc ra canvas PNG để "trao tặng" =====

async function ensureFonts() {
  try {
    await Promise.race([
      Promise.all([
        document.fonts.load('900 90px "Baloo 2"'),
        document.fonts.load('700 24px "Be Vietnam Pro"'),
        document.fonts.load('400 60px "Dancing Script"'),
      ]),
      new Promise((res) => setTimeout(res, 1800)),
    ]);
  } catch (_) { /* dùng font dự phòng */ }
}

function download(canvas, filename) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }, 'image/png');
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Vẽ thiệp riêng 1080×1440: nền hồng, khung vàng hai lớp, chữ vàng viền xanh lá
export async function renderCardPng({ name, callName, wish }) {
  await ensureFonts();
  const W = 1080, H = 1440;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Nền hồng gradient
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#ffd6e8'); bg.addColorStop(0.55, '#ff9ecf'); bg.addColorStop(1, '#ff5fa2');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  // Hoa trang trí góc (emoji)
  ctx.font = '110px serif'; ctx.textAlign = 'center';
  ctx.fillText('🌹', 110, 200); ctx.fillText('🌺', W - 110, 200);
  ctx.fillText('🪷', 110, H - 150); ctx.fillText('🌷', W - 110, H - 150);
  ctx.font = '64px serif';
  ctx.fillText('✨', 230, 150); ctx.fillText('✨', W - 230, 150);
  ctx.fillText('💐', W / 2, 165);

  // Khung vàng hai lớp
  ctx.lineWidth = 14; ctx.strokeStyle = '#ffd700'; ctx.strokeRect(36, 36, W - 72, H - 72);
  ctx.lineWidth = 5; ctx.strokeStyle = '#b8860b'; ctx.strokeRect(66, 66, W - 132, H - 132);
  ctx.lineWidth = 3; ctx.strokeStyle = '#fff3a0'; ctx.strokeRect(46, 46, W - 92, H - 92);

  // Tiêu đề vàng viền xanh lá
  ctx.textAlign = 'center';
  ctx.font = '900 104px "Baloo 2", sans-serif';
  ctx.lineWidth = 10; ctx.strokeStyle = '#0a7a34';
  ctx.strokeText('CHÚC MỪNG 20/10', W / 2, 320);
  ctx.fillStyle = '#ffee00';
  ctx.fillText('CHÚC MỪNG 20/10', W / 2, 320);

  // Tên người nhận
  ctx.font = '700 54px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = '#a1004d';
  ctx.fillText(`Gửi ${callName} — ${name}`, W / 2, 440);

  // Lời chúc (xuống dòng vừa khung)
  ctx.font = '400 40px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = '#6d1040';
  const lines = wrapText(ctx, wish, W - 240);
  let y = 540;
  for (const ln of lines) {
    if (y > H - 320) break;
    ctx.fillText(ln, W / 2, y);
    y += 62;
  }

  // Chữ ký
  ctx.font = '400 72px "Dancing Script", cursive';
  ctx.fillStyle = '#d1005f';
  ctx.fillText('Thương nhiều lắm! ❤️', W / 2, H - 160);

  download(canvas, 'thiep-20-10.png');
}

// Vẽ lời chúc xổ được ra ảnh PNG
export async function renderWishPng(wish, symbol = '🌹') {
  await ensureFonts();
  const W = 1080, H = 1000;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#fff3d1'); bg.addColorStop(1, '#ffd6e8');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  ctx.lineWidth = 12; ctx.strokeStyle = '#ffd700'; ctx.strokeRect(30, 30, W - 60, H - 60);
  ctx.lineWidth = 4; ctx.strokeStyle = '#b8860b'; ctx.strokeRect(54, 54, W - 108, H - 108);

  ctx.textAlign = 'center';
  ctx.font = '150px serif';
  ctx.fillText(symbol, W / 2, 240);
  ctx.font = '900 72px "Baloo 2", sans-serif';
  ctx.lineWidth = 8; ctx.strokeStyle = '#b0003f';
  ctx.fillStyle = '#ffee00';
  ctx.strokeText('LỜI CHÚC 20/10', W / 2, 380);
  ctx.fillText('LỜI CHÚC 20/10', W / 2, 380);

  ctx.font = '400 42px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = '#6d1040';
  const lines = wrapText(ctx, wish, W - 220);
  let y = 500;
  for (const ln of lines) {
    if (y > H - 120) break;
    ctx.fillText(ln, W / 2, y);
    y += 66;
  }

  download(canvas, 'loi-chuc-20-10.png');
}
