/* eslint-disable no-eval */
// ------- Object -------//
export function ObjCopy(src) {
  // return Object.assign({}, src);
  return JSON.parse(JSON.stringify(src))
};

export function ObjArrDel(obj, indexDel) {
  for (var i = indexDel.length - 1; i >= 0; i--) {
    obj.splice(indexDel[i], 1)
  }
};

export function ObjResetValue(obj, val) {
  Object.keys(obj).forEach(key => {
    /* if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
      obj[key] = {};
    } else */
    if (val !== undefined) {
      obj[key] = val
    } else {
      if (Array.isArray(obj[key])) {
        obj[key] = []
      } else {
        obj[key] = val
      }
    }
  })
};

export function ObjCopyValue(obj, src, option = 0) { // 0 == src, 1 == obj
  Object.keys(option ? obj : src).forEach(key => {
    SetObjVal(obj, key, ObjCopy(src[key]))
  })
};

export function ObjClearValue(obj) {
  if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => {
      if (!ObjClearValue(obj[key])) {
        obj[key] = null
      }
    })
    return true
  }
  return false
};

export function ObjArrSort(objArr, key, direction = 'asc') {
  direction = direction == 'asc' ? '>' : '<'
  let sort = 'a.'.concat(key, ' ', direction, ' ', 'b.', key, ' ? ', '1', ' : ', 'a.', key, ' == ', 'b.', key, ' ? ', '0', ' : ', '-1')
  sort = eval('(a, b) => { return ' + sort + ' }')
  return objArr.sort(sort)
}

/* export function GetObjVal(keys, obj) { //keys ex : 'a.b.c'
  let objtmp = Copy(obj);
  keys.split('.').forEach((t) => {
    if (objtmp) {
      objtmp = objtmp[t];
    } else { objtmp = null; }
  });
  return objtmp;
} */

export function GetObjVal(object, path, defaultValue) {
  path = ''.concat(path).trim()
  defaultValue = typeof defaultValue === 'undefined' ? null : defaultValue
  let obj = object || {}
  if (!IsNull(path)) {
    const keys = path.split('.')
    keys.forEach(function (key) {
      if (
        obj !== null &&
        typeof obj[key] !== 'undefined' &&
        obj[key] !== null
      ) {
        obj = obj[key]
      } else {
        obj = defaultValue
      }
    })
  }
  return obj
}

export function SetObjVal(obj, keys, value) { // set(['a', 'b', 'c'], 1)  =  { a: { b: { c: 1 } } }
  obj = obj || {}
  keys = typeof keys === 'string' ? keys.match(/[$]?\w+/g) : Array.prototype.slice.apply(keys)
  keys.reduce((obj, key, index) => {
    obj[key] = index === keys.length - 1 ? value : typeof obj[key] === 'object' && !IsNull(obj) && !IsNull(obj[key]) ? obj[key] : {}
    return obj[key]
  }, obj)
  return obj
}

export function GetObjValJoin(obj, keys = ['code', 'description'], symbol = ' : ', notEqual = null, defaultValue) {
  if (typeof obj == 'object') {
    if (Array.isArray(keys)) {
      let tmp = ''
      keys.forEach(k => {
        const v = GetObjVal(obj, k, null)
        if (!IsNull(v) && v != notEqual) {
          if (IsNull(tmp)) tmp = tmp.concat(v)
          else tmp = tmp.concat(symbol, v)
        }
      })
      if (!IsNull(tmp)) return tmp
    } else {
      let tmp = ''
      Object.keys(obj).forEach(key => {
        if (!IsNull(obj[key]) && obj[key] != notEqual) {
          if (IsNull(tmp)) tmp = tmp.concat(obj[key])
          else tmp = tmp.concat(symbol, obj[key])
        }
      })
      if (!IsNull(tmp)) return tmp
    }
  }
  return defaultValue
}

export function ObjValToKeyArr(obj) {
  const res = []
  Object.keys(obj).forEach(key => {
    res.push({
      value: obj[key],
      text: key
    })
  })
  return res
}

