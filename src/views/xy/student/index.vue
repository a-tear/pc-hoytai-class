<template>
  <div class="student-main">
    <el-card class="search">
      <div slot="header">
        <span>搜索框</span>
      </div>

      <el-row :gutter="20">
        <el-col :span="4"
          ><el-input
            size="small"
            v-model="search.name"
            placeholder="根据姓名查询"
          ></el-input>
        </el-col>
        <el-col :span="4"
          ><el-select
            v-model="search.classId"
            size="small"
            clearable
            placeholder="请选择班级"
          >
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.className"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4"
          ><el-input
            size="small"
            v-model="search.startTime"
            placeholder="根据开始时间查询"
          ></el-input>
        </el-col>
        <el-col :span="4" :offset="8" size="small"
          ><el-button type="primary" @click="doSearch">查询</el-button>
          <el-button type="primary" @click="resetSearch">重置</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 列表 -->
    <div class="content">
      <el-card>
        <div slot="header">
          <el-button @click="addUser" type="primary">添加用户</el-button>
        </div>

        <el-table
          v-loading="loading"
          border
          :data="studentList.list"
          style="width: 100%"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="sexv" label="性别" width="100">
          </el-table-column>
          <el-table-column prop="cityText" label="城市" width="180">
          </el-table-column>
          <el-table-column prop="tel" label="电话" width="180">
          </el-table-column>
          <el-table-column prop="classname" label="班级" width="100">
          </el-table-column>
          <el-table-column prop="dormname" label="宿舍"> </el-table-column>
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
    <Dialogs ref="dialogs" @refresh-list="getStudentList"></Dialogs>
  </div>
</template>

<script>
import axios from "axios";
import studentApi from "@/api/xy/student";
import Dialogs from "./dialogs";
import classApi from "@/api/xy/clazz";
import { resetDataAttr } from "@/utils/index";
import _ from "lodash";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
import { regionDataPlus, TextToCode } from "element-china-area-data";
export default {
  name: "Student",
  mixins: [pageMixin],
  components: {
    Dialogs,
    Pagination
  },
  data() {
    return {
      search: {},
      loading: false,
      dialogVisible: false,
      sex: "",
      studentList: [],
      classList: []
    };
  },
  created() {
    this.getStudentList();
    this.getClassList();
  },
  methods: {
    //   获取学生列表
    getStudentList() {
      this.loading = true;
      // 去掉空值
      // 把分页查询条件加上 lodash 的_.pickBy()
      var params = _.pickBy(this.search, item => item);
      studentApi
        .getStudentList({
          ...params,
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.studentList = res.data;
          this.page.total = res.data.totalRow;
          this.loading = false;

          console.log("学员列表==>", res.data);
        });
    },
    // 获取班级列表
    getClassList() {
      classApi.getClassList().then(res => {
        this.classList = res.data.list;
      });
    },
    // 打开添加用户弹窗
    addUser() {
      this.$refs.dialogs.openDialog();
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
          studentApi
            .delStudent({
              id: row.id
            })
            .then(res => {
              if (res.code == true) {
                // 刷新数据
                this.getStudentList();
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
      this.getStudentList();
    },
    // 重置搜索框
    resetSearch() {
      resetDataAttr(this, "search");
      this.getStudentList();
    },
    handleCurrentChange(val) {
      this.page.start = val;
      // 重新发送请求
      this.getStudentList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getStudentList();
    }
  }
};
</script>

<style lang="scss" scoped>
.student-main {
  .pagination {
    margin-top: 30px;
  }
}
</style>