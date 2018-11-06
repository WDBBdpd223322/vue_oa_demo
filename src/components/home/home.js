export default {
  data () {
    return {
      menuList: []
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const res = await this.$http.get('/menus')
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.menuList = data
      }
    }
  },
  created () {
    this.getMenuList()
  }
}
