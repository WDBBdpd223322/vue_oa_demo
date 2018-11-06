export default {
  data () {
    return {
      rightsList: []
    }
  },
  filters: {
    levelFilter (val) {
      switch (val) {
        case '0':
          return '一级'
        case '1':
          return '二级'
        default:
          return '三级'
      }
    }
  },
  async created () {
    const res = await this.$http.get('/rights/list')
    const {data, meta} = res.data
    if (meta.status === 200) {
      this.rightsList = data
    }
  }
}
