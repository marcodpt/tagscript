var Tags = {}

var escapeHtml = function (unsafe) {
  var t = typeof unsafe
  return (t == 'number' || t == 'string' ? String(unsafe) : '')
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .split("\n").join("&#13;&#10;")
}

var camelToKebab = function (string) {
  return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase()
}

var ident = function (pre, V, pos, max) {
  var div = '\n  '
  var a = '\n  '
  var b = '\n'
  if (max > 0) {
    var len = V.reduce(function (l, v) {
      return l + v.length
    }, 0)
    if (len < max) {
      var div = ' '
      var a = pre.substr(pre.length - 1) == '"' ? '' : ' '
      var b = ''
    }
  }

  return pre+a+V.map(function (v) {
    return v.split('\n').join('\n  ')
  }).join(div)+b+pos
}

var maxLine = 50

var h = function (tagName, attributes, children) {
  var X = Object.keys(attributes || {}).map(function (name) {
    var v = attributes[name]
    var n = camelToKebab(name)
    if (v == null || v === false) {
      return ''
    } else if (v === true) {
      return n
    } else if (v instanceof Array && n == 'class') {
      var X = v.filter(function (cls) {
        return typeof cls == 'string' && cls.length
      })
      return X.length ? ident(n+'="', X, '"', maxLine) : ''
    } else if (typeof v === 'object' && n == 'style') {
      var X = Object.keys(v).map(function (css) {
        if ((['boolean', 'number', 'string']).indexOf(typeof v[css]) != -1) {
          var s = String(v[css])
          return s.length ? camelToKebab(css)+': '+s+';' : ''
        } else {
          return ''
        }
      }).filter(function (v) {
        return v.length > 0
      })
      return X.length ? ident(n+'="', X, '"', maxLine) : ''
    } else if (typeof v == 'string' || typeof v == 'number'){
      var s = String(v)
      return n+'="'+s+'"'
    } else {
      return ''
    }
  }).filter(function (attr) {
    return attr.length > 0
  })

  html = '<'+tagName
  if (X.length) {
    html = ident(html, X, '', maxLine)
  }

  if (children instanceof Array) {
    children = children.filter(function (v) {
      return typeof v == 'string' && v.length
    })
  }

  if (children == null) {
    html += '/>'
  } else if (children instanceof Array && children.length) {
    var div = '\n  '
    html += ident('>', children, '</'+tagName+'>')
  } else {
    html += '>'+escapeHtml(children)+'</'+tagName+'>'
  }

  return html
}

var hSyntax = function (tagName, attributes, children) {
  if (
    children == null &&
    (typeof attributes != 'object' || attributes instanceof Array)
  ) {
    return [tagName, {}, attributes]
  } else {
    return [tagName, attributes, children]
  }
}

function run (tagName, attributes, children) {
  var H = hSyntax(tagName, attributes, children)
  if (typeof attributes == 'function') {
    Tags[tagName] = attributes
    return function (t, a, c) {
      return run(t, a, c)
    }
  } else if (Tags[H[0]]) {
    return Tags[H[0]](function (t, a, c) {
      return run(t, a, c)
    }, H[1], H[2])
  } else {
    return h(H[0], H[1], H[2])
  }
}

export const t = function (n, a, c) {
  return run(n, a, c)
}
