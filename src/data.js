// ===== Dữ liệu nội dung sến súa cho web chúc 20/10 =====

export const RELATIONSHIPS = [
  { id: 'me', label: 'Mẹ iu', emoji: '👩‍👧', role: 'con', callName: 'Mẹ' },
  { id: 'cogiao', label: 'Cô giáo', emoji: '👩‍🏫', role: 'em', callName: 'Cô' },
  { id: 'chiem', label: 'Chị–em gái', emoji: '👭', role: 'tui', callName: 'Chị em' },
  { id: 'banthan', label: 'Bạn thân', emoji: '💃', role: 'tui', callName: 'Bạn' },
  { id: 'crush', label: 'Người thương–crush', emoji: '💘', role: 'tui', callName: 'Người thương' },
];

export const STYLES = [
  { id: 'sen', label: 'Sến chảy nước', emoji: '🌹' },
  { id: 'hai', label: 'Hài xỉu', emoji: '😂' },
  { id: 'ngot', label: 'Ngọt lịm tim', emoji: '🍯' },
];

// Lời chúc theo (đối tượng × gu) — dùng cho thiệp riêng
export const PERSONAL_WISHES = {
  me: {
    sen: (name) =>
      `Gửi ${name} — Mẹ iu của con! 🌹 Nhân ngày 20/10, con chúc Mẹ luôn mạnh khỏe, trẻ đẹp mãi không già, cười tươi như hoa nở bốn mùa. Mẹ là bông hoa đẹp nhất đời con, là nắng ấm sưởi cả nhà mình. Con yêu Mẹ nhiều lắm, yêu nhất trên đời luôn á! ❤️`,
    hai: (name) =>
      `Gửi ${name} — Mẹ iu của con! 😂 20/10 con chúc Mẹ: ăn ngon ngủ khỏe, da đẹp dáng xinh, tiền lì xì nhận hoài không hết (từ con cái nha 😆). Mẹ cứ việc xinh đẹp, cả thế giới để con lo! Yêu Mẹ nhất nhà, không ai tranh được đâu! 💐`,
    ngot: (name) =>
      `Gửi ${name} — Mẹ iu của con! 🍯 20/10 này, con chỉ muốn nói: cảm ơn Mẹ vì tất cả. Chúc Mẹ iu luôn bình an, hạnh phúc, mỗi ngày đều ngọt ngào như mật ong. Trong tim con, Mẹ mãi là người phụ nữ tuyệt vời nhất. Con thương Mẹ! 🪷`,
  },
  cogiao: {
    sen: (name) =>
      `Kính gửi ${name} — Cô giáo kính yêu của em! 🌹 Nhân ngày 20/10, em chúc Cô luôn mạnh khỏe, trẻ trung, mãi là đóa hoa rực rỡ nhất trong vườn hoa tri thức. Công ơn dạy dỗ của Cô, em khắc ghi suốt đời. Em cảm ơn Cô nhiều lắm ạ! ❤️`,
    hai: (name) =>
      `Kính gửi ${name} — Cô giáo của em! 😂 20/10 em chúc Cô: chấm bài nhanh như gió mà vẫn vui, học trò ngoan hết phần thiên hạ (trong đó có em, hứa luôn 🤞). Cô cứ xinh đẹp rạng ngời, sổ đầu bài để em lo… à thôi, em chúc Cô sức khỏe là chính ạ! 💐`,
    ngot: (name) =>
      `Kính gửi ${name} — Cô giáo của em! 🍯 Ngày 20/10, em chúc Cô luôn an yên, hạnh phúc và ngập tràn niềm vui. Mỗi bài giảng của Cô là một hạt giống ngọt lành gieo vào tim em. Em biết ơn Cô thật nhiều! 🪷`,
  },
  chiem: {
    sen: (name) =>
      `Gửi ${name} — chị em gái của tui! 🌹 20/10 chúc chị/em luôn xinh đẹp như hoa hậu, duyên dáng như hoa sen, tiền vào như nước, tình duyên đỏ như hoa hồng. Chị em mình mãi là cặp đôi hoàn hảo nhất nhà nha! ❤️`,
    hai: (name) =>
      `Gửi ${name} — chị em gái của tui! 😂 Chúc mừng 20/10: chúc nhan sắc thăng hạng vù vù, ví tiền phình to đều đều, còn cân nặng thì… mình đừng nhắc tới ha 😆. Xinh đẹp là chân lý, chị em mình cứ thế mà phát huy! 💐`,
    ngot: (name) =>
      `Gửi ${name} — chị em gái của tui! 🍯 20/10 ngọt ngào nha! Chúc chị/em luôn được yêu thương, chiều chuộng, mỗi ngày đều vui như Tết. Dù có chuyện gì, tui vẫn luôn ở đây làm đồng minh trọn đời! 🪷`,
  },
  banthan: {
    sen: (name) =>
      `Gửi ${name} — bạn thân của tui! 🌹 20/10 chúc bạn luôn rạng rỡ như đóa hướng dương hướng về mặt trời, xinh đẹp, may mắn và hạnh phúc ngập tràn. Tình bạn của tụi mình là bông hoa không bao giờ tàn! ❤️`,
    hai: (name) =>
      `Gửi ${name} — bạn thân của tui! 😂 Chúc mừng 20/10 nè: chúc bạn đẹp không cần filter, giàu không cần vay, yêu không cần năn nỉ 😆. Còn độc thân thì để tui lo giới thiệu, mà ế bền vững thì tụi mình già cùng nhau cũng vui! 💐`,
    ngot: (name) =>
      `Gửi ${name} — bạn thân của tui! 🍯 20/10 thiệt ngọt ngào nha bạn iu. Chúc bạn luôn được đối xử dịu dàng như cách bạn đối xử với mọi người. Cảm ơn vì đã luôn ở bên tui, mãi là tri kỷ nha! 🪷`,
  },
  crush: {
    sen: (name) =>
      `Gửi ${name} — người thương của tui! 🌹 20/10 này, tui chỉ muốn nói: bạn là đóa hoa đẹp nhất trong khu vườn lòng tui. Chúc bạn luôn xinh đẹp, rạng ngời và hạnh phúc — và nếu được, cho tui cơ hội là người chăm hoa mỗi ngày nha! ❤️‍🔥`,
    hai: (name) =>
      `Gửi ${name} — người thương–crush của tui! 😂 Chúc mừng 20/10! Chúc bạn xinh đẹp xuất sắc như mọi ngày (hôm nay còn xuất sắc hơn). Tui không có gì nhiều, chỉ có bó hoa sến với trái tim đập thình thịch mỗi lần thấy bạn thôi, nhận không? 💐`,
    ngot: (name) =>
      `Gửi ${name} — người thương của tui! 🍯 20/10 ngọt lịm tim nha. Chúc bạn mỗi ngày đều được yêu thương đúng cách, và mong rằng trong những ngày ngọt ngào đó… có tui góp mặt một chút. Thương nhiều lắm á! 🪷`,
  },
};

