import Auth from '@/assets/js/auth.js'

export default {
  data () {
    return {
      userObj: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '请稍等',
            duration: 1000
          })
          setTimeout(() => {
            this.$http
              .post('/login', this.userObj)
              .then(res => {
                const {data, meta} = res.data
                if (meta.status === 200) {
                  this.$message({
                    type: 'success',
                    message: '登陆成功，即将跳转到首页',
                    duration: 1000
                  })
                  Auth.saveUser(data)
                  setTimeout(() => {
                    const {redirect} = this.$route.query
                    if (redirect) {
                      this.$router.push(redirect.substr(1))
                    } else {
                      this.$router.push({
                        path: '/'
                      })
                    }
                  }, 1000)
                } else {
                  this.$message({
                    type: 'error',
                    message: '对不起，用户名密码错误，请重新登陆'
                  })
                  this.userObj = {}
                }
              })
          }, 1000)
        } else {
          this.$message({
            type: 'error',
            message: '请填写正确信息'
          })
          return false
        }
      })
    }
  }
}
