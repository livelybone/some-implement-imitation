function MyPromise(fn) {
  var errObj = null;
  var timer = null;

  return new MyPromise(fn);

  function MyPromise(fn) {
    var that = this

    var _status = { resolve: 'resolve', reject: 'reject', pending: 'pending' }

    var _successFn = null, _failedFn = null

    var _result = ''

    that.status = 'pending'

    that.resolve = function (val) {
      if (!that.status) {
        that.status = _status.resolve
        _result = val
        if (_successFn) _successFn(val)
      }
    }

    that.reject = function (err) {
      if (!that.status) {
        that.status = _status.reject
        _result = err
        errObj = err
        if (_failedFn) _failedFn(err)
      }
    }

    that.then = function (successFn, failedFn) {
      var fnObj = [
        { type: 'successFn', fn: successFn },
        { type: 'failedFn', fn: failedFn },
      ];
      return new MyPromise(function (res, rej) {
        if (that.status === _status.resolve) {
          flat(fnObj[0], _result, res, rej)
        } else if (that.status === _status.reject) {
          flat(fnObj[1], _result, res, rej)
        } else {
          _successFn = function (result) {
            flat(fnObj[0], result, res, rej)
          }
          _failedFn = function (result) {
            flat(fnObj[1], result, res, rej)
          }
        }
      })
    }

    that.catch = function (failedFn) {
      return that.then('', failedFn);
    }

    execute();

    function execute() {
      if (typeof fn !== 'function') throw new Error('Parameter fn of MyPromise is not a function！')
      try {
        fn(that.resolve, that.reject)
      } catch (e) {
        that.reject(e);
      }
    }


    function deal(fnObj, result, res, rej) {
      if (typeof fnObj.fn === 'function') {
        try {
          res(fnObj.fn(result))
        } catch (e) {
          rej(e)
        }
      } else {
        (fnObj.type === 'failedFn' ? rej : res)(result)
      }
    }

    function flat(fnObj, result, res, rej) {
      if (fnObj.type === 'successFn') {
        if (res instanceof MyPromise) {
          res.then(function (val) {
            flat(val, fnObj, res, rej);
          }, function (err) {
            rej(err)
          })
        } else {
          deal(fnObj, result, res, rej);
        }
      } else {
        uncaught(fnObj);
        deal(fnObj, result, res, rej);
      }
    }

    function uncaught(fnObj) {
      if (typeof fnObj.fn !== 'function') {
        timer = setTimeout(function () {
          throw new Error('Uncaught reject value(' + errObj + '), since there have no function to catch error...')
        })
      } else {
        if (timer) clearTimeout(timer)
      }
    }
  }
}
