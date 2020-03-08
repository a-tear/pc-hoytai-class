<template>
  <div class="my-pagination">
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.start"
      :page-sizes="page.pageSize"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(v) {
      this.$emit("size-change", v);
    },
    handleCurrentChange(v) {
      this.$emit("current-change", v);
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
</style>
