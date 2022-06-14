export const shortenNumber = (num: number | string, fixed = 4, local = false) => {
  let [_i, _f]: any[] = num.toString().split('.')

  // 千分位
  // _i = _i.toLocaleString(_i)
  local && (_i = _i.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,'))

  _f &&
    (_f = _f
      .slice(0, fixed) //小数按位截断
      .replace(/0+?$/g, '')) //尾数0去掉

  return _i + (_f ? '.' + _f : '')
}
