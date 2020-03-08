<template>
  <div class="dialogs-main">
    <!-- 对话框 -->
    <el-dialog
      title="编辑内容"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="文章标题" label-width="120px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="摘要" label-width="120px">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.desc"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="最热" label-width="120px">
          <el-switch
            v-model="form.hot"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="封面图片" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-button type="primary" size="small" @click="openImgs(0)"
                >选择图片</el-button
              >
            </el-col>
            <el-col :span="6">
              <el-image
                fit="contain"
                v-show="form.cover"
                :src="form.cover"
                style="width:100px;height:50px"
              ></el-image>
            </el-col>
            <el-col :span="6">
              <el-button v-if="form.cover" type="danger" @click="removeCover"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="切换富文本类型" label-width="120px">
          <el-radio-group @change="changeText" v-model="form.type">
            <el-radio label="0">富文本</el-radio>
            <el-radio label="1">markdown</el-radio>
          </el-radio-group>
          <span
            ><i class="el-icon-warning"> </i
            >切换编辑器会清空内容,请谨慎操作.</span
          >
          <el-button type="primary" size="small" @click="openImgs(1)"
            >插入素材</el-button
          >
        </el-form-item>
        <!-- 富文本 -->
        <Tinymce ref="tin" v-show="form.type == 0"></Tinymce>
        <!-- markdown -->
        <MarkdownEditor ref="md" v-show="form.type == 1"></MarkdownEditor>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSave">确 定</el-button>
      </span>
    </el-dialog>
    <imgDialog ref="imgDialog" @showCover="showCover"></imgDialog>
  </div>
</template>

<script>
import articleApi from "@/api/content/article";
import Tinymce from "@/components/Tinymce";
import MarkdownEditor from "@/components/MarkdownEditor";
import ImgDialog from "./imgDialog";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
import { resetDataAttr } from "@/utils/index";
export default {
  props: {},
  mixins: [pageMixin],
  components: {
    ImgDialog,
    Pagination,
    Tinymce,
    MarkdownEditor
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        cover: "",
        hot: "0",
        type: "0"
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 打开新增用户列表
    openDialog(id) {
      // 如果存在id  则是点击编辑 否则是新增
      if (id) {
        articleApi
          .detailNewList({
            id
          })
          .then(res => {
            this.form = res.data;
            this.$nextTick(() => {
              if (this.form.type == "0") {
                this.setTin(this.form.content1);
              } else {
                this.setMd(this.form.content1);
              }
            });
          });
      }
      this.dialogVisible = true;
    },
    // 打开选择图片弹窗
    openImgs(type) {
      this.$refs.imgDialog.openImgForm(type);
    },
    // 封面图片
    showCover(url) {
      this.form.cover = url;
    },
    // 删除图片
    removeCover() {
      this.form.cover = "";
    },
    // 富文本
    getTin() {
      this.form.content1 = this.$refs.tin.getContent();
      this.form.content2 = this.$refs.tin.getContent();
    },

    setTin(v) {
      this.$refs.tin.onload(() => {
        this.$refs.tin.setContent(v);
      });
    },

    // markdown
    getMd() {
      this.form.content2 = this.$refs.md.getHtml();
      this.form.content1 = this.$refs.md.getValue();
    },
    setMd(v) {
      this.$refs.md.setValue(v);
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
      resetDataAttr(this, "form");
      // this.resetText();
    },
    // 切换文本
    changeText() {
      this.form.content1 = this.form.content2 = "";
      this.resetText();
    },
    // // 重置表单
    resetForm() {
      // vue 有一个对象 保存了 vue的原始数据  this.$options.data()
      // console.log('resetform',this.$options.data())
      // 清除表单数据  函数封装在utils/index.js 里面
      this.form = this.$options.data().form;
      //   this.$refs.form.resetFields();
    },
    // 重置文本
    resetText() {
      if (this.$refs.tin) {
        this.$refs.tin.setContent("");
      }
      if (this.$refs.md) {
        this.$refs.md.setValue("");
      }
    },
    // 确定按钮
    addSave() {
      // 点击确定的时候 关闭遮罩层
      this.$refs.imgDialog.maskId = "";
      var api = null;
      if (this.form.id) {
        api = articleApi.updateNewList;
      } else {
        api = articleApi.addNewList;
      }

      if ((this.form.type = "0")) {
        this.getTin();
      } else {
        this.getMd();
        this.getMd();
      }
      api({
        xyNews: {
          ...this.form
        }
      }).then(res => {
        if (res.code == "success") {
          this.$message.success("保存成功!");
          //  关闭弹窗
          this.handleClose();
          //  刷新数据
          // this.$refs.$parent.getStudentList();
          this.$emit("refresh-list");
        } else {
          this.$message.error("保存失败");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
span {
  margin: 0 50px;
  color: orange;
}
</style>