export function GetValue(val, defaultValue) {
  if (!IsNull(val)) {
    return val
  }
  return defaultValue
}

// ------- date time -------//
export function CreateDateTime(str) {
  if (!str) {
    return null
  } else {
    return new Date(str)
  }
};

export function GetMonth(val) {
  val = val + 1
  return val < 10 ? '0' + val : val
}

export function GetDay(val) {
  return val < 10 ? '0' + val : val
}

export function GetDate(d) {
  if (typeof d != 'object') {
    d = CreateDateTime(d)
  }
  try {
    return d.getFullYear() + '-' + GetMonth(d.getMonth()) + '-' + GetDay(d.getDate())
  } catch (ex) { }
  return null
}

export function GetDateView(str) {
  const d = CreateDateTime(str)
  if (d !== null) {
    return d.getDate() + '/' + GetMonth(d.getMonth()) + '/' + d.getFullYear()
  }
  return ''
}

export function GetDatePrint(str) {
  const d = CreateDateTime(str)
  if (d !== null) {
    return d.getDate() + ' ' + d.toLocaleString('en-us', { month: 'long' }) + ' ' + d.getFullYear()
  }
  return ''
}

export function GetDatePrintShort(str) {
  const d = CreateDateTime(str)
  if (d !== null) {
    return d.getDate() + '-' + d.toLocaleString('en-us', { month: 'short' }).toUpperCase() + '-' + d.getFullYear()
  }
  return ''
}

export function GetDateTimeView(str) {
  const d = CreateDateTime(str)
  if (d !== null) {
    return d.getDate() + '/' + GetMonth(d.getMonth()) + '/' + d.getFullYear() + ' ' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes())
  }
  return ''
}

export function GetDateTimeNumber(d, resetHour) { // resetHour = true 00:00:00, false = current hour
  let tmp = null
  if (typeof d == 'string') {
    d = CreateDateTime(d)
  }
  try {
    if (resetHour) {
      tmp = d.setHours(0, 0, 0, 0)
    } else {
      tmp = d.getTime()
    }
  } catch (ex) {

  }
  return tmp
};

export function dateDiff(startDate, endDate = new Date().getTime()) { // lone
  const diff = Math.abs(startDate - endDate)
  return secondToText(diff) + ' ago'
};

export function secondToText(second) {
  const days = Math.floor(second / (60 * 60 * 24 * 1000))
  const hours = Math.floor(second / (60 * 60 * 1000)) - (days * 24)
  const minutes = Math.floor(second / (60 * 1000)) - ((days * 24 * 60) + (hours * 60))
  const seconds = Math.floor(second / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60))

  if (days > 0) {
    const week = Math.floor(days / 7)
    if (week > 0) {
      const month = Math.floor(week / 4)
      if (month > 0) return month + (month == 1 ? ' month' : ' months')
      return week + (week == 1 ? ' week' : ' weeks')
    }
    return days + (days == 1 ? ' day' : ' days')
  } else {
    if (hours > 0) {
      return hours + (hours == 1 ? ' hour' : ' hours')
    } else {
      if (minutes < 1) {
        return seconds + (seconds == 1 ? ' second' : ' seconds')
      } else {
        return minutes + (minutes == 1 ? ' minute' : ' minutes')
      }
    }
  }
}

export function GetRunningCode(num, digi) {
  let codeTmp = ''
  const max = 10 + 26
  let val = num = Number(num)
  do {
    num = val % max
    val = parseInt(val / max)
    codeTmp = num < 10 ? String(num) : String.fromCharCode(num + 55) + codeTmp
  } while (val > 0)
  for (let i = codeTmp.length; i < digi; i++) {
    codeTmp = '0' + codeTmp
  }
  return codeTmp
};

export function GetCodeRunning(num, digi) {
  let codeTmp = num + ''
  for (let i = codeTmp.length; i < digi; i++) {
    codeTmp = '0' + codeTmp
  }
  return codeTmp
};

