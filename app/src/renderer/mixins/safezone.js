export default {
  methods: {
    deleteSafeZone (_key) {
      const _safe = this.safezone
      _safe.forEach((val, _inx) => {
        if (val._key === _key) {
          _safe.splice(_inx, 1)
          return
        }
      })
    },
    fetchSafeZone () {
      this.safezone = []
      this.$safezone.once('value', d => {
        if (!d.exists()) this.responseSafeZone = true
      })
      this.$safezone.on('child_added', d => {
        // console.log(d.val())
        let _data = d.val()
        _data['_key'] = d.key
        this.safezone.push(_data)
        if (!this.responseSafeZone) this.responseSafeZone = true
      })
      this.$safezone.on('child_changed', d => {
        let _data = d.val()
        this.safezone.forEach(val => {
          if (val._key === d.key) {
            val.name = _data.name
            val.picture = _data.picture
            return
          }
        })
      })
      this.$safezone.on('child_removed', d => {
        this.deleteSafeZone(d.key)
      })
    }
  }
}
