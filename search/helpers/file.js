
// https://github.com/sainf/vue-filter-pretty-bytes/blob/master/vue-filter-pretty-bytes.js
export function humanFileSize(bytes, decimals, kib) {
  kib = kib || false;
  if (bytes === 0) return '0 Bytes';
  if (Number.isNaN(parseFloat(bytes)) && !Number.isFinite(bytes)) return 'Not an number';
  const k = kib ? 1024 : 1000;
  const dm = decimals != null && !Number.isNaN(decimals) && decimals >= 0 ? decimals : 2;
  const sizes = kib ? ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB', 'BiB'] : ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
}

export function mimeType() {
  return '';
}
