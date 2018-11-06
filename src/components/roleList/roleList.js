export default {
  data () {
    return {
      msg: 'sadasdas',
      roleList: [],
      rights: false,
      addRole: false,
      updateRole: false,
      rightsList: [],
      rightsObj: {
        children: 'children',
        label: 'authName'
      },
      defaultRights: [],
      roleId: 0,
      roleObj: {},
      roleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getRoleList () {
      this.$http.get(`roles`).then(res => {
        const {data, meta} = res.data
        if (meta.status === 200) {
          this.roleList = data
        }
      })
    },
    rightsEvent (info) {
      this.roleId = info.id
      this.$http.get('rights/tree').then(res => {
        const {data: list, meta} = res.data
        if (meta.status === 200) {
          this.$http.get('roles').then(res => {
            const {data, meta} = res.data
            if (meta.status === 200) {
              data.forEach(item => {
                if (item.id === info.id) {
                  this.defaultRights = []
                  this.forEachArr(item)
                  this.rightsList = list
                  this.rights = true
                }
              })
            }
          })
        }
      })
    },
    forEachArr (data) {
      if (data.children) {
        data.children.forEach(item => {
          this.forEachArr(item)
        })
      } else {
        this.defaultRights.push(data.id)
      }
    },
    close () {
      this.defaultRights = []
      this.roleId = 0
      this.$refs['roleRule'].resetFields()
    },
    addRights () {
      this.$http.post(`roles/${this.roleId}/rights`, {
        rids: this.$refs.roleTree.getCheckedKeys().concat(this.$refs.roleTree.getHalfCheckedKeys()).toString()
      }).then(res => {
        const {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: meta.msg
          })
        }
        this.rights = false
        this.getRoleList()
      })
    },
    delRightsById (roleId, rightsId) {
      this.$http.delete(`roles/${roleId}/rights/${rightsId}`).then(res => {
        const {data, meta} = res.data
        if (meta.status === 200) {
          this.roleList.forEach(item => {
            if (item.id === roleId) {
              item.children = data
              this.findEmpty()
            }
          })
        }
      })
    },
    findEmpty () {
      this.roleList.forEach(item => {
        const roleId = item.id
        this.forEachEmpty(item, roleId)
      })
    },
    forEachEmpty (item, roleId) {
      item.children.forEach((item2) => {
        if (item2.children.length === 0) {
          console.log(item2)
          console.log(roleId)
          this.delRightsById(roleId, item2.id)
        } else {
          item2.children.forEach(item3 => {
            if (item3.children.length === 0) {
              this.delRightsById(roleId, item3.id)
            }
          })
        }
      })
    },
    addRoleEvent (ref) {
      this.$refs[ref].validate(async res => {
        if (res) {
          const res = await this.$http.post('/roles', this.roleObj)
          const {meta} = res.data
          if (meta.status === 201) {
            this.$message({
              type: 'success',
              message: meta.msg
            })
            this.addRole = false
            this.$refs[ref].resetFields()
            this.getRoleList()
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请按照表单规则填写数据'
          })
        }
      })
    },
    roleUpdate (info) {
      delete info.children
      this.roleObj = info
      console.log(this.roleObj)
      this.updateRole = true
    },
    updateRoleEvent (ref) {
      this.$refs[ref].validate(async res => {
        if (res) {
          const res = await this.$http.put(`roles/${this.roleObj.id}`, this.roleObj)
          console.log(res)
          const {meta} = res.data
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: '修改角色成功'
            })
            this.updateRole = false
            this.getRoleList()
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请按照表单规则填写内容'
          })
        }
      })
    },
    delRole (info) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`roles/${info.id}`)
        const {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: meta.msg
          })
          this.getRoleList()
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
    this.getRoleList()
  }
}