// Lời chúc của từng biểu tượng trên máy pachislot
export const SLOT_SYMBOLS = ['🌹', '🪷', '🌻', '🌺', '🌷', '🔔', '🐱', '💎'];

export const SLOT_WISHES = {
  '🌹':
    'Hoa hồng đỏ thắm như tình cảm của tui: chúc em 20/10 rực rỡ, được yêu thương chiều chuộng hết nấc, xinh đẹp không ai sánh bằng! 🌹',
  '🪷':
    'Hoa sen trong bùn mà chẳng hôi tanh mùi bùn: chúc em luôn thanh tao, bình an, tâm hồn thơm ngát như sen giữa hồ mùa hạ! 🪷',
  '🌻':
    'Hướng dương luôn hướng về mặt trời: chúc em 20/10 vui tươi, may mắn nối tiếp may mắn, cười tươi như nắng ban mai! 🌻',
  '🌺':
    'Hoa dâm bụt đỏ rực cả góc trời: chúc em mãi trẻ trung, nhiệt huyết, đi tới đâu là sáng bừng tới đó, ai gặp cũng thương! 🌺',
  '🌷':
    'Tulip dịu dàng mà kiêu sa: chúc em 20/10 ngọt ngào, được nâng niu như công chúa, tình duyên đỏ thắm như hoa mới nở! 🌷',
  '🔔':
    'Chuông vàng leng keng báo tin vui: chúc em sắp tới tin tốt gõ cửa liên tục, tiền vô như nước, việc gì cũng hanh thông! 🔔',
  '🐱':
    'Mèo ngậm hoa — quẻ hiếm nhất máy: chúc em 20/10 gặp toàn điều dễ thương, có người thương thầm lặng lẽ tặng hoa như mèo nhà tui vậy! 🐱',
  '💎':
    'Kim cương sáng chói: chúc em mãi là viên ngọc quý trong mắt mọi người, sự nghiệp thăng hoa, ví tiền lấp lánh như kim cương! 💎',
};

