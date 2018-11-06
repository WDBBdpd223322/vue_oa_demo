export default {
  data () {
    return {
      categoryList: [],
      loading: true,
      categoryParams: {
        pagenum: 1,
        pagesize: 10
      },
      categoryAdd: false,
      categoryUpdate: false,
      categoryInfo: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      categoryObj: {
        children: 'children',
        label: 'cat_name',
        value: 'cat_id'
      },
      total: 100,
      category: [],
      cateId: 0,
      defaultCate: []
    }
  },
  methods: {
    async getCategoryGoods () {
      const res = await this.$http.get('/categories', {
        params: this.categoryParams
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.categoryList = data.result
        this.loading = false
        this.total = data.total
      }
    },
    async addCategory () {
      const res = await this.$http.get('categories')
      const {data, meta} = res.data
      if (meta.status === 200) {
        data.forEach(item => {
          if (item.children) {
            item.children.forEach(item2 => {
              delete item2.children
            })
          }
        })
        this.category = data
        this.categoryAdd = true
      }
    },
    handleChange (val) {
      this.cateId = val[val.length - 1]
    },
    async addCategoryEvent () {
      if (!this.categoryInfo.cat_name.trim()) {
        this.$message({
          type: 'warning',
          message: '请填写分类名称'
        })
        return
      }
      if (this.cateId !== 0) {
        const res = await this.$http.get(`/categories/${this.cateId}`)
        const {data, meta} = res.data
        if (meta.status === 200) {
          this.categoryInfo.cat_pid = data.cat_id
          this.categoryInfo.cat_level = data.cat_level + 1
        }
      } else {
        this.categoryInfo.cat_pid = 0
        this.categoryInfo.cat_level = 0
      }
      const res = await this.$http.post('/categories', this.categoryInfo)
      const {meta} = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '创建分类成功'
        })
        this.categoryAdd = false
        this.getCategoryGoods()
      }
    },
    close () {
      this.categoryInfo.cat_name = ''
      this.categoryInfo.cat_level = 0
      this.categoryInfo.cat_pid = 0
      this.cateId = 0
      this.defaultCate = []
    },
    async updateCate (info) {
      this.categoryInfo.cat_level = info.cat_level
      this.categoryInfo.cat_pid = info.cat_pid
      this.cateId = info.cat_id
      this.defaultCate.push(info.cat_pid)
      if (info.cat_level === 2) {
        const res = await this.$http.get(`/categories/${info.cat_pid}`)
        const {data, meta} = res.data
        if (meta.status === 200) {
          this.defaultCate.unshift(data.cat_pid)
        }
      }
      this.categoryInfo.cat_name = info.cat_name
      const res = await this.$http.get('categories')
      const {data, meta} = res.data
      if (meta.status === 200) {
        data.forEach(item => {
          if (item.children) {
            item.children.forEach(item2 => {
              delete item2.children
            })
          }
        })
        this.category = data
        this.categoryUpdate = true
      }
    },
    async categoryUpdateEvent () {
      const res = await this.$http.put(`categories/${this.cateId}`, this.categoryInfo)
      const {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: meta.msg
        })
        this.categoryUpdate = false
        this.getCategoryGoods()
      }
    },
    delCate (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`categories/${id}`)
        const {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: meta.msg
          })
          this.getCategoryGoods()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange (val) {
      this.categoryParams.pagesize = val
    },
    handleCurrentChange (val) {
      this.categoryParams.pagenum = val
    }
  },
  watch: {
    categoryParams: {
      handler () {
        this.loading = true
        this.getCategoryGoods()
      },
      deep: true
    }
  },
  created () {
    this.getCategoryGoods()
  }
}
