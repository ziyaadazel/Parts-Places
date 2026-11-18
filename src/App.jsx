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
    (!f.q || (p.n + p.pn).toLowerCase().includes(f.q.toLowerCase())) &&
    p.f.some(x => (!f.b || x[0] === f.b) && (!f.m || x[1] === f.m) && (!f.y || (x[2] <= +f.y && +f.y <= x[3])))
}

function Card({ p, open }) {
  const f = p.f[0]
  return (
    <div className="card" tabIndex={0} role="link" onClick={() => open(p.id)} onKeyDown={e => e.key === 'Enter' && open(p.id)}>
      <div className="pic"><Ic k={p.ic} /><Sample /></div>
      <div className="cb">
        <span><span className={'pill ' + p.k}>{COND[p.k]}</span></span>
        <b>{p.n}</b>
        <span className="sm-t">Cocok{SAMPLE_MODE ? ' (contoh)' : ''}: {f[0]} {f[1]} {f[2]}–{f[3]}{p.f.length > 1 && ` +${p.f.length - 1} lainnya`}</span>
        <span className="price">{rp(p.p)} {SAMPLE_MODE && <span className="sm-t">harga contoh</span>}</span>
        <span className="sm-t">{SELL[p.s]} · Bandung · stok belum dikonfirmasi</span>
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

function Home({ items, go, open }) {
  const [s, setS] = useState(EMPTY)
  const set = k => e => setS({ ...s, [k]: e.target.value, ...(k === 'b' ? { m: '' } : {}) })
  return (<>
    <section className="hero">
      <div>
        <h1>Suku cadang mobil Jepang, dicari berdasarkan kendaraanmu.</h1>
        <p>Pilih merek, model, dan tahun mobil, lalu lihat suku cadang dari toko dan bengkel di Bandung. Setiap produk menampilkan kendaraan yang cocok, jadi kamu tahu apa yang perlu dikonfirmasi ke penjual.</p>
      </div>
      <div className="fit" role="search">
        <h3>Cari suku cadang</h3>
        <label>Nama part, nomor part, atau kata kunci<input type="search" value={s.q} onChange={set('q')} placeholder="mis. kampas rem" /></label>
        <div className="row3">
          <label>Merek<select value={s.b} onChange={set('b')}><Opts a={Object.keys(MODELS)} ph="Pilih" /></select></label>
          <label>Model<select value={s.m} onChange={set('m')}><Opts a={MODELS[s.b] || []} ph="Pilih" /></select></label>
          <label>Tahun<select value={s.y} onChange={set('y')}><Opts a={YEARS} ph="Pilih" /></select></label>
        </div>
        <button className="btn" onClick={() => go('catalog', s)}>Cari suku cadang</button>
      </div>
    </section>
    <section className="sec"><h2>Kategori</h2>
      <div className="cats">{CATS.map(c => <button key={c[0]} className="cat" onClick={() => go('catalog', { ...EMPTY, c: c[0] })}><Ic k={c[1]} /><b>{c[0]}</b></button>)}</div>
    </section>
    <section className="sec"><h2>Produk{SAMPLE_MODE ? ' contoh' : ''}</h2>
      <div className="grid">{items.slice(0, 4).map(p => <Card key={p.id} p={p} open={open} />)}</div>
    </section>
    <section className="sec"><div className="band">
      <div><h2>Punya toko atau bengkel suku cadang?</h2><p>Kelola produk, harga, stok, dan kecocokan kendaraan dalam satu dashboard.</p></div>
      <button className="btn" onClick={() => go('seller')}>Lihat dashboard penjual</button>
    </div></section>
    <Trust />
  </>)
}

function Catalog({ items, flt, setFlt, open }) {
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
        {r.length ? <div className="grid">{r.map(p => <Card key={p.id} p={p} open={open} />)}</div>
          : <div className="warnbox">Belum ada produk yang cocok. Coba kurangi filter.</div>}
      </div>
    </div>
  </>)
}

function Product({ p, back }) {
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
        <a className="btn" style={{ textDecoration: 'none', textAlign: 'center' }} target="_blank" rel="noopener noreferrer" href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`}>Tanya penjual lewat WhatsApp</a>
        {WA_NUMBER === '6280000000000' && <span className="sm-t">Nomor WhatsApp masih placeholder (lihat src/config.js).</span>}
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
  const go = (v, f) => { if (f) setFlt(f); setView(v); window.scrollTo(0, 0) }
  const open = id => { setSel(id); go('product') }
  const p = items.find(x => x.id === sel)
  return (<>
    {SAMPLE_MODE && <div className="proto">Prototype · Semua produk, harga, stok, penjual, dan ulasan adalah <b>Contoh</b>. Belum ada transaksi nyata.</div>}
    <header><div className="wrap">
      <button className="logo" onClick={() => go('home')} aria-label="Parts Places, ke beranda"><i>P</i><span>Parts Places</span></button>
      <nav aria-label="Menu utama">
        <button className={view === 'catalog' ? 'on' : ''} onClick={() => go('catalog', EMPTY)}>Katalog</button>
        <button className={view === 'seller' ? 'on' : ''} onClick={() => go('seller')}>Jual di sini</button>
      </nav>
    </div></header>
    <main><div className="wrap">
      {view === 'home' && <Home items={items} go={go} open={open} />}
      {view === 'catalog' && <Catalog items={items} flt={flt} setFlt={setFlt} open={open} />}
      {view === 'product' && p && <Product p={p} back={() => go('catalog')} />}
      {view === 'seller' && <Seller items={items} setItems={setItems} />}
    </div></main>
    <footer><div className="wrap">Parts Places adalah konsep untuk uji coba di Bandung dan sekitarnya. Tidak berafiliasi dengan pabrikan atau merek kendaraan mana pun; nama merek hanya teks untuk menunjukkan kecocokan.</div></footer>
  </>)
}