export function GetObjArr(obj, keys, defaultValue) {
  if (Array.isArray(obj)) {
    if (keys) return obj.map(x => GetObjVal(x, keys))
    else return obj
  }
  if (keys) return GetObjVal(obj, keys) ? [GetObjVal(obj, keys)] : defaultValue
  return IsNull(obj) ? [] : [obj]
};

export function GetArrObj(arr, keys) {
  if (Array.isArray(arr)) {
    if (keys) return arr.map(x => GetObjVal(x, keys))
    else return arr[arr.length - 1]
  }
  if (keys) return GetObjVal(arr, keys)
  return arr
};

export function GetLastUpdate(obj) {
  return GetDateView(obj.timestamp) + (!obj.updateBy ? '' : ' - ' + obj.updateBy)
};

export function GetApprovedBy(obj) {
  return GetDateView(obj.timestamp) + (!obj.by ? '' : ' - ' + obj.by)
};

export function GetTimeLastUpdate(obj) {
  return GetDateTimeView(obj.timestamp) + (!obj.updateBy ? '' : ' - ' + obj.updateBy)
};

export function GetLastUpdateBy(obj) {
  return GetDateView(obj.timestamp) + (!obj.by ? '' : ' - ' + obj.by)
};

export function GetTimeLastUpdateBy(obj) {
  return GetDateTimeView(obj.timestamp) + (!obj.by ? '' : ' - ' + obj.by)
};

export function GetRangeSeq(arr) {
  const tmp = ObjCopy(arr)
  let lastSeq = tmp[0]
  for (let i = 1; i < tmp.length; i++) {
    if (lastSeq + 1 == tmp[i]) {
      lastSeq = tmp[i]
      tmp[i] = tmp[i + 1] == lastSeq + 1 ? null : tmp[i]
    } else {
      lastSeq = tmp[i]
    }
  }
  return tmp.join(',').replace(/[,]{2,}/g, ' - ')
};

export function FileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
};

export function FileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result)
    }
    reader.readAsArrayBuffer(file)
  })
};

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
// Use a lookup table to find the index.
var lookup = new Uint8Array(256)
for (let i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i
}
export function ArrayBufferToBase64(arraybuffer) {
  const bytes = new Uint8Array(arraybuffer); let i; const len = bytes.length; let base64 = ''
  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2]
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)]
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)]
    base64 += chars[bytes[i + 2] & 63]
  }
  if ((len % 3) === 2) {
    base64 = base64.substring(0, base64.length - 1) + '='
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + '=='
  }
  return base64
};

export function Base64ToArrayBuffer(base64) {
  let bufferLength = base64.length * 0.75; const len = base64.length; let i; let p = 0; let encoded1; let encoded2; let encoded3; let encoded4
  if (base64[base64.length - 1] === '=') {
    bufferLength--
    if (base64[base64.length - 2] === '=') {
      bufferLength--
    }
  }
  const arraybuffer = new ArrayBuffer(bufferLength); const bytes = new Uint8Array(arraybuffer)
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)]
    encoded2 = lookup[base64.charCodeAt(i + 1)]
    encoded3 = lookup[base64.charCodeAt(i + 2)]
    encoded4 = lookup[base64.charCodeAt(i + 3)]
    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4)
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2)
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63)
  }
  return arraybuffer
};

export function saveExcelFile(csvContent, fileName) {
  const D = document
  const a = D.createElement('a')
  const strMimeType = 'application/octet-stream;charset=utf-8'
  let rawFile

  if ('download' in a) {
    const blob = new Blob(['', csvContent], { type: strMimeType })
    rawFile = URL.createObjectURL(blob)
    a.setAttribute('download', fileName + '.xlsx')
  } else {
    rawFile = 'data:' + strMimeType + ',' + encodeURIComponent(csvContent)
    a.setAttribute('target', '_blank')
  }
  a.href = rawFile
  a.setAttribute('style', 'display:none;')
  D.body.appendChild(a)
  setTimeout(() => {
    if (a.click) {
      a.click()
    } else if (document.createEvent) {
      var eventObj = document.createEvent('MouseEvents')
      eventObj.initEvent('click', true, true)
      a.dispatchEvent(eventObj)
    }
    D.body.removeChild(a)
  }, 100)
};

