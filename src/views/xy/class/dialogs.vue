<template>
  <div class="dialogs-main">
    <!-- 对话框 -->
    <el-dialog
      title="编辑内容"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="班级名称">
          <el-input v-model="form.className"></el-input>
        </el-form-item>

        <el-form-item label="班级描述">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item label="班级类别">
          <el-radio-group v-model="form.type">
            <el-radio :label="0">前端</el-radio>
            <el-radio :label="1">UI</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="时间">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            placeholder="开始时间"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <el-date-picker
            v-model="form.endTime"
            type="date"
            placeholder="结束时间"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import classApi from "@/api/xy/clazz";
export default {
  props: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        type: 0
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
        classApi
          .classDetail({
            id
          })
          .then(res => {
            this.form = res.data;
          });
      }
      this.dialogVisible = true;
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    // 重置表单
    resetForm() {
      // vue 有一个对象 保存了 vue的原始数据  this.$options.data()
      // console.log('resetform',this.$options.data())
      // 清除表单数据  函数封装在utils/index.js 里面
      this.form = this.$options.data().form;
      //   this.$refs.form.resetFields();
    },
    addSave() {
      console.log(111);
      // 表单验证规则
      this.$refs.form.validate(valid => {
        if (valid) {
          var api = null;
          if (this.form.id) {
            api = classApi.updateClassList;
          } else {
            api = classApi.saveClassList;
          }
          console.log("66666", this.form);
          api({
            xyClassInfo: {
              ...this.form
            }
          }).then(res => {
            if (res.code == true) {
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
        } else {
          this.$message.error("请注意验证规则");
          return false;
        }
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
</style>
