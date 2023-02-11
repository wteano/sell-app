export function deepClone<T>(data: T): T
export function deepClone<T>(data: T[]): T
export function deepClone<T>(data: object): T
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepClone (data : any): any {
  let newData
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      newData = []
      for (let i = 0; i < data.length; i++) {
        if (data[i] instanceof Object && typeof data[i] !== 'function') {
          newData[i] = deepClone(data[i])
        } else {
          newData[i] = data[i]
        }
      }
    } else {
      newData = {}
      for (const key in data) {
        if (data[key] instanceof Object && typeof data[key] !== 'function') {
          (newData[key] as any) = deepClone(data[key])
        } else {
          (newData[key] as any) = data[key]
        }
      }
    }
  } else {
    return data
  }
  //   for (const key in data) {
  //     if (data[key] instanceof Object && typeof data[key] !== 'function') {
  //       newData[key] = deepClone(data[key])
  //     } else {
  //       newData[key] = data[key]
  //     }
  //   }
  return newData
}
export function getDateTime (dateTime:number|string|Date, format?:string) : string {
  const date = new Date(dateTime)
  const Y :number |string = date.getFullYear()
  let M :number |string = date.getMonth() + 1
  let D :number |string = date.getDate()
  let h :number |string = date.getHours()
  let m :number |string = date.getMinutes()
  let s :number |string = date.getSeconds()

  M = M < 10 ? '0' + M : M
  D = D < 10 ? '0' + D : D
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s

  let newDateTime = `${Y}年${M}月${D}日  ${h}:${m}:${s}`
  if (format) {
    if (format.toLocaleLowerCase() === 'yyyy-mm-dd') {
      newDateTime = `${Y}-${M}-${D}  ${h}:${m}:${s}`
    } else if (format.toLocaleLowerCase() === 'yyyy/mm/dd') {
      newDateTime = `${Y}/${M}/${D}  ${h}:${m}:${s}`
    } else if (format.toLocaleLowerCase() === 'yyyy.mm.dd') {
      newDateTime = `${Y}.${M}.${D}  ${h}:${m}:${s}`
    }
  }

  return newDateTime
}

export function getDate (date:number|string|Date, format:string) : string {
  let newdate
  if (format.toLocaleLowerCase() === 'yyyy-mm-dd') {
    newdate = getDateTime(date, format).slice(0, 10)
  } else if (format.toLocaleLowerCase() === 'yyyy/mm/dd') {
    newdate = getDateTime(date, format).slice(0, 10)
  } else if (format.toLocaleLowerCase() === 'yyyy.mm.dd') {
    newdate = getDateTime(date, format).slice(0, 10)
  }

  return newdate as string
}
