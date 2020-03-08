<template>
  <div class="imgs=main">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4"
          ><el-input
            size="small"
            v-model="search.title"
            placeholder="根据姓名查询"
          ></el-input>
        </el-col>
        <el-col :span="4" :offset="8" size="small"
          ><el-button type="primary" @click="doSearch">查询</el-button>
          <el-button type="primary" @click="resetSearch">重置</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <div slot="header">
        <el-upload
          class="upload-demo"
          action="/admin/xy/upload/uploadImg"
          :on-success="upload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <el-row :gutter="20">
        <Pagination
          style="text-align:right"
          :page="page"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></Pagination>
        <el-col
          :span="6"
          v-for="item in imgsList"
          :key="item.id"
          style="height:300px;margin: 30px auto;"
        >
          <el-card>
            <el-image
              fit="scale-down"
              style="width:100%; height: 260px"
              :src="`http://bufan.cloud/media/${item.fileName}`"
            >
            </el-image>
            <div class="text">
              <p @click="doEdit(item.id, $event)" v-show="editId != item.id">
                {{ item.title ? item.title : "未定义" }}
              </p>
              <el-input
                v-show="editId == item.id"
                @blur="clearIpt"
                @keyup.esc.native="editId = ''"
                @keyup.enter.native="submit(item.id, item.title)"
                v-model="item.title"
                placeholder="请输入内容"
              ></el-input>
              <el-button
                @click="delImgs(item.id)"
                class="btn"
                type="danger"
                icon="el-icon-delete"
                circle
                >删除</el-button
              >
            </div>
          </el-card>
        </el-col>
        <!-- 分页 -->
      </el-row>
    </el-card>
  </div>
</template>

<script>
import imgsApi from "@/api/matter/picture";
import { resetDataAttr } from "@/utils/index";
import _ from "lodash";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
export default {
  props: {},
  mixins: [pageMixin],
  components: {
    Pagination
  },
  data() {
    return {
      search: {},
      imgsList: [],
      editId: ""
    };
  },
  computed: {},
  created() {
    this.getImgsList();
  },
  mounted() {},
  methods: {
    // 获取图片列表
    getImgsList() {
      var params = _.pickBy(this.search, item => item);
      imgsApi
        .getImgsList({
          ...params,
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.imgsList = res.data.list;
          this.page.total = res.data.totalRow;
          console.log("图片列表", res);
        });
    },
    //点击上传 刷新页面
    upload() {
      this.getImgsList();
    },
    // 点击编辑
    doEdit(id, e) {
      //修改编辑状态
      this.editId = id;
      //被点击的对象
      var target = e.target;
      var input = target.nextElementSibling.children[0];
      console.log(input);
      // vue的数据响应到页面的  等待页面渲染完毕后触发
      this.$nextTick(() => {
        input.focus();
      });
    },
    // 隐藏input框
    clearIpt() {
      this.editId = "";
    },
    // 回车更新标题
    submit(id, title) {
      imgsApi
        .uploadTitle({
          id,
          title
        })
        .then(res => {
          if (res.code == "success") {
            this.editId = "";
            this.$message.success("更新成功");
            //  刷新列表
            this.getImgsList();
          } else {
            this.$message.error("更新失败");
          }
        });
    },
    // 删除图片
    delImgs(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          imgsApi
            .delImgs({
              id: id
            })
            .then(res => {
              console.log("11111", res);
              if (res.code == "success") {
                // 刷新数据
                this.getImgsList();
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
    // 搜索查询
    doSearch() {
      resetDataAttr(this, "page");
      this.getImgsList();
    },
    // 重置
    resetSearch() {
      resetDataAttr(this, "search");
      this.getImgsList();
    },
    handleCurrentChange(val) {
      this.page.start = val;
      // 重新发送请求
      this.getImgsList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getImgsList();
    }
  }
};
</script>

<style scoped lang="scss">
.text {
  display: flex;
  justify-content: space-around;
  justify-items: center;
  .btn {
    background-color: #fff;
    color: #f56c6c;
    border: none;
  }
}
</style>
