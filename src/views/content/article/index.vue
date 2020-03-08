<template>
  <div class="article-main">
    <el-card class="search">
      <div slot="header">
        <span>搜索框</span>
      </div>

      <el-row :gutter="20">
        <el-col :span="4"
          ><el-input
            size="small"
            v-model="search.title"
            placeholder="根据姓名查询"
          ></el-input>
        </el-col>
        <el-col :span="4"
          ><el-input
            size="small"
            v-model="search.author"
            placeholder="根据作者查询"
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
          :data="newList"
          style="width: 100%"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="title" label="文章标题" width="100">
          </el-table-column>
          <el-table-column prop="author" label="作者" width="100">
          </el-table-column>
          <el-table-column prop="desc" label="文章描述" width="180">
          </el-table-column>
          <el-table-column label="封面图片" width="180">
            <template slot-scope="scope">
              <el-image
                fit="contain"
                :src="scope.row.cover"
                style="width:150px;height:50px"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="hot" label="是否最热" width="100">
          </el-table-column>
          <el-table-column label="阅读量/赞" width="150">
            <template slot-scope="scope">
              {{ scope.row.viewCount }}/{{ scope.row.zanCount }}
            </template>
          </el-table-column>
          <el-table-column prop="addTime" label="添加时间"> </el-table-column>
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
    <Dialogs ref="dialogs" @refresh-list="getNewList"></Dialogs>
  </div>
</template>

<script>
import articleApi from "@/api/content/article";
import Dialogs from "./dialogs/dialogs";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
import { resetDataAttr } from "@/utils/index";
import _ from "lodash";
export default {
  props: {},
  components: {
    Dialogs,
    Pagination
  },
  mixins: [pageMixin],
  data() {
    return {
      search: {},
      loading: false,
      newList: []
    };
  },
  computed: {},
  created() {
    this.getNewList();
  },
  mounted() {},
  methods: {
    //   新闻列表
    getNewList() {
      this.loading = true;
      var params = _.pickBy(this.search, item => item);
      articleApi
        .getNewList({
          ...params,
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.newList = res.data.list;
          this.page.total = res.data.totalRow;
          res.data.list.forEach(ele => {
            ele.hot = ele.hot == "0" ? "否" : "是";
          });
          this.loading = false;
          console.log("新闻列表", res);
        });
    },
    // 删除
    delForm(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          articleApi
            .gdelNewList({
              id: row.id
            })
            .then(res => {
              console.log("1111", res);
              if (res.code == "success") {
                // 刷新数据
                this.getNewList();
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
    // 添加用户
    addUser() {
      this.$refs.dialogs.openDialog();
    },
    // 编辑
    goEdit(row) {
      this.$refs.dialogs.openDialog(row.id);
    },
    // 查询搜索
    doSearch() {
      resetDataAttr(this, "page");
      this.getNewList();
    },
    // 重置搜索框
    resetSearch() {
      resetDataAttr(this, "search");
      this.getNewList();
    },
    handleCurrentChange(val) {
      this.page.start = val;
      // 重新发送请求
      this.getNewList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getNewList();
    }
  }
};
</script>

<style scoped lang="scss">
</style>
