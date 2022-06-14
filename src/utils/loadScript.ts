/* eslint */
const callbacks: Record<string, Array<() => void>> = {}

/**
 * 加载一个远程脚本
 * @param {String} src 一个远程脚本
 * @param {Function} callback 回调
 */

const existingScriptMap = new Map()
type Callback = (err?: Error | null, script?: HTMLScriptElement) => any
function loadScript(src: string, callback?: Callback, integrity?: string) {
  const existingScript = document.getElementById(src)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const cb = callback || (() => {})
  function stdOnEnd(script: HTMLScriptElement) {
    script.onload = () => {
      existingScriptMap.set(script.id, { loaded: true })
      this.onerror = this.onload = null
      callbacks[src].forEach((item: Callback) => {
        item(null, script)
      })
      delete callbacks[src]
    }
    script.onerror = () => {
      this.onerror = this.onload = null
      cb(new Error(`Failed to load ${src}`), script)
    }
  }

  // function ieOnEnd(script: any) {
  //   script.onreadystatechange = () => {
  //     if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
  //     existingScriptMap.set(script.id, { loaded: true })
  //     this.onreadystatechange = null
  //     callbacks[src].forEach((item: Callback) => {
  //       item(null, script)
  //     })
  //     delete callbacks[src]
  //   }
  // }
  if (!existingScript) {
    callbacks[src] = []
    const $script = document.createElement('script')
    $script.src = src
    $script.id = src
    $script.async = true
    if (integrity) {
      $script.integrity = integrity
      $script.crossOrigin = 'anonymous'
    }
    document.body.appendChild($script)
    const onEnd = stdOnEnd.bind($script)
    // const onEnd = 'onload' in $script ? stdOnEnd.bind($script) : ieOnEnd.bind($script)
    existingScriptMap.set($script.id, { loaded: false })
    onEnd($script)
    callbacks[src]?.push(cb)
  } else if (!existingScriptMap.get(src)?.loaded) {
    callbacks[src]?.push(cb)
  } else {
    cb()
  }
}

/**
 * 顺序加载一组远程脚本
 * @param {Array} list 一组远程脚本
 * @param {Function} cb 回调
 */
export function loadScriptQueue(list: string[], cb: Callback) {
  const first = list.shift()
  first &&
    (list.length ? loadScript(first, () => loadScriptQueue(list, cb)) : loadScript(first, cb))
}

export default loadScript
