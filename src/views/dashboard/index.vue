<template>
  <div class="dashboard-container">
    <div class="card-text">
      <el-row
        :gutter="30"
        style="padding:20px
      "
      >
        <el-col :span="6">
          <el-card>
            <div slot="header">
              <span
                >用户统计
                <svg-icon icon-class="users" class-name="custom-class" />
              </span>
            </div>
            <p>总数 : {{ userInfo.userCount.count }}</p>
            <p>今日新增 : {{ userInfo.userCountToday.count }}</p>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header">
              <span
                >图片统计
                <svg-icon icon-class="img" class-name="custom-class" />
              </span>
            </div>
            <p>总数 : {{ imgsInfo.imgCount.count }}</p>
            <p>今日新增 : {{ imgsInfo.imgCountToday.count }}</p>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header">
              <span
                >新闻统计
                <svg-icon icon-class="news" class-name="custom-class" />
              </span>
            </div>
            <p>总数 : {{ newsInfo.newsCount.count }}</p>
            <p>今日新增 : {{ newsInfo.newsCountToday.count }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="30" style="margin-left: 10px">
      <el-col :span="7">
        <el-card>
          <div id="user" style="width:400px;height:300px;"></div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card>
          <div id="img" style="width:400px;height:300px;"></div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card>
          <div id="news" style="width:400px;height:300px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dashboardApi from "@/api/dashboard";
var echarts = require("echarts");
export default {
  name: "Dashboard",
  data() {
    return {
      userInfo: {
        userCount: 0,
        userCountToday: 0
      },
      imgsInfo: {
        imgCount: 0,
        imgCountToday: 0
      },
      newsInfo: {
        newsCount: 0,
        newsCountToday: 0
      }
    };
  },
  created() {
    this.getBaseInfo();
  },
  mounted() {
    this.userEl = echarts.init(document.getElementById("user"));
    this.imgEl = echarts.init(document.getElementById("img"));
    this.newEl = echarts.init(document.getElementById("news"));
  },
  methods: {
    getBaseInfo() {
      dashboardApi.base().then(res => {
        this.userInfo = {
          userCount: res.userCount,
          userCountByDay: res.userCountByDay,
          userCountToday: res.userCountToday
        };
        this.imgsInfo = {
          imgCount: res.imgCount,
          imgCountByDay: res.imgCountByDay,
          imgCountToday: res.imgCountToday
        };
        this.newsInfo = {
          newsCount: res.newsCount,
          newsCountByDay: res.newsCountByDay,
          newsCountToday: res.newsCountToday
        };
        this.initEcharts(
          this.userEl,
          this.userInfo.userCountByDay,
          "用户上传统计"
        );
        this.initEcharts(
          this.imgEl,
          this.imgsInfo.imgCountByDay,
          "图片上传统计"
        );
        this.initEcharts(
          this.newEl,
          this.newsInfo.newsCountByDay,
          "新闻上传统计"
        );
      });
    },
    initEcharts(obj, info, title) {
      var option = {
        color: ["#3398DB"],
        title: {
          text: title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["数量"]
        },
        xAxis: {
          data: info.reduce((a, b) => {
            a.push(b.date);
            return a;
          }, [])
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            data: info.reduce((a, b) => {
              a.push(b.count);
              return a;
            }, [])
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      obj.setOption(option);
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>