// Bói hoa — quẻ cho người lớn tuổi (Mẹ / Cô giáo)
export const FORTUNES_ELDER = [
  { flower: '🌺 Hoa Dâm Bụt', text: 'Quẻ đại cát: sức khỏe dồi dào, ăn ngon ngủ yên, con cháu sum vầy đầy nhà, tiếng cười vang khắp sân!' },
  { flower: '🪷 Hoa Sen', text: 'Quẻ thanh cao: tâm an vạn sự an, bệnh tật tránh xa ba cây số, phúc đức dày như cánh sen nở rộ.' },
  { flower: '🌻 Hoa Hướng Dương', text: 'Quẻ hỷ sự: sắp có tin vui về con cháu, nhà cửa thêm người thêm của, mặt trời may mắn chiếu thẳng vào nhà mình!' },
  { flower: '🌹 Hoa Hồng', text: 'Quẻ trường thọ: phúc như Đông Hải trường lưu, thọ tỷ Nam Sơn bất lão — cứ vui khỏe là con cháu mừng nhất!' },
  { flower: '🌷 Hoa Tulip', text: 'Quẻ an khang: năm nay đi đâu cũng gặp người tốt, làm gì cũng thuận buồm xuôi gió, tiền hưu + tiền lì xì đều đều.' },
  { flower: '🐱 Mèo Ngậm Hoa (quẻ hiếm!)', text: 'QUẺ HIẾM NHẤT: bé mèo đích thân rút quẻ này đó! Vận may nhân đôi, sắp có cháu/chắt hoặc tin vui lớn trong nhà, linh lắm nha!' },
];

// Bói hoa — quẻ vui cho các đối tượng còn lại
export const FORTUNES_FUN = [
  { flower: '🌺 Hoa Dâm Bụt', text: 'Quẻ đỏ rực: sắp có người mời đi ăn, mà người đó… có ý đồ dễ thương với bạn đó nha!' },
  { flower: '🪷 Hoa Sen', text: 'Quẻ trong trẻo: crush đang để ý bạn nhiều hơn bạn tưởng, cứ tự tin tỏa hương đi!' },
  { flower: '🌻 Hoa Hướng Dương', text: 'Quẻ nắng vàng: tuần này may mắn bủa vây, đặc biệt là đường ăn uống và đường… ví tiền.' },
  { flower: '🌹 Hoa Hồng', text: 'Quẻ tình duyên: một bó hoa đang trên đường tới với bạn. Người gửi là ai thì… bí mật mới vui!' },
  { flower: '🌷 Hoa Tulip', text: 'Quẻ ngọt ngào: ai đó sắp tỏ tình bằng cách sến nhất có thể. Chuẩn bị tinh thần xỉu ngang!' },
  { flower: '💐 Bó Hoa Tổng Hợp', text: 'Quẻ đại hỷ: vừa có tiền, vừa có tình, vừa được khen xinh. Hôm nay là ngày của bạn, không cãi được!' },
  { flower: '🐍 Rắn Ngậm Hoa (quẻ lạ!)', text: 'QUẺ LẠ: bé rắn góp vui — sắp gặp quý nhân tuổi Tỵ, hoặc một cơ hội "trườn" tới bất ngờ. Nắm bắt liền tay!' },
];

