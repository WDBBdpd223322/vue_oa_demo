<template>
  <div>
    <div id="allmap"></div>
  </div>
</template>
<script>
// import 'http://api.map.baidu.com/api?v=2.0&ak=Euxfsoyys6pD4Wvgg6UCwsgZyIXzmGrk'
import jsonp from 'jsonp'
export default {
  name: 'bd-map',
  props: {
    pname: {
      type: String,
      default: function () {
        return '北京'
      }
    }
  },
  data () {
    return {
      info: ''
    }
  },
  methods: {
    getBDMap () {
      jsonp('http://api.map.baidu.com/api?v=2.0&ak=Euxfsoyys6pD4Wvgg6UCwsgZyIXzmGrk', {}, () => {
        this.initMap()
        this.resetPostion()
      })
    },
    initMap () {
      // 初始化地图
      let map = new window.BMap.Map('allmap')
      let point = new window.BMap.Point(116.331398, 39.897445)
      map.centerAndZoom(point, 12)
      window.map = map
    },
    resetPostion () {
      // 重设地图坐标
      let myGeo = new window.BMap.Geocoder()
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(this.pname, function (point) {
        if (point) {
          window.map.centerAndZoom(point, 16)
          window.map.addOverlay(new window.BMap.Marker(point))
        } else {
          alert('您选择地址没有解析到结果!')
        }
      }, '北京市')
    }
  },
  watch: {
    pname: function (newValue, oldValue) {
      this.resetPostion()
    }
  },
  created () {
    this.getBDMap()
  }
}
</script>

<style scoped>
  #allmap {
    width: 100%;
    height: 200px;
    background-color: lightgreen;
  }
</style>
