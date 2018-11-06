<template>
  <div class="pcd">
    <div>
      <span>省/市/区：</span>
      <select v-model="prov">
        <option
          v-for="(option, index) in arr"
          :value="option.name"
          :key="index">
          {{ option.name }}
        </option>
      </select>
      <select v-model="city">
        <option
          v-for="(option, index) in cityArr"
          :value="option.name"
          :key="index">
          {{ option.name }}
        </option>
      </select>
      <select v-model="district" v-if="district">
        <option
          v-for="(option, index) in districtArr"
          :value="option.name"
          :key="index">
          {{ option.name }}
        </option>
      </select>
    </div>
    <div>
      <span>详细地址：</span>
      <el-input v-model='detailAddress' class='detail'></el-input>
    </div>
  </div>
</template>

<script>
import pcdData from './selectData.js'
export default {
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
      arr: pcdData,
      prov: '北京',
      city: '北京',
      district: '东城区',
      detailAddress: '',
      cityArr: [],
      districtArr: []
    }
  },
  methods: {
    updateCity () {
      for (var i in this.arr) {
        var obj = this.arr[i]
        if (obj.name === this.prov) {
          this.cityArr = obj.sub
          break
        }
      }
      this.city = this.cityArr[1].name
    },
    updateDistrict () {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i]
        if (obj.name === this.city) {
          this.districtArr = obj.sub
          break
        }
      }
      if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
        this.district = this.districtArr[1].name
      } else {
        this.district = ''
      }
    }
  },
  beforeMount () {
    this.updateCity()
    this.updateDistrict()
  },
  watch: {
    prov () {
      this.updateCity()
      this.updateDistrict()
    },
    city () {
      this.updateDistrict()
    }
  }
}
</script>

<style scoped>
  .pcd select {
    width: 160px;
    height: 40px;
  }
  .pcd div:last-child {
    margin-top: 10px;
  }
  .detail {
    width: 485px;
  }
</style>
