var promiseDef = require('./promise')

module.exports = function (options) {
  if (typeof options != 'object') {
    throw ('options 必须为对象，请参考文档')
  }

  var Promise = Promise ? Promise : promiseDef

  var url = options.url
  var param = options.param || null
  var callbackParamName = options.callbackParamName
  var timeout = options.timeout
  return new Promise(function (resolve) {
    var time = new Date().getTime()
    var callbacked = false
    var jsonpCallbackName = 'JSONP_WINDOW_FUNC' + randomString()
    var setInt = setTimeout(function () {
      if (!callbacked) {
        console.log('请求超时:' + (new Date().getTime() - time))
        callbacked = true
        resolve({
          err: 'timeout'
        })
        setInt = null
      }
    }, timeout || 3000)
    var callbackFunc = function (data) {
      if (callbacked) {
        delete window[jsonpCallbackName]
        return
      }
      clearInterval(setInt)
      resolve({
        err: null,
        data: data
      })
      callbacked = true
      delete window[jsonpCallbackName]
    }
    callbackParamName = callbackParamName || 'jsonp'
    var jsonp = function (url, _callback) {
      var jsonpScript = document.createElement('script')
      var andString = '?'
      if (/\?/.test(url)) {
        andString = '&'
      }
      var getQuery = param ? JSON.parse(JSON.stringify(param)) : {}
      getQuery[callbackParamName] = _callback
      var getstring = qsStringify(getQuery)
      jsonpScript.setAttribute('src', `${url}${andString}${getstring}`)
      document.getElementsByTagName('head')[0].appendChild(jsonpScript)
    }
    window[jsonpCallbackName] = callbackFunc
    jsonp(url, jsonpCallbackName)
  })
}

function randomString (len) {
  len = len || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = $chars.length
  var pwd = ''
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd + new Date().getTime()
}

function qsStringify (obj, sep, eq) {
  sep = sep || '&'
  eq = eq || '='
  var str = ''
  for (var k in obj) {
    str += k + eq + unescape(obj[k]) + sep
  }
  return str.slice(0, -1)
}