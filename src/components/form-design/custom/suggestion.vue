<template>
  <div class="step-textarea-box">
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入拟稿意见..."
      v-model="tmpValue"
      :disabled="column.disabled"
      class="formTextarea"
    >
    </el-input>
    <div class="textarea-btn">
      <el-button type="text" v-if="column.params.suggestion.allowAdd"
        >存为常用词条</el-button
      >
      <el-button type="text" v-if="column.params.suggestion.allowRead"
        >常用词条</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Suggestion",
  components: {},
  filters: {},
  props: ["column", "value"],
  data() {
    return {
      tmpValue: ""
    };
  },
  watch: {
    value: {
      handler(n) {
        this.tmpValue = n;
      },
      deep: true
    },
    tmpValue: {
      handler(n) {
        this.$emit("input", n);
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.step-textarea-box .textarea-btn {
  position: absolute;
  right: 10px;
  bottom: 6px;
  font-size: 12px;
  color: #bbbbbb;
}
</style>
