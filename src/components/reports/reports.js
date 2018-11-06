import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (info) {
      if (info.index - 0 === 0) {
        this.chartOne()
      }
      if (info.index - 0 === 1) {
        this.chartTwo()
      }
      if (info.index - 0 === 2) {
        this.chartThree()
      }
    },
    chartOne () {
      const myChart = this.$echarts.init(document.getElementById('chartOne'))
      myChart.setOption({
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {normal: {}},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      })
    },
    chartTwo () {
      var cellSize = [80, 80]
      var pieRadius = 30

      function getVirtulData () {
        var date = +echarts.number.parseDate('2017-02-01')
        var end = +echarts.number.parseDate('2017-03-01')
        var dayTime = 3600 * 24 * 1000
        var data = []
        for (var time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
          ])
        }
        return data
      }

      function getPieSeries (scatterData, chart) {
        return echarts.util.map(scatterData, function (item, index) {
          var center = chart.convertToPixel('calendar', item)
          return {
            id: index + 'pie',
            type: 'pie',
            center: center,
            label: {
              normal: {
                formatter: '{c}',
                position: 'inside'
              }
            },
            radius: pieRadius,
            data: [
              {name: '工作', value: Math.round(Math.random() * 24)},
              {name: '娱乐', value: Math.round(Math.random() * 24)},
              {name: '睡觉', value: Math.round(Math.random() * 24)}
            ]
          }
        })
      }

      function getPieSeriesUpdate (scatterData, chart) {
        return echarts.util.map(scatterData, function (item, index) {
          var center = chart.convertToPixel('calendar', item)
          return {
            id: index + 'pie',
            center: center
          }
        })
      }

      var scatterData = getVirtulData()

      const myChart = this.$echarts.init(document.getElementById('chartTwo'))
      myChart.setOption({
        title: {
          text: '用户啥都行'
        },
        tooltip: {},
        legend: {
          data: ['工作', '娱乐', '睡觉'],
          bottom: 20
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        calendar: {
          top: 'middle',
          left: 'center',
          orient: 'vertical',
          cellSize: cellSize,
          yearLabel: {
            show: false,
            textStyle: {
              fontSize: 30
            }
          },
          dayLabel: {
            margin: 20,
            firstDay: 1,
            nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
          },
          monthLabel: {
            show: false
          },
          range: ['2017-02']
        },
        series: [{
          id: 'label',
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 1,
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return echarts.format.formatTime('dd', params.value[0])
              },
              offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
              textStyle: {
                color: '#000',
                fontSize: 14
              }
            }
          },
          data: scatterData
        }]
      })
      if (!echarts.inNode) {
        var pieInitialized
        setTimeout(function () {
          pieInitialized = true
          myChart.setOption({
            series: getPieSeries(scatterData, myChart)
          })
        }, 10)
        echarts.onresize = function () {
          if (pieInitialized) {
            myChart.setOption({
              series: getPieSeriesUpdate(scatterData, myChart)
            })
          }
        }
      }
    },
    chartThree () {
      var dataBJ = [
        [1, 55, 9, 56, 0.46, 18, 6, '良'],
        [2, 25, 11, 21, 0.65, 34, 9, '优'],
        [3, 56, 7, 63, 0.3, 14, 5, '良'],
        [4, 33, 7, 29, 0.33, 16, 6, '优'],
        [5, 42, 24, 44, 0.76, 40, 16, '优'],
        [6, 82, 58, 90, 1.77, 68, 33, '良'],
        [7, 74, 49, 77, 1.46, 48, 27, '良'],
        [8, 78, 55, 80, 1.29, 59, 29, '良'],
        [9, 267, 216, 280, 4.8, 108, 64, '重度污染'],
        [10, 185, 127, 216, 2.52, 61, 27, '中度污染'],
        [11, 39, 19, 38, 0.57, 31, 15, '优'],
        [12, 41, 11, 40, 0.43, 21, 7, '优'],
        [13, 64, 38, 74, 1.04, 46, 22, '良'],
        [14, 108, 79, 120, 1.7, 75, 41, '轻度污染'],
        [15, 108, 63, 116, 1.48, 44, 26, '轻度污染'],
        [16, 33, 6, 29, 0.34, 13, 5, '优'],
        [17, 94, 66, 110, 1.54, 62, 31, '良'],
        [18, 186, 142, 192, 3.88, 93, 79, '中度污染'],
        [19, 57, 31, 54, 0.96, 32, 14, '良'],
        [20, 22, 8, 17, 0.48, 23, 10, '优'],
        [21, 39, 15, 36, 0.61, 29, 13, '优'],
        [22, 94, 69, 114, 2.08, 73, 39, '良'],
        [23, 99, 73, 110, 2.43, 76, 48, '良'],
        [24, 31, 12, 30, 0.5, 32, 16, '优'],
        [25, 42, 27, 43, 1, 53, 22, '优'],
        [26, 154, 117, 157, 3.05, 92, 58, '中度污染'],
        [27, 234, 185, 230, 4.09, 123, 69, '重度污染'],
        [28, 160, 120, 186, 2.77, 91, 50, '中度污染'],
        [29, 134, 96, 165, 2.76, 83, 41, '轻度污染'],
        [30, 52, 24, 60, 1.03, 50, 21, '良'],
        [31, 46, 5, 49, 0.28, 10, 6, '优']
      ]

      var dataGZ = [
        [1, 26, 37, 27, 1.163, 27, 13, '优'],
        [2, 85, 62, 71, 1.195, 60, 8, '良'],
        [3, 78, 38, 74, 1.363, 37, 7, '良'],
        [4, 21, 21, 36, 0.634, 40, 9, '优'],
        [5, 41, 42, 46, 0.915, 81, 13, '优'],
        [6, 56, 52, 69, 1.067, 92, 16, '良'],
        [7, 64, 30, 28, 0.924, 51, 2, '良'],
        [8, 55, 48, 74, 1.236, 75, 26, '良'],
        [9, 76, 85, 113, 1.237, 114, 27, '良'],
        [10, 91, 81, 104, 1.041, 56, 40, '良'],
        [11, 84, 39, 60, 0.964, 25, 11, '良'],
        [12, 64, 51, 101, 0.862, 58, 23, '良'],
        [13, 70, 69, 120, 1.198, 65, 36, '良'],
        [14, 77, 105, 178, 2.549, 64, 16, '良'],
        [15, 109, 68, 87, 0.996, 74, 29, '轻度污染'],
        [16, 73, 68, 97, 0.905, 51, 34, '良'],
        [17, 54, 27, 47, 0.592, 53, 12, '良'],
        [18, 51, 61, 97, 0.811, 65, 19, '良'],
        [19, 91, 71, 121, 1.374, 43, 18, '良'],
        [20, 73, 102, 182, 2.787, 44, 19, '良'],
        [21, 73, 50, 76, 0.717, 31, 20, '良'],
        [22, 84, 94, 140, 2.238, 68, 18, '良'],
        [23, 93, 77, 104, 1.165, 53, 7, '良'],
        [24, 99, 130, 227, 3.97, 55, 15, '良'],
        [25, 146, 84, 139, 1.094, 40, 17, '轻度污染'],
        [26, 113, 108, 137, 1.481, 48, 15, '轻度污染'],
        [27, 81, 48, 62, 1.619, 26, 3, '良'],
        [28, 56, 48, 68, 1.336, 37, 9, '良'],
        [29, 82, 92, 174, 3.29, 0, 13, '良'],
        [30, 106, 116, 188, 3.628, 101, 16, '轻度污染'],
        [31, 118, 50, 0, 1.383, 76, 11, '轻度污染']
      ]

      var dataSH = [
        [1, 91, 45, 125, 0.82, 34, 23, '良'],
        [2, 65, 27, 78, 0.86, 45, 29, '良'],
        [3, 83, 60, 84, 1.09, 73, 27, '良'],
        [4, 109, 81, 121, 1.28, 68, 51, '轻度污染'],
        [5, 106, 77, 114, 1.07, 55, 51, '轻度污染'],
        [6, 109, 81, 121, 1.28, 68, 51, '轻度污染'],
        [7, 106, 77, 114, 1.07, 55, 51, '轻度污染'],
        [8, 89, 65, 78, 0.86, 51, 26, '良'],
        [9, 53, 33, 47, 0.64, 50, 17, '良'],
        [10, 80, 55, 80, 1.01, 75, 24, '良'],
        [11, 117, 81, 124, 1.03, 45, 24, '轻度污染'],
        [12, 99, 71, 142, 1.1, 62, 42, '良'],
        [13, 95, 69, 130, 1.28, 74, 50, '良'],
        [14, 116, 87, 131, 1.47, 84, 40, '轻度污染'],
        [15, 108, 80, 121, 1.3, 85, 37, '轻度污染'],
        [16, 134, 83, 167, 1.16, 57, 43, '轻度污染'],
        [17, 79, 43, 107, 1.05, 59, 37, '良'],
        [18, 71, 46, 89, 0.86, 64, 25, '良'],
        [19, 97, 71, 113, 1.17, 88, 31, '良'],
        [20, 84, 57, 91, 0.85, 55, 31, '良'],
        [21, 87, 63, 101, 0.9, 56, 41, '良'],
        [22, 104, 77, 119, 1.09, 73, 48, '轻度污染'],
        [23, 87, 62, 100, 1, 72, 28, '良'],
        [24, 168, 128, 172, 1.49, 97, 56, '中度污染'],
        [25, 65, 45, 51, 0.74, 39, 17, '良'],
        [26, 39, 24, 38, 0.61, 47, 17, '优'],
        [27, 39, 24, 39, 0.59, 50, 19, '优'],
        [28, 93, 68, 96, 1.05, 79, 29, '良'],
        [29, 188, 143, 197, 1.66, 99, 51, '中度污染'],
        [30, 174, 131, 174, 1.55, 108, 50, '中度污染'],
        [31, 187, 143, 201, 1.39, 89, 53, '中度污染']
      ]

      var schema = [
        {
          name: 'date',
          index: 0,
          text: '日期'
        },
        {
          name: 'AQIindex',
          index: 1,
          text: 'AQI'
        },
        {
          name: 'PM25',
          index: 2,
          text: 'PM2.5'
        },
        {
          name: 'PM10',
          index: 3,
          text: 'PM10'
        },
        {
          name: 'CO',
          index: 4,
          text: ' CO'
        },
        {
          name: 'NO2',
          index: 5,
          text: 'NO2'
        },
        {
          name: 'SO2',
          index: 6,
          text: 'SO2'
        },
        {
          name: '等级',
          index: 7,
          text: '等级'
        }
      ]
      var lineStyle = {
        normal: {
          width: 1,
          opacity: 0.5
        }
      }
      const myChart = this.$echarts.init(document.getElementById('chartThree'))
      myChart.setOption({
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        backgroundColor: '#333',
        legend: {
          bottom: 30,
          data: ['北京', '上海', '广州'],
          itemGap: 20,
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        tooltip: {
          padding: 10,
          backgroundColor: '#222',
          borderColor: '#777',
          borderWidth: 1,
          formatter: function (obj) {
            var value = obj[0].value
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
              obj[0].seriesName + ' ' + value[0] + '日期：' +
              value[7] +
              '</div>' +
              schema[1].text + '：' + value[1] + '<br>' +
              schema[2].text + '：' + value[2] + '<br>' +
              schema[3].text + '：' + value[3] + '<br>' +
              schema[4].text + '：' + value[4] + '<br>' +
              schema[5].text + '：' + value[5] + '<br>' +
              schema[6].text + '：' + value[6] + '<br>'
          }
        },
        parallelAxis: [
          {
            dim: 0,
            name: schema[0].text,
            inverse: true,
            max: 31,
            nameLocation: 'start'
          },
          {
            dim: 1,
            name: schema[1].text
          },
          {
            dim: 2,
            name: schema[2].text
          },
          {
            dim: 3,
            name: schema[3].text
          },
          {
            dim: 4,
            name: schema[4].text
          },
          {
            dim: 5,
            name: schema[5].text
          },
          {
            dim: 6,
            name: schema[6].text
          },
          {
            dim: 7,
            name: schema[7].text,
            type: 'category',
            data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
          }
        ],
        visualMap: {
          show: true,
          min: 0,
          max: 150,
          dimension: 2,
          inRange: {
            color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
            // colorAlpha: [0, 1]
          }
        },
        parallel: {
          left: '5%',
          right: '18%',
          bottom: 100,
          parallelAxisDefault: {
            type: 'value',
            name: 'AQI指数',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
              color: '#fff',
              fontSize: 12
            },
            axisLine: {
              lineStyle: {
                color: '#aaa'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#777'
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            }
          }
        },
        series: [
          {
            name: '北京',
            type: 'parallel',
            lineStyle: lineStyle,
            data: dataBJ
          },
          {
            name: '上海',
            type: 'parallel',
            lineStyle: lineStyle,
            data: dataSH
          },
          {
            name: '广州',
            type: 'parallel',
            lineStyle: lineStyle,
            data: dataGZ
          }
        ]
      })
    },
    chartFour () {
      const myChart = this.$echarts.init(document.getElementById('chartOne'))
      myChart.setOption({})
    }
  },
  mounted () {
    this.chartOne()
  }
}
