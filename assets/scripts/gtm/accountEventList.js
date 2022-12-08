// Account GTM Event Tracker
// any event tracker related to Account, pls add here,
// u can split it again if it exceed 300 lines
export const accountEventList = {
  myAccountChange: {
    event: 'akunsaya_ubah',
    eventName: 'akunsaya_ubah',
    eventCategory: 'Akun Saya',
    eventAction: 'Click button ubah via Akun Saya',
  },
  myAccountPromo: {
    event: 'akunsaya_promo',
    eventName: 'akunsaya_promo',
    eventCategory: 'Akun Saya',
    eventAction: 'Click link lihat promo lainnya via Akun Saya',
  },
  verifyWidget: {
    event: 'widget_verifikasi',
    eventName: 'widget_verifikasi',
    eventCategory: 'Widget Banner',
    eventAction: 'Click button Verifikasi Akun via Widget Banner',
  },
  filldataWidget: {
    event: 'widget_lengkapidata',
    eventName: 'widget_lengkapidata',
    eventCategory: 'Widget Banner',
    eventAction: 'Clcik button Lengkapi Data Diri via Widget Banner',
  },
  personaldataChange: {
    event: 'datadiri_ubah',
    eventName: 'datadiri_ubah',
    eventCategory: 'Data Diri',
    eventAction: 'Click button ubah via Data Diri',
  },
  personaldataSave: {
    event: 'datadiri_simpan',
    eventName: 'datadiri_simpan',
    eventCategory: 'Data Diri',
    eventAction: 'Click button simpan di Form Ubah Data Diri',
  },
  fillAddress: {
    event: 'alamat_isi',
    eventName: 'alamat_isi',
    eventCategory: 'Alamat',
    eventAction: 'Click link isi sekarang via Alamat',
  },
  saveAddress: {
    event: 'alamat_simpan',
    eventName: 'alamat_simpan',
    eventCategory: 'Alamat',
    eventAction: 'Click button simpan di Form Ubah Alamat',
  },
  editAddress: {
    event: 'alamat_ubah',
    eventName: 'alamat_ubah',
    eventCategory: 'Alamat',
    eventAction: 'Click button "ubah alamat"',
  },
  removeAddress: {
    event: 'alamat_hapus',
    eventName: 'alamat_ubah',
    eventCategory: 'Alamat',
    eventAction: 'Click button "remove"',
  },
  setMainAddress: {
    event: 'alamat_utama',
    eventName: 'alamat_utama',
    eventCategory: 'Alamat',
    eventAction: 'Click button "jadikan alamat utama"',
  },
  addressFull: {
    event: 'alamat_penuh',
    eventName: 'alamat_penuh',
    eventCategory: 'Alamat',
    eventAction: 'Alamat penuh',
  },
  savePassword: {
    event: 'sandi_simpan',
    eventName: 'sandi_simpan',
    eventCategory: 'Detail Akun',
    eventAction: 'Click button simpan di Form Ubah Sandi',
  },
  revokeDevice: {
    event: 'revoke_kelolaakun',
    eventName: 'revoke_kelolaakun',
    eventCategory: 'Aktivitas',
    eventAction: 'Click button silang di card device',
  },
  revokeFullDevice: {
    event: 'revoke_perangkatpenuh',
    eventName: 'revoke_perangkatpenuh',
    eventCategory: 'Aktivitas',
    eventAction: 'Click button silang di card device',
  },
  revokeAksesAkun: {
    event: 'remove_aksesakun',
    eventName: 'remove_aksesakun',
    eventCategory: 'Aktivitas',
    eventAction: 'Click button remove di card account linking',
  },
  deviceFull: {
    event: 'device_full',
    eventName: 'device_full',
    eventCategory: 'Aktivitas',
    eventAction: 'Device akun penuh',
  },
}