// Phán quyết của Máy Đo Độ Sến theo vai xưng hô
export const METER_VERDICTS = {
  con: [
    'ĐỨA CON SẾN NHẤT NHÀ — tại {name} nuôi con khéo quá mà!',
    'Độ sến của con vượt trần nhà rồi {name} ơi, hàng xóm nghe thấy hết!',
    'Con sến cỡ này là do gen của {name} truyền lại đó, chối không được đâu!',
    'PHÁ VỠ MỌI GIỚI HẠN — con xin trao danh hiệu "nguồn sến" cho {name} ạ!',
  ],
  em: [
    'HỌC TRÒ SẾN NHẤT LỚP — xin {name} đừng ghi sổ đầu bài tội em!',
    'Độ sến của em làm {name} phải lấy kính ra lau vì xúc động quá!',
    'Em sến tới mức bài kiểm tra cũng muốn thành thơ tình gửi {name}!',
    'VƯỢT CHUẨN ĐẦU RA — {name} dạy sao mà học trò sến dữ vậy nè!',
  ],
  tui: [
    'CHÚA TỂ SẾN SÚA — sến tới mức hoa cũng phải ghen tị!',
    'Độ sến phá vỡ mọi giới hạn, máy đo xin đầu hàng!',
    'Sến chảy nước thành sông, cá còn phải bơi tránh!',
    'CẤP ĐỘ HUYỀN THOẠI — sến là chân lý, không cần kiểm chứng!',
  ],
};

// Bằng khen theo đối tượng
export const CERTIFICATES = {
  me: [
    { title: 'NGƯỜI MẸ VĨ ĐẠI NHẤT MỌI THỜI ĐẠI', note: 'Vì thành tích: yêu thương con vô điều kiện, nấu ăn ngon nhất vũ trụ, tìm đồ thất lạc nhanh hơn cả Google.' },
    { title: 'HOA HẬU CỦA CẢ NHÀ', note: 'Trao tặng người phụ nữ xinh đẹp nhất nhà — đẹp từ trong bếp ra tới phòng khách, không đối thủ.' },
  ],
  cogiao: [
    { title: 'CÔ GIÁO DỊU DÀNG NHẤT HỆ MẶT TRỜI', note: 'Vì thành tích: gieo tri thức bằng cả trái tim, điểm 10 cho sự kiên nhẫn và nụ cười tỏa nắng.' },
    { title: 'NHÀ GIÁO VÀNG TRONG LÀNG TRI THỨC', note: 'Bằng khen danh dự trao cho người lái đò tận tụy nhất, học trò khắp nơi đều nhớ ơn.' },
  ],
  chiem: [
    { title: 'CHỊ EM GÁI XINH ĐẸP NHẤT KHU PHỐ', note: 'Vì thành tích: xinh đẹp bất chấp camera thường, keo sơn gắn bó số 1 nhà mình.' },
    { title: 'CÔNG CHÚA CỦA GIA ĐÌNH', note: 'Trao tặng đóa hoa được cả nhà cưng chiều nhất — hôm nay và mãi mãi.' },
  ],
  banthan: [
    { title: 'BẠN THÂN QUỐC DÂN', note: 'Vì thành tích: có mặt mọi lúc bạn cần, giữ bí mật như két sắt, cười cùng khóc cùng.' },
    { title: 'TRI KỶ VÀNG 24K', note: 'Danh hiệu cao quý nhất làng tình bạn — không ai thay thế được, chấm hết.' },
  ],
  crush: [
    { title: 'NGƯỜI THƯƠNG ĐẸP NHẤT LÒNG TUI', note: 'Vì thành tích: làm tim tui đập loạn nhịp 24/7, nụ cười gây thương nhớ cấp độ báo động đỏ.' },
    { title: 'ĐÓA HOA GÂY XỈU NGANG', note: 'Trao tặng người chỉ cần xuất hiện là cả khung cảnh tự động chuyển sang chế độ slow-motion.' },
  ],
};

