<template>
  <div class="article-main">
    <!-- 列表 -->
    <el-dialog
      title="编辑内容"
      :visible.sync="openForm"
      width="80%"
      :before-close="handleClose"
    >
      <div class="content">
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
            <div v-if="type == 1">
              <el-input id="input" v-model="imgUrl" placeholder=""></el-input>
              <el-button @click="handleCopy()">copy</el-button>
            </div>

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
              <el-card class="imgs">
                <el-image
                  @click="maskShow(item.id, item.fileName)"
                  fit="scale-down"
                  style="width:100%; height: 260px"
                  :src="`http://bufan.cloud/media/${item.fileName}`"
                >
                </el-image>

                <div class="mask" v-show="item.id == maskId">
                  <span class="tips">✔</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openForm = false">取 消</el-button>
        <el-button type="primary" @click="addSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import articleApi from "@/api/content/article";
import imgsApi from "@/api/matter/picture";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
import { resetDataAttr } from "@/utils/index";
export default {
  props: {},
  components: {
    Pagination
  },
  mixins: [pageMixin],
  data() {
    return {
      openForm: false,
      imgsList: [],
      maskId: "",
      imgUrl: "",
      type: 0
    };
  },
  computed: {},
  created() {
    this.getImgsList();
  },
  mounted() {},
  methods: {
    //   图片列表
    getImgsList() {
      imgsApi
        .getImgsList({
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.imgsList = res.data.list;
          this.page.total = res.data.totalRow;

          console.log("图片列表11", res);
        });
    },
    maskShow(id, url) {
      this.maskId = this.maskId == id ? "" : id;
      // 如果选中了才有
      if (this.maskId) {
        this.imgUrl = "http://bufan.cloud/media/" + url;
      } else {
        this.imgUrl = "";
      }
    },
    // 点击确定按钮
    addSave() {
      var url = this.imgUrl;
      this.$emit("showCover", url);
      console.log(url);
      this.maskId = "";
      this.handleClose();
    },
    // 上传成功刷新页面
    upload() {
      this.getImgsList();
    },

    // 打开弹窗
    openImgForm(type) {
      this.type = type;
      this.openForm = true;
      this.getImgsList();
    },
    handleCopy() {
      var Url2 = document.getElementById("input");
      Url2.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
    },
    handleClose() {
      // this.resetForm();
      this.openForm = false;
    },
    // // 重置表单
    resetForm() {
      // vue 有一个对象 保存了 vue的原始数据  this.$options.data()
      // console.log('resetform',this.$options.data())
      // 清除表单数据  函数封装在utils/index.js 里面
      this.form = this.$options.data().form;
      //   this.$refs.form.resetFields();
    },
    handleCurrentChange(val) {
      this.page.start = val;
      // 重新发送请求
      this.getImgsList();
      console.log(2222);
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getImgsList();
      console.log(111);
    }
  }
};
</script>

<style scoped lang="scss">
.imgs {
  position: relative;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .tips {
      font-size: 50px;
      color: green;
    }
  }
}
</style>
