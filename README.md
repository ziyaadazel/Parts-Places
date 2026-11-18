# Parts Places (versi 1)

Marketplace suku cadang mobil Jepang, uji coba Bandung. Transaksi lewat WhatsApp; belum ada pembayaran/keranjang.

## Menjalankan
1. Pasang Node.js (versi LTS) dari nodejs.org.
2. Di folder ini, buka terminal lalu jalankan: `npm install`
3. Jalankan: `npm run dev`, lalu buka alamat yang tampil (biasanya http://localhost:5173).
4. Untuk hasil siap unggah: `npm run build` (hasil di folder `dist`).

## File penting
- `src/data.js`: data produk (SEKARANG CONTOH). Ganti dengan data asli dari penjual.
- `src/config.js`: nomor WhatsApp placeholder dan `SAMPLE_MODE` (label "Contoh").
- `src/App.jsx`: semua halaman. `src/styles.css`: tampilan.

## Sebelum data asli dipakai
Verifikasi keaslian, stok, kecocokan, izin jual, dan kebijakan retur. Baru setelah itu set `SAMPLE_MODE = false`.
