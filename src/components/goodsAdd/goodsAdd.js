import auth from '@/assets/js/auth.js'
export default {
  data () {
    return {
      id: this.$route.params.id,
      activeName: 'first',
      activeNum: 0,
      goodesInfo: {},
      categoryList: [],
      categoryObj: {
        children: 'children',
        label: 'cat_name',
        value: 'cat_id'
      },
      goods_cat: [],
      goodsRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      },
      firstFinish: false,
      secondMany: {},
      secondFinish: false,
      thirdOnly: [],
      thirdFinish: false,
      uploadImgHeader: {
        Authorization: auth.getToken()
      },
      fileList: [],
      picList: [],
      fourthObj: {},
      editorOption: {}
    }
  },
  methods: {
    async getCategoriesList () {
      const res = await this.$http.get('/categories')
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.categoryList = data
      }
    },
    async getGoodsInfoById (id) {
      const res = await this.$http.get(`/goods/${id}`)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.goodesInfo = data
        data.pics.forEach(item => {
          this.fileList.push({
            name: '商品图片',
            url: item.pics_sma_url
          })
        })
        this.goods_cat.push(data.cat_one_id)
        this.goods_cat.push(data.cat_two_id)
        this.goods_cat.push(data.cat_three_id)
        this.picList = this.fileList
      }
    },
    async tabClick (tab) {
      if (tab.index - 0 !== 0) {
        this.$refs.ruleGoods.validate(res => {
          if (!res || this.goods_cat.length !== 3) {
            this.$message({
              type: 'error',
              message: '请完整填写商品基本信息'
            })
          } else {
            this.firstFinish = true
          }
        })
        if (tab.index - 0 === 1) {
          if (this.goods_cat.length === 3) {
            const res = await this.$http.get(`/categories/${this.goods_cat[2]}/attributes`, { params: { sel: 'many' } })
            const {data, meta} = res.data
            if (meta.status === 200) {
              data.forEach(item => {
                item.attr_vals = item.attr_vals.split(',')
              })
              this.secondMany = data
              this.secondFinish = true
            }
          }
        }
        if (tab.index - 0 === 2) {
          if (this.goods_cat.length === 3) {
            const res = await this.$http.get(`/categories/${this.goods_cat[2]}/attributes`, { params: { sel: 'only' } })
            const {data, meta} = res.data
            if (meta.status === 200) {
              this.thirdOnly = data
              this.thirdFinish = true
            }
          }
        }
      } else {
        if (!this.id) {
          this.$refs.ruleGoods.resetFields()
        }
      }
      this.activeNum = tab.index - 0
    },
    manyClose (info, index) {
      info.attr_vals.splice(index, 1)
    },
    handleChange () {},
    handlePreview () {},
    handleRemove (res) {
      const {data, meta} = res.response
      if (meta.status === 200) {
        this.picList.forEach((item, index, arr) => {
          if (item.pic === data.tmp_path) {
            arr.splice(index, 1)
          }
        })
      }
    },
    handleSuccess (res) {
      const {data, meta} = res
      if (meta.status === 200) {
        this.picList.push({
          pic: data.tmp_path
        })
      }
    },
    onEditorBlur () {},
    onEditorFocus () {},
    onEditorReady () {},
    onEditorChange () {},
    addGoods () {
      this.$refs.ruleGoods.validate(async res => {
        if (res) {
          if (this.id - 0 === 0) {
            if (!this.secondFinish) {
              this.$message({
                type: 'error',
                message: '您还没有选择商品参数'
              })
              return
            }
            if (!this.thirdFinish) {
              this.$message({
                type: 'error',
                message: '您还没有选择商品属性'
              })
              return
            }
            this.goodesInfo.goods_cat = this.goods_cat.toString()
            const currentArr = []
            this.secondMany.forEach(item => {
              currentArr.push({
                attr_id: item.attr_id,
                attr_value: item.attr_vals.toString()
              })
            })
            this.thirdOnly.forEach(item => {
              currentArr.push({
                attr_id: item.attr_id,
                attr_value: item.attr_vals
              })
            })
            this.goodesInfo.attrs = currentArr
          }
          this.goodesInfo.pics = this.picList
          if (this.id - 0 === 0) {
            const res = await this.$http.post('/goods', this.goodesInfo)
            const {meta} = res.data
            if (meta.status === 201) {
              this.$message({
                type: 'success',
                message: meta.msg
              })
              setTimeout(() => {
                this.$router.push('/goods')
              }, 1000)
            }
          } else {
            const res = await this.$http.put(`/goods/${this.id}`, this.goodesInfo)
            const {meta} = res.data
            if (meta.status === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              setTimeout(() => {
                this.$router.push('/goods')
              }, 1000)
            }
          }
        } else {
          this.$message({
            type: 'error',
            message: '您还没有完成商品基本信息'
          })
        }
      })
    }
  },
  filters: {
    fil (val) {
      return !(val - 0) ? '添加商品' : '编辑商品'
    }
  },
  async created () {
    this.getCategoriesList()
    if (this.id) {
      this.getGoodsInfoById(this.id)
    }
  }
}