export function outerHTML(node) {
  return node.outerHTML || (function (n) {
    var div = document.createElement('div'); var h
    div.appendChild(n)
    h = div.innerHTML; div = null; return h
  })(node)
}

export function addTag(name, attributes, sync) {
  const headEl = document.getElementsByTagName('head')[0]
  const el = document.createElement(name); let attrName
  for (attrName in attributes) {
    el.setAttribute(attrName, attributes[attrName])
  }
  sync ? document.write(outerHTML(el)) : headEl.appendChild(el)
};

// chk
export function IsNull(val) {
  return val === undefined || val === '' || ''.concat(val).trim() === '' || val === null
}

// math
export function number(value, decimal) {
  if (isNaN(value) || IsNull(value)) return null
  if (decimal) {
    value = Number(value) == 0 ? value.toString() : Round(Number(value), decimal).toFixed(decimal)
  } else {
    value = value.toString()
  }
  const val = value.split('.')
  if (val.length > 1) {
    return val[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + val[1]
  }
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
};

export function Round(num, places = 0) {
  return +(Math.round(num + 'e+' + places) + 'e-' + places)
};

export function genShippingMark(data, dynamic) {
  const canvas = document.createElement('canvas')
  canvas.width = 364
  canvas.height = 364

  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = 'normal 14pt Arial'
  ctx.textBaseline = 'bottom'
  ctx.textAlign = 'start'
  ctx.fillText('{DATE}', 10, 26.561)

  if (data.showMadeinThai) {
    ctx.textAlign = 'end'
    ctx.fillText('MADE IN THAILAND', 354.8, 26.561)
  }

  ctx.textAlign = 'center'
  ctx.font = 'normal 12pt Arial'
  ctx.fillText(`- ${data.code} SHIPPING MARK -`, 182.448, 62.097)

  ctx.font = 'bold 20pt Arial'
  ctx.fillText('B/NO..................................', 182.448, 346.344)

  ctx.beginPath()
  // top left
  ctx.moveTo(89.8, 31.217)
  ctx.lineTo(10, 31.217)
  ctx.lineTo(10, 72.783)

  // top right
  ctx.moveTo(275, 31.217)
  ctx.lineTo(354.8, 31.217)
  ctx.lineTo(354.8, 72.783)

  // bottom left
  ctx.moveTo(10, 313.217)
  ctx.lineTo(10, 354)
  ctx.lineTo(89.8, 354)

  // bottom right
  ctx.moveTo(275, 354)
  ctx.lineTo(354, 354)
  ctx.lineTo(354, 313.217)
  ctx.stroke()

  const horizontal = {
    L: 6.834,
    C: 182.448,
    R: 357.967
  }
  const vertical = {
    T: 107,
    M: 193,
    B: 287
  }
  const line = 60; const maxWidth = 350

  ctx.textBaseline = 'middle'
  ctx.textAlign = data.textHorAlign == 'L' ? 'left' : data.textHorAlign == 'R' ? 'right' : 'center'

  if (data.description) {
    const tmp = (dynamic ? data.description.replace(/{DYNAMIC}/g, dynamic) : data.description).split(/[\n]/g)
    tmp.forEach((d, i) => {
      let fontSize = 40
      do {
        ctx.font = `bold ${fontSize}pt Arial`
        fontSize--
      } while (ctx.measureText(d).width > maxWidth)

      let ver = vertical[data.textVerAlign]
      if (data.textVerAlign == 'T') ver = ver + (line * i)
      else if (data.textVerAlign == 'B') ver = ver - (line * ((tmp.length - 1) - i))
      else {
        const m = (tmp.length / 2) - 0.5
        if (i < m) {
          ver = ver - ((line * ((tmp.length - 1) - i - i)) / 2)
        } else if (i > m) {
          ver = ver + ((line * (i == 2 && tmp.length == 4 ? 1 : i)) / 2)
        }
      }
      ctx.fillText(d, horizontal[data.textHorAlign], ver)
    })
  }
  return canvas.toDataURL()
};

export function orderKeyRearrange(arrangeBy, item, showTotalGroup) {
  const orderKey = []
  GetObjArr(arrangeBy).forEach(k => {
    if (k.code == 'ProductType') {
      orderKey.push(GetObjVal(item.product, 'productType.code'))
    } else if (k.code == 'KnotType') {
      orderKey.push(GetObjVal(item.product, 'nets.knotType.code'))
    } else if (k.code == 'Stetching') {
      orderKey.push(GetObjVal(item.product, 'nets.stretching.code'))
    } else if (k.code == 'TwineSeries') {
      orderKey.push(GetObjVal(item.product, 'twine.productTwineSeries.twineSeries.description'))
    } else if (k.code == 'Selvage') {
      orderKey.push(GetObjVal(item.product, 'nets.productSelvage.selvage.description'))
    } else if (k.code == 'TwineNo') {
      orderKey.push(GetObjVal(item.product, 'productTwineNo.code'))
    } else if (k.code == 'Color') {
      orderKey.push(GetObjVal(item.product, 'productColor.codeStd'))
    } else if (k.code == 'Label') {
      orderKey.push(GetObjVal(item.productPackage, 'packingLabel.code'))
    } else if (k.code == 'Meshdepth') {
      orderKey.push(GetObjVal(item.product, 'nets.productMeshDepth.meshDepthProd'))
    } else if (k.code == 'AssemblyType') {
      orderKey.push(GetObjVal(item.product, 'nets.assemblyType.codeStd'))
    } else if (k.code == 'Length') {
      orderKey.push(GetObjVal(item.product, 'nets.productLength.lengthProd'))
    } else if (k.code == 'ShippingMark') {
      orderKey.push(GetObjVal(item.productPackage, 'shippingMark._description'))
    }
  })
  if (showTotalGroup) {
    orderKey.push(item.salesUnit.symbol)
  }
  return orderKey.join('_')
}

export function orderKeyPrintFormat(documentGroups, item, showTotalGroup) {
  const orderKey = []; let preTextGroup = ''
  GetObjArr(documentGroups).forEach(k => {
    if (k.tagGroup.code == 'ProductType') {
      orderKey.push(GetObjVal(item.product, 'productType.code'))
      if (k.showDetail) preTextGroup += GetObjVal(item.product, 'productType.description') ? ''.concat(GetObjVal(item.product, 'productType.description'), ' ') : ''
    } else if (k.tagGroup.code == 'KnotType') {
      orderKey.push(GetObjVal(item.product, 'nets.knotType.code'))
      if (k.showDetail) preTextGroup += GetObjVal(item.product, 'nets.knotType.codeStd') ? ''.concat(GetObjVal(item.product, 'nets.knotType.codeStd'), ' ') : ''
    } else if (k.tagGroup.code == 'Stetching') {
      orderKey.push(GetObjVal(item.product, 'nets.stretching.code'))
      if (k.showDetail) preTextGroup += GetObjVal(item.product, 'nets.stretching.description') ? ''.concat(GetObjVal(item.product, 'nets.stretching.description'), ' ') : ''
    } else if (k.tagGroup.code == 'TwineSeries') {
      orderKey.push(GetObjVal(item.product, 'twine.productTwineSeries.twineSeries.description'))
      if (k.showDetail) preTextGroup += GetObjVal(item.product, 'twine.productTwineSeries.twineSeries.description') ? (IsNull(preTextGroup) ? '' : '\n').concat(GetObjVal(item.product, 'twine.productTwineSeries.twineSeries.description'), ' ') : ''
    } else if (k.tagGroup.code == 'Selvage') {
      orderKey.push(GetObjVal(item.product, 'nets.productSelvage.selvage.description'))
      if (k.showDetail) preTextGroup += GetObjVal(item.product, 'nets.productSelvage.selvage.description') ? (IsNull(preTextGroup) ? '' : '\n').concat('Selvage: ', GetObjVal(item.product, 'nets.productSelvage.selvage.description'), ' ') : ''
    } else if (k.tagGroup.code == 'TwineNo') {
      orderKey.push(GetObjVal(item.product, 'productTwineNo.code'))
      if (k.showDetail) preTextGroup += GetObjVal(item.product, 'productTwineNo.codeStd') ? ''.concat(GetObjVal(item.product, 'productTwineNo.codeStd'), ' ') : ''
    } else if (k.tagGroup.code == 'Color') {
      orderKey.push(GetObjVal(item.product, 'productColor.codeStd'))
      if (k.showDetail) preTextGroup += GetObjVal(item.product, 'productColor.description') ? ''.concat(GetObjVal(item.product, 'productColor.description'), ' ') : ''
    } else if (k.tagGroup.code == 'Label') {
      orderKey.push(GetObjVal(item.productPackage, 'packingLabel.code'))
      if (k.showDetail) preTextGroup += GetObjVal(item.productPackage, 'packingLabel.description') ? (IsNull(preTextGroup) ? '' : '\n').concat('Label: ', GetObjVal(item.productPackage, 'packingLabel.description'), ' ') : ''
    } else if (k.tagGroup.code == 'Meshdepth') {
      orderKey.push(GetObjVal(item.product, 'nets.productMeshDepth.meshDepthProd'))
      if (k.showDetail) preTextGroup += GetObjVal(item.product, 'nets.productMeshDepth.meshDepthProd') ? ''.concat(GetObjVal(item.product, 'nets.productMeshDepth.meshDepthProd'), '') : ''
    } else if (k.tagGroup.code == 'AssemblyType') {
      orderKey.push(GetObjVal(item.product, 'nets.assemblyType.codeStd'))
      if (k.showDetail) preTextGroup += GetObjVal(item.product, 'nets.assemblyType.description') ? (IsNull(preTextGroup) ? '' : '\n').concat('Assembly: ', GetObjVal(item.product, 'nets.assemblyType.description'), '') : ''
    } else if (k.tagGroup.code == 'Length') {
      orderKey.push(GetObjVal(item.product, 'nets.productLength.lengthProd'))
      if (k.showDetail) preTextGroup += GetObjVal(item.product, 'nets.productLength.lengthProd') ? ''.concat(GetObjVal(item.product, 'nets.productLength.lengthProd'), '') : ''
    } else if (k.tagGroup.code == 'ShippingMark') {
      orderKey.push(GetObjVal(item.productPackage, 'shippingMark._description'))
      if (k.showDetail) preTextGroup += GetObjVal(item.productPackage, 'shippingMark._description') ? (IsNull(preTextGroup) ? '' : '\n').concat('Shipping Mark: ', GetObjVal(item.productPackage, 'shippingMark._description'), ' ') : ''
    }
  })
  if (showTotalGroup) {
    orderKey.push(item.salesUnit.symbol)
  }
  return { orderKey: orderKey.join('_'), preTextGroup: preTextGroup }
}

export function getTwineNoRange(fromTwineNo, toTwineNo) {
  let res = ''
  if (fromTwineNo == toTwineNo) {
    res = fromTwineNo
  } else if (!IsNull(fromTwineNo) && IsNull(toTwineNo)) {
    res = fromTwineNo.concat(' ', 'Up')
  } else if (IsNull(fromTwineNo) && !IsNull(toTwineNo)) {
    res = toTwineNo.concat(' ', 'Down')
  } else if (!IsNull(fromTwineNo) && !IsNull(toTwineNo)) {
    res = fromTwineNo.concat(' - ', toTwineNo)
  }
  return res
}

export function getShippingMark(shippingMark, shippingMarkText) {
  var str = shippingMarkText ? shippingMark.description.replace(/{DYNAMIC}/g, shippingMarkText) : shippingMark.description
  str = str.replace(/[\t\n]/g, ' ').trim()
  shippingMark._description = str.split(' ').map(v => (v || '').trim()).filter(v => !IsNull(v)).join(' ')
}

export function getStringInLine(str) {
  str = str.replace(/[\t\n]/g, ' ').trim()
  return str.split(' ').map(v => (v || '').trim()).filter(v => !IsNull(v)).join(' ')
}
