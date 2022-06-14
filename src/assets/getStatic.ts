export default function getStatic(fileName: string, pwd = 'images/homepage', lpwd = 'img'): string {
  return import.meta.env.MODE === 'dev'
    ? new URL(`/src/assets/${lpwd}/${fileName}`, import.meta.url).href
    : new URL(`resources/${pwd}/${fileName}`, import.meta.env.VITE_STATIC_URL).href
}
