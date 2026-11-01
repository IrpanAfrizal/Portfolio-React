import { lazy } from 'react'
const wait = ms => new Promise(r => setTimeout(r, ms))
// Halaman dimuat per-bagian. Kalau gagal karena jaringan, terus mencoba sampai berhasil.
export default function lazyRetry(factory) {
  return lazy(async () => {
    for (let i = 0; ; i++) {
      try { return await factory() } catch (err) {
        if (!navigator.onLine) await new Promise(r => window.addEventListener('online', () => r(), { once: true }))
        else if (i >= 8) { window.location.reload(); await wait(60000) }
        else await wait(Math.min(1000 * 2 ** i, 8000))
      }
    }
  })
}
