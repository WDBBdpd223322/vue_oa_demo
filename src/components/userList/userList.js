export default {
  data () {
    return {
      searchText: '',
      userAdd: false,
      userUpdate: false,
      roleUpdate: false,
      userInfo: {},
      roleInfo: {},
      userAddRule: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ]
      },
      userObj: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      roleList: [],
      total: 0
    }
  },
  methods: {
    close () {
      this.userAdd = false
      this.userUpdate = false
      this.userInfo = {}
    },
    userAddEvent (ref) {
      this.$refs[ref].validate(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '请稍等'
          })
          setTimeout(async () => {
            const res = await this.$http.post('/users', this.userInfo)
            const {meta} = res.data
            if (meta.status === 201) {
              this.$message({
                type: 'success',
                message: meta.msg
              })
              this.getUserList()
              this.userAdd = false
            }
          }, 1000)
        } else {
          this.$message({
            type: 'warning',
            message: '请按照规则填写表单'
          })
          this.userInfo = {}
        }
      })
    },
    async getUserList () {
      const res = await this.$http.get('/users', {
        params: this.userObj
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.userList = data.users
        this.total = data.total
      }
    },
    async updateState (val) {
      const res = await this.$http.put(`/users/${val.id}/state/${val.mg_state}`)
      const {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: meta.msg
        })
      }
    },
    update (info) {
      this.userInfo = info
      this.userUpdate = true
    },
    userUpdataEvent (ref) {
      this.$refs[ref].validate(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '请稍等'
          })
          setTimeout(async () => {
            const res = await this.$http.put(`/users/${this.userInfo.id}`, this.userInfo)
            const {meta} = res.data
            if (meta.status === 200) {
              this.userUpdate = false
              this.$message({
                type: 'success',
                message: meta.msg
              })
              this.getUserList()
            }
          }, 1000)
        } else {
          this.$message({
            type: 'warning',
            message: '请按照规则填写表单'
          })
          this.userInfo = {}
        }
      })
    },
    userDel (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/users/${id}`)
        const {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: meta.msg
          })
          this.getUserList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async updateRole (info) {
      this.roleUpdate = true
      this.roleInfo.username = info.username
      this.roleInfo.id = info.id
      const res = await this.$http.get('/roles')
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.roleList = data
      }
    },
    changeRole (id) {
      this.roleInfo.rid = id
    },
    async roleUpdateEvent () {
      if (!this.roleInfo.rid) {
        this.$message({
          type: 'warning',
          message: '请选择一个角色'
        })
        return
      }
      const res = await this.$http.put(`/users/${this.roleInfo.id}/role`, this.roleInfo)
      const {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: meta.msg
        })
        this.roleUpdate = false
        this.getUserList()
      }
    },
    handleSizeChange (val) {
      this.userObj.pagesize = val
    },
    handleCurrentChange (val) {
      this.userObj.pagenum = val
    },
    queryUser () {
      this.userObj.query = this.searchText
    }
  },
  watch: {
    userObj: {
      handler () {
        this.getUserList()
      },
      deep: true
    }
  },
  created () {
    this.getUserList()
  }
}
