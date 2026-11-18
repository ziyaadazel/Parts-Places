// DATA CONTOH: ganti dengan data asli dari penjual setelah diverifikasi.
export const ICON={
disc:'<circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="9"/><circle cx="32" cy="12" r="2"/><circle cx="32" cy="52" r="2"/><circle cx="12" cy="32" r="2"/><circle cx="52" cy="32" r="2"/>',
filter:'<rect x="18" y="12" width="28" height="42" rx="5"/><path d="M18 22h28M18 30h28M18 38h28"/>',
plug:'<path d="M26 8h12v14H26zM29 22v12M35 22v12"/><rect x="24" y="34" width="16" height="12" rx="2"/><path d="M32 46v10"/>',
shock:'<path d="M32 6v12M24 18h16v8H24zM32 26v6l-6 4 12 6-12 6 6 4v4"/>',
belt:'<ellipse cx="32" cy="32" rx="26" ry="16"/><ellipse cx="32" cy="32" rx="14" ry="6"/><path d="M12 22v4M20 18v4M44 18v4M52 22v4"/>',
lamp:'<path d="M12 40c0-14 10-24 24-24h16v24z"/><path d="M8 28h6M8 36h6M20 48h28"/>',
batt:'<rect x="8" y="20" width="48" height="28" rx="4"/><path d="M18 14v6M46 14v6M20 34h8M36 34h8M40 30v8"/>',
pad:'<path d="M10 40c0-16 10-26 22-26s22 10 22 26z"/><path d="M20 40v-8M32 40V26M44 40v-8"/>'};
export const CATS=[['Rem','pad'],['Filter','filter'],['Busi & pengapian','plug'],['Suspensi','shock'],['Mesin & belt','belt'],['Lampu','lamp'],['Kelistrikan','batt'],['Cakram & rotor','disc']];
export const MODELS={Toyota:['Avanza','Kijang Innova','Yaris'],Honda:['Jazz','Brio','CR-V'],Suzuki:['Ertiga','APV','Swift'],Daihatsu:['Xenia','Sigra','Terios'],Mitsubishi:['Xpander','Pajero Sport'],Nissan:['Grand Livina','March']};
export const COND={oem:'Baru OEM',after:'Aftermarket',used:'Bekas/copotan'};
export const SELL=['Toko Contoh A','Bengkel Contoh B','Toko Contoh C'];
export const P=[
{id:1,n:'Kampas rem depan',c:'Rem',k:'oem',p:385000,s:0,st:12,pn:'CONTOH-04465-01',ic:'pad',f:[['Toyota','Avanza',2012,2021,'1.3L / 1.5L']]},
{id:2,n:'Filter oli',c:'Filter',k:'oem',p:48000,s:1,st:40,pn:'CONTOH-90915-02',ic:'filter',f:[['Toyota','Avanza',2012,2021,'1.3L'],['Toyota','Yaris',2014,2019,'1.5L'],['Daihatsu','Xenia',2012,2021,'1.3L']]},
{id:3,n:'Busi iridium (set 4)',c:'Busi & pengapian',k:'after',p:290000,s:2,st:8,pn:'CONTOH-IR-4',ic:'plug',f:[['Honda','Jazz',2008,2013,'1.5L'],['Honda','Brio',2012,2018,'1.2L']]},
{id:4,n:'Shock absorber belakang (sepasang)',c:'Suspensi',k:'after',p:720000,s:0,st:5,pn:'CONTOH-SB-221',ic:'shock',f:[['Suzuki','Ertiga',2012,2018,'1.4L']]},
{id:5,n:'Cakram rem depan (copotan)',c:'Cakram & rotor',k:'used',p:210000,s:1,st:2,pn:'CONTOH-RT-77',ic:'disc',f:[['Mitsubishi','Xpander',2017,2022,'1.5L']]},
{id:6,n:'Timing belt kit',c:'Mesin & belt',k:'oem',p:540000,s:2,st:6,pn:'CONTOH-13568-09',ic:'belt',f:[['Toyota','Kijang Innova',2005,2015,'2.0L bensin']]},
{id:7,n:'Lampu depan kiri',c:'Lampu',k:'used',p:340000,s:1,st:1,pn:'CONTOH-HL-L12',ic:'lamp',f:[['Honda','Jazz',2014,2019,'1.5L']]},
{id:8,n:'Aki 45Ah kering',c:'Kelistrikan',k:'after',p:895000,s:0,st:9,pn:'CONTOH-NS60',ic:'batt',f:[['Daihatsu','Sigra',2016,2022,'1.2L'],['Toyota','Avanza',2012,2021,'1.3L'],['Suzuki','APV',2005,2016,'1.5L']]}];
