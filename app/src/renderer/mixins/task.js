export default {
  methods: {
    queueTask (_d, _t) {
      let qt = this.qt.push({
        data: _d,
        _state: 'replication',
        type: _t
      }, d => { })

      this.qt.child(qt.key).on('value', d => {
        if (!d.val()) {
          this.returnQueueTask()
        }
      })
    }
  }
}
