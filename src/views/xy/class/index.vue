<template>
  <div class="class-main">
    <el-card class="search">
      <div slot="header">
        <span>搜索框</span>
      </div>

      <el-row :gutter="20">
        <el-col :span="4"
          ><el-input
            size="small"
            v-model="search.className"
            placeholder="根据姓名查询"
          ></el-input>
        </el-col>

        <el-col :span="4" size="small"
          ><el-button type="primary" @click="doSearch">查询</el-button>
          <el-button type="primary" @click="resetSearch">重置</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 列表 -->
    <div class="content">
      <el-card>
        <div slot="header">
          <el-button @click="addClass" type="primary">添加班级</el-button>
        </div>

        <el-table
          v-loading="loading"
          border
          :data="classList"
          style="width: 100%"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="className" label="班级名称" width="150">
          </el-table-column>
          <el-table-column prop="type" label="课程" width="100">
          </el-table-column>
          <el-table-column prop="desc" label="班级描述" width="180">
          </el-table-column>
          <el-table-column prop="startTime" label="开班时间" width="180">
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="180">
          </el-table-column>
          <el-table-column prop="addTime" label="添加时间" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="goEdit(scope.row)" type="primary" size="small"
                >编辑</el-button
              >
              <el-button @click="delForm(scope.row)" type="danger" size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->

        <Pagination
          :page="page"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></Pagination>
      </el-card>
    </div>
    <Dialogs ref="dialogs" @refresh-list="getClassList"></Dialogs>
  </div>
</template>

<script>
import classApi from "@/api/xy/clazz";
import Dialogs from "./dialogs";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
import { resetDataAttr } from "@/utils/index";
import _ from "lodash";
export default {
  mixins: [pageMixin],
  components: { Dialogs, Pagination },
  props: {},
  data() {
    return {
      loading: false,
      search: {},
      classList: []
    };
  },
  computed: {},
  created() {
    //   班级列表
    this.getClassList();
  },
  mounted() {},
  methods: {
    //   获取班级列表
    getClassList() {
      this.loading = true;
      // 把分页查询条件加上
      var params = _.pickBy(this.search, item => item);
      classApi
        .getClassList({
          ...params,
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.loading = false;
          res.data.list.forEach(ele => {
            ele.type = ele.type == "0" ? "前端" : "UI";
          });
          this.classList = res.data.list;
          this.page.total = res.data.totalRow;
          console.log("班级列表", res.data.list);
        });
    },
    // 打开添加用户弹窗
    addClass(id) {
      this.$refs.dialogs.openDialog();
    },
    handleCurrentChange(val) {
      this.page.start = val;
      // 重新发送请求
      this.getClassList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getClassList();
    },

    // 编辑
    goEdit(row) {
      this.$refs.dialogs.openDialog(row.id);
    },
    // 删除
    delForm(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          classApi
            .delClass({
              id: row.id
            })
            .then(res => {
              if (res.code == true) {
                // 刷新数据
                this.getClassList();
                this.$message.success("删除成功!");
              } else {
                this.$message.error("删除失败!");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 查询搜索
    doSearch() {
      resetDataAttr(this, "page");
      this.getClassList();
    },
    // 重置搜索框
    resetSearch() {
      resetDataAttr(this, "search");
      this.getClassList();
    }
  }
};
</script>

<style scoped lang="scss">
</style>
