import { useState } from 'react'
import { ICON, CATS, MODELS, COND, SELL, P } from './data.js'
import { WA_NUMBER, SAMPLE_MODE } from './config.js'

const rp = n => 'Rp' + n.toLocaleString('id-ID')
const YEARS = Array.from({ length: 30 }, (_, i) => 2024 - i)
const EMPTY = { b: '', m: '', y: '', c: '', k: '', q: '' }
const Ic = ({ k }) => <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICON[k] }} />
const Opts = ({ a, ph }) => <><option value="">{ph}</option>{a.map(x => <option key={x}>{x}</option>)}</>
const Sample = () => SAMPLE_MODE ? <span className="tag">Contoh</span> : null

function match(p, f) {
  return (!f.c || p.c === f.c) && (!f.k || p.k === f.k) &&
    f.q.toLowerCase().split(/\s+/).filter(Boolean).every(t => /^\d{4}$/.test(t) ? p.f.some(x => x[2] <= +t && +t <= x[3]) : (p.n + ' ' + p.pn + ' ' + p.c + ' ' + p.f.map(x => x.join(' ')).join(' ')).toLowerCase().includes(t)) &&
    p.f.some(x => (!f.b || x[0] === f.b) && (!f.m || x[1] === f.m) && (!f.y || (x[2] <= +f.y && +f.y <= x[3])))
}

function Card({ p, open, add }) {
  const f = p.f[0]
  return (
    <div className="card" tabIndex={0} role="link" onClick={() => open(p.id)} onKeyDown={e => e.key === 'Enter' && open(p.id)}>
      <div className="pic"><Ic k={p.ic} /><Sample /></div>
      <div className="cb">
        <span className="price">{rp(p.p)} {SAMPLE_MODE && <span className="sm-t">harga contoh</span>}</span>
        <b>{p.n}</b>
        <span><span className={'pill ' + p.k}>{COND[p.k]}</span></span>
        <span className="fitline">Cocok: {f[0]} {f[1]} {f[2]}–{f[3]}{p.f.length > 1 && ` +${p.f.length - 1} lainnya`}</span>
        <span className="sm-t">{SELL[p.s]}{SAMPLE_MODE ? ' (contoh)' : ''} · Bandung</span>
        <span className="stk">Stok belum dikonfirmasi</span>
        {add && <button className="btn alt sm" onClick={e => { e.stopPropagation(); add(p.id) }}>+ Keranjang</button>}
      </div>
    </div>
  )
}

const Trust = () => (
  <section className="sec"><h2>Yang harus diverifikasi sebelum peluncuran</h2>
    <div className="trust">
      <div><b>Keaslian & kondisi</b>Status OEM, aftermarket, atau bekas harus dicek ke penjual dan belum dijamin platform.</div>
      <div><b>Stok & kecocokan</b>Stok dan kecocokan kendaraan harus dikonfirmasi dengan penjual sebelum membeli.</div>
      <div><b>Izin jual & retur</b>Izin penjualan kembali dan kebijakan retur belum ditetapkan platform.</div>
    </div>
  </section>
)

