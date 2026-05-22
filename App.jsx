import { useEffect, useMemo, useState } from 'react';

const phone = '905369195896';
const instagram = 'ukrealtyistanbul';

const properties = [
  { id: 1, title: 'Boğaz Manzaralı Residence', location: 'Beşiktaş, İstanbul', price: '₺ 18.500.000', type: 'Satılık', category: 'Residence', beds: 3, baths: 2, sqm: 185, tag: 'Premium', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80' },
  { id: 2, title: 'Modern Penthouse Kadıköy', location: 'Kadıköy, İstanbul', price: '₺ 8.200 / Ay', type: 'Kiralık', category: 'Residence', beds: 2, baths: 1, sqm: 110, tag: 'Yeni', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80' },
  { id: 3, title: 'Luxury Villa Zekeriyaköy', location: 'Zekeriyaköy, İstanbul', price: '₺ 42.000.000', type: 'Satılık', category: 'Villa', beds: 5, baths: 4, sqm: 520, tag: 'Exclusive', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80' },
  { id: 4, title: 'Sarıyer Deniz Cepheli', location: 'Sarıyer, İstanbul', price: '₺ 24.750.000', type: 'Satılık', category: 'Residence', beds: 4, baths: 3, sqm: 240, tag: 'Yatırım', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80' },
  { id: 5, title: 'Levent Merkezi Ofis', location: 'Levent, İstanbul', price: '₺ 65.000 / Ay', type: 'Kiralık', category: 'Ticari', beds: 0, baths: 2, sqm: 380, tag: 'Ticari', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80' },
  { id: 6, title: 'Nişantaşı Butik Daire', location: 'Nişantaşı, İstanbul', price: '₺ 6.500.000', type: 'Satılık', category: 'Residence', beds: 1, baths: 1, sqm: 75, tag: 'Butik', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80' },
];

const services = [
  ['🏙️', 'Satılık Portföy Yönetimi', 'Mülkünüzü doğru fiyat, doğru sunum ve doğru hedef kitleyle satışa hazırlarız.'],
  ['🔑', 'Kiralama Danışmanlığı', 'Güvenilir kiracı seçimi, sözleşme süreci ve profesyonel takip desteği.'],
  ['📸', 'Profesyonel Sunum', 'Fotoğraf, video, ilan metni ve sosyal medya uyumlu portföy hazırlığı.'],
  ['📱', 'Sosyal Medya Reklamları', 'Instagram ve Meta reklamlarıyla portföyünüzü daha fazla alıcıya ulaştırırız.'],
  ['📊', 'Bölge & Fiyat Analizi', 'İstanbul odaklı piyasa analiziyle güçlü fiyatlandırma stratejisi oluştururuz.'],
  ['💎', 'Yatırım Danışmanlığı', 'Alım, satım ve kira getirisi odaklı gayrimenkul yatırım rehberliği.'],
];

const nav = [
  ['Ana Sayfa', 'hero'], ['Portföy', 'portfolio'], ['Hakkımızda', 'about'], ['Hizmetler', 'services'], ['Kazan-Kazan', 'winwin'], ['İletişim', 'contact'],
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function Logo() {
  return <button className="logo" onClick={() => scrollToId('hero')} aria-label="Ana sayfaya git"><span>UK</span><div><b>UK REALTY</b><small>ISTANBUL</small></div></button>;
}

function Modal({ property, onClose }) {
  useEffect(() => {
    if (!property) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [property, onClose]);
  if (!property) return null;
  return <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
    <article className="modal" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="Kapat">×</button>
      <img src={property.image} alt={`${property.title} görseli`} />
      <div className="modal-content">
        <p className="eyebrow">{property.type} · {property.category}</p>
        <h2>{property.title}</h2>
        <p className="muted">📍 {property.location}</p>
        <div className="modal-specs"><b>{property.price}</b><span>{property.sqm} m²</span><span>{property.beds} oda</span><span>{property.baths} banyo</span></div>
        <p>Modern mimarisi, güçlü konumu ve profesyonel sunum potansiyeliyle bu portföy hem oturum hem yatırım amaçlı değerlendirmeye uygundur. Detaylı bilgi ve randevu için bizimle iletişime geçebilirsiniz.</p>
        <div className="button-row"><a className="btn primary" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">WhatsApp ile Bilgi Al</a><button className="btn ghost" onClick={() => { onClose(); scrollToId('contact'); }}>Randevu Talep Et</button></div>
      </div>
    </article>
  </div>;
}

function ContactForm({ dark = false }) {
  const [sent, setSent] = useState(false);
  if (sent) return <div className={dark ? 'success success-dark' : 'success'}><b>Başvurunuz alındı.</b><p>Ekibimiz en kısa sürede sizinle iletişime geçecek.</p><button className="btn primary" onClick={() => setSent(false)}>Yeni Form Gönder</button></div>;
  return <form className={dark ? 'form dark-form' : 'form'} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
    <input required placeholder="Ad Soyad *" />
    <input required placeholder="Telefon *" />
    {!dark && <input placeholder="E-posta" type="email" />}
    {dark && <input placeholder="Gayrimenkul konumu" />}
    {dark && <select defaultValue=""><option value="" disabled>Satılık / Kiralık</option><option>Satılık</option><option>Kiralık</option></select>}
    {dark && <input placeholder="Tahmini fiyat" />}
    <textarea rows="4" placeholder={dark ? 'Portföy hakkında kısa bilgi...' : 'Mesajınız...'} />
    <button className={dark ? 'btn light' : 'btn primary'} type="submit">Gönder →</button>
  </form>;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState('Tümü');
  const [modal, setModal] = useState(null);
  const filtered = useMemo(() => filter === 'Tümü' ? properties : properties.filter((p) => p.type === filter || p.category === filter || p.tag === filter), [filter]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <>
    <header className={scrolled ? 'nav scrolled' : 'nav'}>
      <Logo />
      <nav className="desktop-nav">{nav.map(([label, id]) => <button key={id} onClick={() => scrollToId(id)}>{label}</button>)}</nav>
      <a className="phone" href={`tel:+${phone}`}>+90 536 919 58 96</a>
      <button className="hamburger" onClick={() => setMenu(!menu)} aria-label="Menü">☰</button>
    </header>
    {menu && <div className="mobile-menu">{nav.map(([label, id]) => <button key={id} onClick={() => { setMenu(false); scrollToId(id); }}>{label}</button>)}</div>}

    <main>
      <section id="hero" className="hero">
        <div className="blob one" /><div className="blob two" />
        <div className="hero-copy">
          <p className="eyebrow">İstanbul'un dijital emlak markası</p>
          <h1>İstanbul’da Yeni Nesil <em>Gayrimenkul Deneyimi</em></h1>
          <p>Satılık, kiralık ve yatırım amaçlı portföylerde modern pazarlama, güçlü sunum ve güvenilir danışmanlık.</p>
          <div className="button-row"><button className="btn primary" onClick={() => scrollToId('portfolio')}>Portföyleri İncele</button><button className="btn ghost" onClick={() => scrollToId('winwin')}>Portföyünü Paylaş</button><a className="btn whatsapp" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">WhatsApp</a></div>
        </div>
        <div className="hero-card" aria-label="Öne çıkan portföy kartı">
          <img src={properties[0].image} alt="UK Realty öne çıkan residence" />
          <div><span>Satılık</span><h3>{properties[0].title}</h3><p>{properties[0].location}</p><b>{properties[0].price}</b></div>
        </div>
      </section>

      <section className="trust-strip"><div><b>Dijital Portföy Pazarlama</b><span>Modern ilan ve sosyal medya sunumu</span></div><div><b>İstanbul Odaklı Hizmet</b><span>Bölge bilgisiyle doğru strateji</span></div><div><b>Profesyonel Sunum</b><span>Fotoğraf, video ve metin dili</span></div><div><b>Güvenilir Danışmanlık</b><span>Şeffaf ve sonuç odaklı süreç</span></div></section>

      <section id="portfolio" className="section gray">
        <div className="section-head"><p className="eyebrow">Portföy</p><h2>Seçkin <em>Mülkler</em></h2></div>
        <div className="filters">{['Tümü', 'Satılık', 'Kiralık', 'Residence', 'Villa', 'Premium'].map((f) => <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div>
        <div className="property-grid">{filtered.map((p) => <article className="property" key={p.id} onClick={() => setModal(p)}><div className="image-wrap"><img loading="lazy" src={p.image} alt={`${p.title} ilan görseli`} /><span>{p.type}</span></div><div><h3>{p.title}</h3><p>📍 {p.location}</p><b>{p.price}</b><div className="specs"><span>{p.sqm} m²</span><span>{p.beds} oda</span><span>{p.baths} banyo</span></div><button>Detayları Gör</button></div></article>)}</div>
      </section>

      <section id="about" className="section about"><div><img loading="lazy" src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80" alt="İstanbul şehir manzarası" /></div><div><p className="eyebrow">Hakkımızda</p><h2>İstanbul’un <em>Yeni Nesil</em> Emlak Markası</h2><p>UK Realty Istanbul, gayrimenkul alım, satım ve kiralama süreçlerini modern dijital pazarlama ile birleştiren yeni nesil bir emlak markasıdır.</p><p>Amacımız sadece ilan yayınlamak değil; her portföyü doğru sunum, doğru hedef kitle ve güvenilir danışmanlıkla sonuca ulaştırmaktır.</p><button className="btn primary" onClick={() => scrollToId('contact')}>Bizimle Tanışın</button></div></section>

      <section id="services" className="section sky"><div className="section-head"><p className="eyebrow">Hizmetler</p><h2>Sunduğumuz <em>Hizmetler</em></h2></div><div className="service-grid">{services.map(([icon, title, desc]) => <article className="service" key={title}><span>{icon}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

      <section id="winwin" className="section winwin"><div><p className="eyebrow light-text">Kazan-Kazan Sistemi</p><h2>Portföy Paylaş, <em>Kazanca Ortak Ol</em></h2><p>Çevrenizde satılık veya kiralık gayrimenkul varsa bizimle paylaşın. Süreç olumlu sonuçlandığında kazanç modelimizden faydalanın.</p><ol><li>Portföy bilgisini gönder</li><li>Ekibimiz değerlendirsin</li><li>Pazarlama süreci başlasın</li><li>İşlem sonuçlanınca kazanç sağla</li></ol></div><ContactForm dark /></section>

      <section id="contact" className="section contact"><div><p className="eyebrow">İletişim</p><h2>Hemen <em>İletişime</em> Geçin</h2><p>Satış, kiralama, yatırım veya portföy değerlendirmesi için bize ulaşın.</p><div className="contact-cards"><a href={`tel:+${phone}`}>📞 +90 536 919 58 96</a><a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">💬 WhatsApp ile Ulaş</a><a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer">📷 @{instagram}</a></div></div><ContactForm /></section>
    </main>

    <footer><Logo /><p>© {new Date().getFullYear()} UK Realty Istanbul. Tüm hakları saklıdır.</p></footer>
    <a className="floating-whatsapp" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer" aria-label="WhatsApp ile iletişime geç">💬</a>
    <Modal property={modal} onClose={() => setModal(null)} />
  </>;
}
