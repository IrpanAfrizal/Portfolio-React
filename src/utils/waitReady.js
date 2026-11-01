const sleep = ms => new Promise(r => setTimeout(r, ms))
const whenOnline = () => new Promise(r => {
  if (navigator.onLine) r(); else window.addEventListener('online', () => r(), { once: true })
})
// Muat ulang stylesheet font kalau request pertamanya gagal (mis. saat offline)
function ensureFontCSS() {
  return new Promise(resolve => {
    const old = document.getElementById('gfonts')
    if (!old || old.sheet) return resolve(true)
    const l = document.createElement('link')
    l.rel = 'stylesheet'; l.href = old.href
    l.onload = () => { old.remove(); l.id = 'gfonts'; resolve(true) }
    l.onerror = () => { l.remove(); resolve(false) }
    document.head.appendChild(l)
  })
}
// Menunggu offline = tanpa batas. Online tapi gagal = 6 percobaan, lalu lanjut dengan font cadangan.
export async function waitReady() {
  for (let i = 0; i < 6; i++) {
    await whenOnline()
    if (await ensureFontCSS()) {
      try {
        await Promise.all([document.fonts.load('100px Yellowtail'), document.fonts.load('14px Inter')])
        break
      } catch { /* coba lagi */ }
    }
    await sleep(1500)
  }
  await whenOnline()
  await new Promise(r => { const im = new Image(); im.onload = im.onerror = r; im.src = '/images/profile.webp' })
}