function Home({ items, go, open, add }) {
  const [tab, setTab] = useState('')
  const [v, setV] = useState({ b: '', m: '', y: '' })
  const list = items.filter(p => !tab || p.c === tab)
  return (<>
    <section className="banner">
      <div>
        <span className="chip">Bandung · tahap uji coba</span>
        <h1>Cari suku cadang mobil Jepang yang sesuai kendaraanmu</h1>
        <p>Toko dan bengkel di Bandung, lengkap dengan info kecocokan merek, model, dan tahun.</p>
        <div className="vsel" role="search" aria-label="Pilih kendaraan">
          <select aria-label="Merek" value={v.b} onChange={e => setV({ b: e.target.value, m: '', y: v.y })}><Opts a={Object.keys(MODELS)} ph="Merek" /></select>
          <select aria-label="Model" value={v.m} onChange={e => setV({ ...v, m: e.target.value })}><Opts a={MODELS[v.b] || []} ph="Model" /></select>
          <select aria-label="Tahun" value={v.y} onChange={e => setV({ ...v, y: e.target.value })}><Opts a={YEARS} ph="Tahun" /></select>
          <button className="btn" onClick={() => go('catalog', { ...EMPTY, ...v })}>Cari part</button>
        </div>
      </div>
      <div className="bn-art" aria-hidden="true"><Ic k="disc" /><Ic k="shock" /><Ic k="plug" /></div>
    </section>

    <section className="panel"><h2>Kategori populer</h2>
      <div className="catgrid">{CATS.map(c => <button key={c[0]} className="catt" onClick={() => go('catalog', { ...EMPTY, c: c[0] })}><span><Ic k={c[1]} /></span>{c[0]}</button>)}</div>
    </section>

    <section className="panel"><h2>Jelajahi suku cadang{SAMPLE_MODE ? ' (contoh)' : ''}</h2>
      <div className="tabs" role="tablist">
        {['', ...CATS.map(c => c[0])].map(c => <button key={c} role="tab" aria-selected={tab === c} className={tab === c ? 'on' : ''} onClick={() => setTab(c)}>{c || 'Semua'}</button>)}
      </div>
      {list.length ? <div className="grid">{list.map(p => <Card key={p.id} p={p} open={open} add={add} />)}</div>
        : <div className="warnbox">Belum ada produk contoh di kategori ini.</div>}
      <p style={{ textAlign: 'center', margin: '16px 0 0' }}><button className="btn alt" onClick={() => go('catalog', { ...EMPTY, c: tab })}>Lihat semua di katalog</button></p>
    </section>

    <section className="sec"><h2>Cara memastikan part cocok</h2>
      <div className="trust steps">
        <div><b>1. Pilih kendaraan</b>Pilih merek, model, dan tahun mobilmu untuk melihat part yang tercatat cocok.</div>
        <div><b>2. Cek kecocokan</b>Bandingkan nomor part dan daftar kendaraan di halaman produk dengan part lamamu.</div>
        <div><b>3. Konfirmasi stok</b>Tanyakan ke penjual lewat WhatsApp sebelum membeli. Stok di sini belum dikonfirmasi.</div>
      </div>
    </section>
    <section className="sec"><div className="band">
      <div><h2>Punya toko atau bengkel suku cadang?</h2><p>Kelola produk, harga, stok, dan kecocokan kendaraan dalam satu dashboard.</p></div>
      <button className="btn" onClick={() => go('seller')}>Jual di sini</button>
    </div></section>
    <Trust />
  </>)
}

