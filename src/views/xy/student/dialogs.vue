<template>
  <div class="dialog-main">
    <!-- 对话框 -->
    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号">
              <el-input v-model="form.manID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级">
              <el-select
                v-model="form.classId"
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
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="宿舍">
              <el-select
                v-model="form.dormId"
                clearable
                placeholder="请选择宿舍"
              >
                <el-option
                  v-for="item in dormList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <span>补充信息</span>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="住宿">
              <el-date-picker
                v-model="form.dormStartTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="离宿">
              <el-date-picker
                v-model="form.dormEndTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备用电话">
              <el-input v-model="form.tel2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"
            ><el-form-item label="QQ">
              <el-input v-model="form.qq"></el-input> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="微信">
              <el-input v-model="form.wx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业学校">
              <el-input v-model="form.school"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作">
              <el-input v-model="form.job"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 交费信息 -->
        <div class="pay">
          <span>交费信息</span>
          <el-button
            @click="openForm"
            style="float: right; padding: 3px 0"
            type="text"
            >交费记录+</el-button
          >
        </div>
        <el-card
          :visible.sync="isShow"
          class="box-card"
          style="margin-top: 20px"
          v-if="isShow"
        >
          <div slot="header" class="clearfix">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="类型">
                  <el-radio-group v-model="form.costType">
                    <el-radio :label="0">学费</el-radio>
                    <el-radio :label="1">住宿费</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="金额">
                  <el-input v-model="form.costValue"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交费时间">
                  <el-date-picker
                    v-model="form.costTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="form.costBak"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <span slot="footer" style="float: right; padding: 3px 0">
              <el-button @click="isShow = false">取 消</el-button>
              <el-button type="primary" @click="submitCost">确 定</el-button>
            </span>
          </div>
        </el-card>
      </el-form>
      <!-- 表格 -->
      <el-card style="margin-top: 10px">
        <el-table border :data="costList" style="width: 100%">
          <el-table-column type="index" width="60"> </el-table-column>
          <el-table-column prop="costType" label="类型" width="180">
          </el-table-column>
          <el-table-column prop="costValue" label="金额" width="180">
          </el-table-column>
          <el-table-column prop="costTime" label="时间" width="180">
          </el-table-column>
          <el-table-column prop="costBak" label="备注" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope" v-if="!scope.row.id">
              <el-button
                @click="delCostTable(scope.row)"
                type="text"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import classApi from "@/api/xy/clazz";
import dormApi from "@/api/xy/dorm";
import costApi from "@/api/xy/cost";
import studentApi from "@/api/xy/student";
import resetDataAttr from "@/utils/index";
import { regionDataPlus, CodeToText } from "element-china-area-data";
// import { log } from "util";
export default {
  props: {},
  data() {
    return {
      isShow: false,
      dialogVisible: false,
      form: {
        sex: 0,
        costType: 0
      },
      classList: [],
      dormList: [],
      costList: [],
      options: regionDataPlus,
      selectedOptions: [],
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  created() {
    // 初始化宿舍列表
    this.getDormList();
    //   初始化班级信息
    this.getClassList();
  },
  mounted() {},
  methods: {
    // 打开交费表单
    openForm() {
      this.isShow = true;
    },

    // 城市选择
    handleChange(value) {
      console.log("value", value);
      this.form.city = this.selectedOptions.join(",");
      var arr = [];
      value.forEach(ele => {
        arr.push(CodeToText[ele]);
      });
      this.form.cityText = arr.join("");
    },
    // 获取班级列表
    getClassList() {
      classApi.getClassList().then(res => {
        this.classList = res.data.list;
      });
    },
    //获取宿舍列表
    getDormList() {
      dormApi.getDormList({}).then(res => {
        this.dormList = res.data.list;
        console.log("宿舍列表", res);
      });
    },

    // 获取付费列表
    getCostList(id) {
      costApi
        .getCostList({
          userId: id
        })
        .then(res => {
          this.costList = res.data.list;
          console.log("付费列表", res);
        });
    },
    // 交费信息提交表格
    submitCost() {
      var obj = {
        ...this.form,
        tempId: Math.random() * 10
      };
      this.costList.push(obj);
      this.isShow = false;
      this.form = "";
      console.log(this.costList);
    },
    // 删除交费记录
    delCostTable(value) {
      var del = this.costList.filter(res => res.tempId == value.tempId);
      this.costList.splice(del, 1);
    },
    // 点击确定 新增用户渲染到列表
    addSave() {
      console.log(111);
      // 表单验证规则
      this.$refs.form.validate(valid => {
        if (valid) {
          var api = null;
          if (this.form.id) {
            api = studentApi.updateStudent;
          } else {
            api = studentApi.saveStudentList;
          }
          console.log("66666", this.form);

          var num = 0;
          var obj = {};
          // 循环找到xyCostItems_
          this.costList.forEach(item => {
            if (item.tempId) {
              obj["xyCostItems_" + num] = item;
              num++;
            }
          });
          api({
            xyUser: {
              ...this.form
            },
            _size: this.costList.length,
            ...obj
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
        } else {
          this.$message.error("请注意验证规则");
          return false;
        }
      });
    },
    // 打开新增用户列表
    openDialog(id) {
      // 如果存在id  则是点击编辑 否则是新增
      if (id) {
        studentApi
          .studentDetail({
            id
          })
          .then(res => {
            if (res.data.city) {
              this.selectedOptions = res.data.city.split(",");
            } else {
              this.selectedOptions = [];
            }
            this.getCostList(id);
            // 男女
            res.data.sex = Number.parseInt(res.data.sex);
            this.form = res.data;
          });
      }
      this.dialogVisible = true;
    },
    // 点击X 关闭弹窗
    handleClose() {
      this.resetForm();
      this.dialogVisible = false;
    },
    // 重置表单
    resetForm() {
      // vue 有一个对象 保存了 vue的原始数据  this.$options.data()
      // console.log('resetform',this.$options.data())
      // 清除表单数据  函数封装在utils/index.js 里面
      this.form = this.$options.data().form;
      this.costList = this.$options.data().costList;
      // form表单提供的重置
      this.$refs.form.resetFields();
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
</style>
