// Number.prototype.padLeft = (base, chr) => {
//   let len = (String(base || 10).length - String(this).length) + 1
//   return len > 0 ? new Array(len).join(chr || '0') + this : this
// }
export default {
  data () {
    return {
      uid: window.localStorage.getItem('personUID')
    }
  },
  filters: {
    comparationDate (_date) {
      /* let lng = (this.language === 'es') ? 'es' : 'en' */
      let oneDay = 24 * 60 * 60 * 1000
      let secondDate = Date.now()
      let diffDays = Math.round(Math.abs((_date - secondDate) / (oneDay)))
      if (diffDays === 0) {
        return moment(_date).format('hh:mm a')
      } else if (diffDays > 0 && diffDays <= 6) {
        return moment(_date).format('dddd')
      } else if (diffDays > 6) {
        return moment(_date).format('MMM Do')
      }
    },
    hours (date) {
      return moment(date).format('hh:mm a')
    },
    year (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  methods: {
    yymmdd (_date) {
      var mm = _date.getMonth() + 1
      var dd = _date.getDate()
      return [
        (dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        _date.getFullYear()
      ].join('/')
    },
    isDataNull (_val) {
      return (_val === undefined || _val == null || _val.length <= 0) ? 1 : 0
    },
    isObject (obj) {
      return obj !== null && typeof obj === 'object'
    },
    isArray (val) {
      return (!!val) && (val.constructor === Array)
    },
    ltrim7 (str, filter) {
      let i = str.length
      filter || (filter = '')
      for (var k = 0; k < i && this.filtering(str.charAt(k), filter); k++) {
        return str.substring(k, i)
      }
    },
    filtering (charToCheck, filter) {
      filter || (filter = ' \t\n\r\f')
      return (filter.indexOf(charToCheck) !== -1)
    },
    validateDate (_ExpiryDate) {
      if (_ExpiryDate.length !== 10) {
        return false
      }
      if (_ExpiryDate.substring(2, 3) !== '/' || _ExpiryDate.substring(5, 6) !== '/') {
        return false
      }
      let day = _ExpiryDate.substring(0, 2) - 0
      let month = _ExpiryDate.substring(3, 5) - 1
      let year = _ExpiryDate.substring(6, 10) - 0
      if (year < 1000 || year > 3000) {
        return false
      }
      if (month > 12) {
        return false
      }
      let mSeconds = (new Date(year, month, day)).getTime()
      let objDate = new Date()
      objDate.setTime(mSeconds)
      if (objDate.getFullYear() !== year || objDate.getMonth() !== month || objDate.getDate() !== day) {
        return false
      }
      return true
    }
  }
}