function Catalog({ items, flt, setFlt, open, add }) {
  const r = items.filter(p => match(p, flt))
  const up = k => e => setFlt({ ...flt, [k]: e.target.value, ...(k === 'b' ? { m: '' } : {}) })
  return (<>
    <h1 style={{ fontSize: 32, marginBottom: 6 }}>Katalog suku cadang</h1>
    {SAMPLE_MODE && <div className="warnbox" style={{ marginBottom: 16 }}>Data katalog masih contoh. Stok belum dikonfirmasi oleh penjual mana pun.</div>}
    <div className="cat-layout">
      <aside className="filters" aria-label="Filter">
        <label>Kata kunci / nomor part<input type="search" value={flt.q} onChange={up('q')} /></label>
        <label>Merek<select value={flt.b} onChange={up('b')}><Opts a={Object.keys(MODELS)} ph="Semua" /></select></label>
        <label>Model<select value={flt.m} onChange={up('m')}><Opts a={MODELS[flt.b] || []} ph="Semua" /></select></label>
        <label>Tahun<select value={flt.y} onChange={up('y')}><Opts a={YEARS} ph="Semua" /></select></label>
        <label>Kategori<select value={flt.c} onChange={up('c')}><Opts a={CATS.map(c => c[0])} ph="Semua" /></select></label>
        <label>Kondisi<select value={flt.k} onChange={up('k')}><option value="">Semua</option>{Object.entries(COND).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
        <button className="btn alt sm" onClick={() => setFlt(EMPTY)}>Reset filter</button>
      </aside>
      <div>
        <p className="sm-t" style={{ marginTop: 0 }}>{r.length} produk ditemukan</p>
        {r.length ? <div className="grid">{r.map(p => <Card key={p.id} p={p} open={open} add={add} />)}</div>
          : <div className="warnbox">Belum ada produk yang cocok. Coba kurangi filter.</div>}
      </div>
    </div>
  </>)
}

function Product({ p, back, add }) {
  const msg = `Halo ${SELL[p.s]}, saya lihat "${p.n}" (${COND[p.k]}) di Parts Places. Apakah cocok untuk mobil saya dan stoknya masih ada?`
  return (<>
    <button className="btn alt sm" onClick={back}>Kembali ke katalog</button>
    <div className="detail" style={{ marginTop: 14 }}>
      <div className="pic"><Ic k={p.ic} /><Sample /></div>
      <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
        <span><span className={'pill ' + p.k}>{COND[p.k]}</span></span>
        <h1 style={{ fontSize: 32 }}>{p.n}</h1>
        <div className="price" style={{ fontSize: 28 }}>{rp(p.p)} {SAMPLE_MODE && <span className="sm-t">harga contoh</span>}</div>
        <div className="sm-t">Dijual oleh {SELL[p.s]}, Bandung · Stok: {p.st}, belum dikonfirmasi</div>
        <div className="scroll"><table><tbody><tr><th>Nomor part</th><td>{p.pn}</td></tr><tr><th>Kategori</th><td>{p.c}</td></tr></tbody></table></div>
        <h3 style={{ fontSize: 18 }}>Kendaraan yang cocok</h3>
        <div className="scroll"><table className="tbl"><thead><tr><th>Merek</th><th>Model</th><th>Tahun</th><th>Mesin</th></tr></thead>
          <tbody>{p.f.map((f, i) => <tr key={i}><td>{f[0]}</td><td>{f[1]}</td><td>{f[2]}–{f[3]}</td><td>{f[4]}</td></tr>)}</tbody></table></div>
        <div className="warnbox">Sebelum membeli, konfirmasi ke penjual: kecocokan dengan mobilmu (cek nomor part atau nomor rangka), stok, dan kondisi barang. Pembayaran dan pengiriman diatur langsung dengan penjual.</div>
        <button className="btn alt" onClick={() => add(p.id)}>Masukkan ke keranjang (demo)</button>
        <a className="btn" style={{ textDecoration: 'none', textAlign: 'center' }} target="_blank" rel="noopener noreferrer" href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`}>Tanya penjual lewat WhatsApp</a>
        {WA_NUMBER === '6280000000000' && <span className="sm-t">Nomor WhatsApp masih placeholder (lihat src/config.js).</span>}
      </div>
    </div>
  </>)
}

function Cart({ items, cart, setCart, go }) {
  const [done, setDone] = useState(false)
  const rows = items.filter(p => cart[p.id] > 0)
  if (!rows.length) return (<>
    <h1 style={{ fontSize: 32 }}>Keranjang demo</h1>
    <div className="warnbox" style={{ margin: '14px 0' }}>Keranjang masih kosong.</div>
    <button className="btn" onClick={() => go('catalog', EMPTY)}>Buka katalog</button>
  </>)
  const sub = rows.reduce((a, p) => a + p.p * cart[p.id], 0), ship = 25000
  const chg = (id, d) => setCart({ ...cart, [id]: Math.max(0, cart[id] + d) })
  return (<>
    <h1 style={{ fontSize: 32, marginBottom: 14 }}>Keranjang demo</h1>
    <div className="two">
      <div>{rows.map(p => <div className="cart-row" key={p.id}>
        <div className="pic"><Ic k={p.ic} /></div>
        <div><b>{p.n}</b><div className="sm-t">{COND[p.k]} · {SELL[p.s]}</div></div>
        <div className="qty"><button aria-label="Kurangi" onClick={() => chg(p.id, -1)}>−</button>{cart[p.id]}<button aria-label="Tambah" onClick={() => chg(p.id, 1)}>+</button></div>
        <b>{rp(p.p * cart[p.id])}</b></div>)}</div>
      <div className="sum"><h3 style={{ fontSize: 19 }}>Ringkasan (contoh)</h3>
        <div><span>Subtotal</span><span>{rp(sub)}</span></div>
        <div><span>Ongkos kirim contoh</span><span>{rp(ship)}</span></div>
        <div><b>Total contoh</b><b>{rp(sub + ship)}</b></div>
        <button className="btn" onClick={() => setDone(true)}>Simulasikan checkout</button>
        {done && <div className="warnbox">Ini hanya simulasi. Tidak ada pembayaran yang diproses. Pembayaran, pengiriman, refund, dan pencairan dana belum tersedia; pembelian di versi 1 diatur langsung dengan penjual lewat WhatsApp.</div>}
      </div>
    </div>
  </>)
}

function Seller({ items, setItems }) {
  const mine = items.filter(p => p.s === 0)
  const [f, setF] = useState({ n: '', k: 'oem', c: CATS[0][0], p: '', st: '', b: '', m: '' })
  const [sent, setSent] = useState(false)
  const edit = (id, k, v) => setItems(items.map(p => p.id === id ? { ...p, [k]: +v } : p))
  const add = e => {
    e.preventDefault()
    setItems([...items, { id: Date.now(), n: f.n, c: f.c, k: f.k, p: +f.p, s: 0, st: +f.st, pn: '-', ic: 'filter', f: [[f.b || 'Toyota', f.m || 'Avanza', 2010, 2020, '-']] }])
    setF({ ...f, n: '', p: '', st: '' })
  }
  return (<>
    <h1 style={{ fontSize: 32, marginBottom: 6 }}>Dashboard penjual</h1>
    <div className="warnbox" style={{ marginBottom: 16 }}>Demo untuk akun penjual contoh. Perubahan hanya tersimpan sementara di halaman; belum ada penyimpanan data.</div>
    <div className="two">
      <div><h3 style={{ fontSize: 20, marginBottom: 10 }}>Produk kamu</h3>
        <div className="scroll"><table className="tbl"><thead><tr><th>Produk</th><th>Kondisi</th><th>Harga</th><th>Stok</th></tr></thead>
          <tbody>{mine.map(p => <tr key={p.id}>
            <td><b>{p.n}</b><div className="sm-t">{p.f.map(x => `${x[0]} ${x[1]} ${x[2]}–${x[3]}`).join(', ')}</div></td>
            <td><span className={'pill ' + p.k}>{COND[p.k]}</span></td>
            <td><input type="number" aria-label="Harga" value={p.p} onChange={e => edit(p.id, 'p', e.target.value)} /></td>
            <td><input type="number" aria-label="Stok" value={p.st} onChange={e => edit(p.id, 'st', e.target.value)} /></td></tr>)}</tbody></table></div>
      </div>
      <form className="fit" onSubmit={add}><h3>Tambah produk</h3>
        <label>Nama produk<input type="text" required value={f.n} onChange={e => setF({ ...f, n: e.target.value })} /></label>
        <div className="formgrid">
          <label>Kondisi<select value={f.k} onChange={e => setF({ ...f, k: e.target.value })}>{Object.entries(COND).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
          <label>Kategori<select value={f.c} onChange={e => setF({ ...f, c: e.target.value })}>{CATS.map(c => <option key={c[0]}>{c[0]}</option>)}</select></label>
          <label>Harga (Rp)<input type="number" required min="0" value={f.p} onChange={e => setF({ ...f, p: e.target.value })} /></label>
          <label>Stok<input type="number" required min="0" value={f.st} onChange={e => setF({ ...f, st: e.target.value })} /></label>
          <label>Merek cocok<select value={f.b} onChange={e => setF({ ...f, b: e.target.value, m: '' })}><Opts a={Object.keys(MODELS)} ph="Merek" /></select></label>
          <label>Model cocok<select value={f.m} onChange={e => setF({ ...f, m: e.target.value })}><Opts a={MODELS[f.b] || []} ph="Model" /></select></label>
        </div>
        <button className="btn">Simpan produk</button>
      </form>
    </div>
    <section className="sec"><h2>Daftar sebagai penjual</h2>
      <form className="fit" style={{ maxWidth: 560 }} onSubmit={e => { e.preventDefault(); setSent(true); e.target.reset() }}>
        <div className="formgrid">
          <label>Nama toko / bengkel<input type="text" required /></label>
          <label>Kontak (WhatsApp)<input type="text" required /></label>
        </div>
        <button className="btn">Kirim minat (simulasi)</button>
        {sent && <span className="ok">Tercatat sebagai simulasi. Data belum dikirim ke mana pun.</span>}
      </form>
    </section>
    <Trust />
  </>)
}

export default function App() {
  const [view, setView] = useState('home')
  const [sel, setSel] = useState(null)
  const [flt, setFlt] = useState(EMPTY)
  const [items, setItems] = useState(P)
  const [cart, setCart] = useState({})
  const [q, setQ] = useState('')
  const [menu, setMenu] = useState(false)
  const [note, setNote] = useState('')
  const go = (v, f) => { if (f) setFlt(f); setView(v); setMenu(false); window.scrollTo(0, 0) }
  const open = id => { setSel(id); go('product') }
  const add = id => { setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 })); setNote('Ditambahkan ke keranjang demo'); setTimeout(() => setNote(''), 1800) }
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const p = items.find(x => x.id === sel)
  return (<>
    {SAMPLE_MODE && <div className="proto">Prototype · Semua produk, harga, stok, penjual, dan ulasan adalah <b>Contoh</b>. Belum ada transaksi nyata.</div>}
    <header><div className="hd">
      <button className="logo" onClick={() => go('home')} aria-label="Parts Places, ke beranda"><i>P</i><span>Parts Places</span></button>
      <div className="menuwrap">
        <button className="catbtn" aria-expanded={menu} onClick={() => setMenu(!menu)}>☰ <span>Kategori</span></button>
        {menu && <div className="menu">{CATS.map(c => <button key={c[0]} onClick={() => go('catalog', { ...EMPTY, c: c[0] })}><Ic k={c[1]} />{c[0]}</button>)}</div>}
      </div>
      <form className="sbar" role="search" onSubmit={e => { e.preventDefault(); go('catalog', { ...EMPTY, q }) }}>
        <input type="search" aria-label="Cari suku cadang" placeholder="Cari part, nomor part, merek, model, atau tahun" value={q} onChange={e => setQ(e.target.value)} />
        <button className="btn sm">Cari</button>
      </form>
      <button className="cartbtn" onClick={() => go('cart')} aria-label={`Keranjang, ${count} barang`}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.6 11.5a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6" /></svg>
        {count > 0 && <span className="cnt">{count}</span>}
      </button>
      <button className="btn sm sellbtn" onClick={() => go('seller')}>Jual di sini</button>
    </div></header>
    <main><div className="wrap">
      {view === 'home' && <Home items={items} go={go} open={open} add={add} />}
      {view === 'catalog' && <Catalog items={items} flt={flt} setFlt={setFlt} open={open} add={add} />}
      {view === 'product' && p && <Product p={p} back={() => go('catalog')} add={add} />}
      {view === 'cart' && <Cart items={items} cart={cart} setCart={setCart} go={go} />}
      {view === 'seller' && <Seller items={items} setItems={setItems} />}
    </div></main>
    {note && <div className="toast" role="status">{note}</div>}
    <footer><div className="wrap">Parts Places adalah konsep untuk uji coba di Bandung dan sekitarnya. Tidak berafiliasi dengan pabrikan atau merek kendaraan mana pun; nama merek hanya teks untuk menunjukkan kecocokan.</div></footer>
  </>)
}