// Phong bao lời chúc
export const ENVELOPE_BLESSINGS = [
  '🧧 Phúc như Đông Hải trường lưu, thọ tỷ Nam Sơn bất lão — chúc mừng 20/10 an khang thịnh vượng!',
  '🧧 Mở bao ra là thấy lộc: bệnh tật tự động né xa ba cây số, niềm vui xếp hàng gõ cửa mỗi ngày!',
  '🧧 Chúc mừng 20/10! Tiền vào như nước sông Đà, tiền ra nhỏ giọt như cà phê phin — dư dả quanh năm!',
  '🧧 Bao lì xì đỏ thắm tặng người thương: chúc xinh đẹp như hoa, hạnh phúc như Tết, may mắn như trúng số!',
  '🧧 Vạn sự như ý — tỷ sự như mơ — triệu triệu bất ngờ — ngàn lần hạnh phúc! Chúc mừng 20/10!',
];

// 4 tấm thiệp có sẵn
export const GREETING_CARDS = [
  {
    to: 'Mẹ',
    emoji: '👩‍👧🌹',
    color: 'pink',
    wish: 'Chúc Mẹ 20/10 thật nhiều sức khỏe, luôn cười tươi như hoa. Con yêu Mẹ nhất trên đời, cảm ơn Mẹ vì tất cả những hy sinh thầm lặng!',
  },
  {
    to: 'Cô giáo',
    emoji: '👩‍🏫🪷',
    color: 'purple',
    wish: 'Kính chúc Cô 20/10 an vui, mạnh khỏe. Công ơn Cô như biển rộng trời cao, học trò xin khắc ghi mãi không quên!',
  },
  {
    to: 'Chị em',
    emoji: '👭🌺',
    color: 'orange',
    wish: 'Chúc chị em 20/10 xinh đẹp rạng ngời, tiền đầy túi tình đầy tim, muốn gì được nấy, mãi là đóa hoa rực rỡ nhất!',
  },
  {
    to: 'Người thương',
    emoji: '💘🌷',
    color: 'red',
    wish: 'Chúc người thương 20/10 ngọt ngào như mật. Mong mỗi ngày của bạn đều có hoa, có nắng, và có tui ở bên cạnh!',
  },
];

// Lời chúc xoay vòng
export const ROTATING_WISHES = [
  'Chúc em xinh như hoa hồng, thơm như hoa huệ, trắng như hoa sen! 🌹',
  '20-10 vui vẻ! Ăn ngon, ngủ ngon, da đẹp, dáng xinh! 💐',
  'Chúc các chị em: tiền đầy túi, tình đầy tim, hoa đầy nhà! ❤️',
  'Mãi mãi tuổi 18 nhé em ơi — xinh đẹp bất chấp thời gian! 🥀',
  'RẤT TUYỆT VỜI! Tặng hoa em nhé — cả vườn luôn cũng được! 🌺',
  'Đêm muộn chúc ngủ ngon, mơ đẹp nhé — mơ thấy toàn hoa là hoa! 🌙',
];

// Bong bóng thoại của bé mèo
export const CAT_BUBBLES = [
  'Meo~ Chúc mừng 20/10! 🌹',
  'Tặng hoa nè, nhận đi meo~ 💐',
  'Bạn xinh như hoa vậy á! 🌺',
  'Meo meo~ mãi tuổi 18 nha! ✨',
  '20/10 vui vẻ, meo chúc thiệt đó! ❤️',
  'Bấm vào tui là hoa nổ đó meo~ 🌷',
  'Phúc như Đông Hải nha meo! 🧧',
];

export const SNAKE_LINES = [
  '🐍 Bé rắn ngậm hoa xin chúc: 20/10 thật là rực rỡ, xinh đẹp "hiss" hết nấc luôn nha!',
  '🐍 Rắn này không cắn, rắn này chỉ tặng hoa thôi — chúc mừng ngày Phụ nữ Việt Nam!',
  '🐍 Trườn cả vườn hoa mới chọn được bông đẹp nhất, tặng người đẹp nhất luôn đó!',
];
