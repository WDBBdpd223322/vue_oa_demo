import selectCom from './other/select.vue'
import bdMap from './other/bdMap.vue'
export default {
  data () {
    return {
      ordersObj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      searchText: '',
      orderList: [],
      total: 0,
      orderUpdate: false,
      mapDialog: false,
      orderInfo: {}
    }
  },
  methods: {
    async getOrdersList () {
      const res = await this.$http.get('/orders', {
        params: this.ordersObj
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.orderList = data.goods
        this.total = data.total
      }
    },
    queryOrder () {
      this.ordersObj.query = this.searchText
    },
    handleSizeChange (val) {
      this.ordersObj.pagesize = val
    },
    handleCurrentChange (val) {
      this.ordersObj.pagenum = val
    },
    updateOrder (info) {
      this.orderInfo.id = info.order_id
      this.orderUpdate = true
      this.$message({
        type: 'warning',
        message: '该项修改为非单项修改，不设置自动回到默认值！'
      })
    },
    async updateOrderEvent () {
      if (!this.orderInfo.order_price.trim()) {
        this.orderInfo.order_price = ''
        this.$message({
          type: 'error',
          message: '价格为数字'
        })
        return
      }
      if (!Number(this.orderInfo.order_price)) {
        this.orderInfo.order_price = ''
        this.$message({
          type: 'error',
          message: '价格为数字'
        })
        return
      }
      if (this.orderInfo.order_pay && this.orderInfo.order_pay - 0 !== 0) {
        this.orderInfo.pay_status = 1
      } else {
        this.orderInfo.pay_status = 0
      }
      const res = await this.$http.put(`/orders/${this.orderInfo.id}`, this.orderInfo)
      const {meta} = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: meta.msg
        })
        this.orderUpdate = false
        this.getOrdersList()
      }
    }
  },
  components: {
    selectCom,
    bdMap
  },
  watch: {
    ordersObj: {
      handler () {
        this.getOrdersList()
      },
      deep: true
    }
  },
  filters: {
    payFilter (val) {
      if (val - 0 === 0) {
        return '未支付'
      }
      if (val - 0 === 1) {
        return '支付宝'
      }
      if (val - 0 === 2) {
        return '微信'
      }
      if (val - 0 === 3) {
        return '银行卡'
      }
    }
  },
  created () {
    this.getOrdersList()
  }
}
