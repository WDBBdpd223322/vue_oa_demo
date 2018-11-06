export default {
  data () {
    return {
      msg: 'asdasd',
      // 级联选择器相关
      categoryList: [],
      selectedArr: [],
      categoryObj: {
        children: 'children',
        value: 'cat_id',
        label: 'cat_name'
      },
      // 动态参数相关
      manyattrList: [],
      onlyattrList: [],
      manyChildList: [],
      currentAttr: '',
      inputVisible: false,
      manyId: 6,
      manyAttrAdd: false,
      manyAttrUpdate: false,
      onlyAttrAdd: false,
      onlyAttrUpdate: false,
      manyAttrObj: {
        attr_name: '',
        attr_sel: 'many',
        attr_vals: ''
      },
      manyAdd: {
        attr_name: [
          { required: true, message: '请填写参数名称', trigger: 'blur' }
        ],
        attr_vals: [
          { required: true, message: '请填写参数名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getCategoryList () {
      const res = await this.$http.get('/categories')
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.categoryList = data
      }
    },
    async getManyattrById (id) {
      const res = await this.$http.get(`categories/${id}/attributes`, {
        params: {
          sel: 'many'
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        data.forEach(item => {
          item.attr_vals = item.attr_vals.split(',')
          item.attr_vals.forEach((it, index, arr) => {
            if (it.length === 0) {
              arr.splice(index, 1)
            }
          })
        })
        this.manyattrList = data
      }
    },
    async getOnlyattrById (id) {
      const res = await this.$http.get(`categories/${id}/attributes`, {
        params: {
          sel: 'only'
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.onlyattrList = data
      }
    },
    tabsChange (val) {
      if (val.index - 0 === 0) {
        this.getManyattrById(this.manyId)
      } else {
        this.getOnlyattrById(this.manyId)
      }
    },
    handleChange (val) {
      if (val.length === 3) {
        const sel = val[2]
        this.manyId = sel
        this.getManyattrById(sel)
      }
    },
    // 添加动态参数
    addManyAttr () {
      this.manyAttrAdd = true
    },
    addManyAttrEvent (ref) {
      this.$refs[ref].validate(async res => {
        if (res) {
          const res = await this.$http.post(`categories/${this.manyId}/attributes`, this.manyAttrObj)
          console.log(res)
          const {meta} = res.data
          if (meta.status === 201) {
            this.$message({
              type: 'success',
              message: meta.msg
            })
            this.manyAttrAdd = false
            this.getManyattrById(this.manyId)
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请按照规则填写表单内容'
          })
        }
      })
    },
    updateManyAttr (info) {
      console.log(info)
      this.manyAttrObj.attr_name = info.attr_name
      this.manyAttrObj.attr_id = info.attr_id
      this.manyAttrUpdate = true
    },
    updateManyAttrEvent (ref) {
      this.$refs[ref].validate(async res => {
        if (res) {
          const res = await this.$http.put(`categories/${this.manyId}/attributes/${this.manyAttrObj.attr_id}`, this.manyAttrObj)
          console.log(res)
          const {meta} = res.data
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: meta.msg
            })
            this.manyAttrUpdate = false
            this.getManyattrById(this.manyId)
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请按照规则填写表单内容'
          })
        }
      })
    },
    close () {
      this.manyAttrObj.attr_name = ''
      this.manyAttrObj.attr_sel = 'many'
      this.$refs['mAdd'].resetFields()
    },
    async handleClose (val, info) {
      info.attr_vals.forEach((item, index, ary) => {
        if (item === val) {
          ary.splice(index, 1)
        }
      })
      info.attr_vals = info.attr_vals.toString()
      const res = await this.$http.put(`categories/${this.manyId}/attributes/${info.attr_id}`, info)
      const {data, meta} = res.data
      if (meta.status === 200) {
        info.attr_vals = data.attr_vals.split(',')
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
      }
    },
    async handleInputConfirm (info) {
      this.inputVisible = false
      if (this.currentAttr.trim()) {
        info.attr_vals.push(this.currentAttr.trim())
        info.attr_vals = info.attr_vals.toString()
        this.currentAttr = ''
        const res = await this.$http.put(`categories/${this.manyId}/attributes/${info.attr_id}`, info)
        const {data, meta} = res.data
        if (meta.status === 200) {
          info.attr_vals = data.attr_vals.split(',')
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }
      }
    },
    delManyAttr (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`categories/${this.manyId - 0}/attributes/${id - 0}`)
        console.log(res)
        const {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: meta.msg
          })
          this.getManyattrById(this.manyId)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showInput () {
      this.inputVisible = true
    },
    addOnlyattr () {
      this.onlyAttrAdd = true
      this.manyAttrObj.attr_sel = 'only'
    },
    addOnlyattrEvent (ref) {
      this.$refs[ref].validate(async res => {
        if (res) {
          const res = await this.$http.post(`categories/${this.manyId}/attributes`, this.manyAttrObj)
          const {meta} = res.data
          if (meta.status === 201) {
            this.getOnlyattrById(this.manyId)
            this.$message({
              type: 'success',
              message: '添加静态参数成功'
            })
            this.onlyAttrAdd = false
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请按照规则填写表单数据'
          })
        }
      })
    },
    updateOnlyAttr (info) {
      this.manyAttrObj = info
      this.onlyAttrUpdate = true
      console.log(this.manyAttrObj)
    },
    updateOnlyattrEvent (ref) {
      this.$refs[ref].validate(async res => {
        if (res) {
          const res = await this.$http.put(`categories/${this.manyId}/attributes/${this.manyAttrObj.attr_id}`, this.manyAttrObj)
          console.log(res)
          const {meta} = res.data
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: meta.msg
            })
            this.onlyAttrUpdate = false
            this.getOnlyattrById(this.manyId)
          }
        } else {
          this.message({
            type: 'warning',
            message: '请按照规则填写表单'
          })
        }
      })
    },
    delOnlyAttr (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`categories/${this.manyId - 0}/attributes/${id - 0}`)
        console.log(res)
        const {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: meta.msg
          })
          this.getOnlyattrById(this.manyId)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getCategoryList()
    this.getManyattrById(6)
  }
}
