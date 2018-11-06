export default {
  data () {
    return {
      searchText: '',
      goodsList: [],
      goodsObj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0
    }
  },
  methods: {
    async getGoodsList () {
      const res = await this.$http.get('/goods', {
        params: this.goodsObj
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.goodsList = data.goods
        this.total = data.total
      }
    },
    queryGoods () {
      this.goodsObj.query = this.searchText
    },
    handleSizeChange (val) {
      this.goodsObj.pagesize = val
    },
    handleCurrentChange (val) {
      this.goodsObj.pagenum = val
    },
    addGoods () {
      this.$router.push({
        path: '/goodsAdd/0'
      })
    },
    updateGoods (info) {
      this.$router.push({
        path: `/goodsAdd/${info.goods_id}`
      })
    },
    delGoods (id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/goods/${id}`)
        const {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: meta.msg
          })
          this.getGoodsList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  watch: {
    goodsObj: {
      handler () {
        this.getGoodsList()
      },
      deep: true
    }
  },
  created () {
    this.getGoodsList()
  }
}
