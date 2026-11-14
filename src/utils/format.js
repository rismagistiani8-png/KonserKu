// Ubah 1500000 menjadi "Rp 1.500.000"
export const formatRupiah = (angka) =>
  'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');