<template>
  <div>
    <div>自定义组件</div>
    <div>
      值：{{ tmpValue }}
      <el-button @click="onChange">修改</el-button>
    </div>
    <div>自定义参数： {{ column }}</div>
    <div>自定义事件：</div>
    <div>
      <el-button @click="demoEvent1">事件1（demoEvent1）</el-button>
      <el-button @click="demoEvent2">事件2（demoEvent2）</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  components: {},
  filters: {},
  props: ["column", "value"],
  data () {
    return {
      tmpValue: "",
    };
  },
  computed: {
    event () {
      return this.column.event || {};
    },
  },
  watch: {
    value: {
      handler (n) {
        this.tmpValue = n;
      },
      deep: true,
    },
    tmpValue: {
      handler (n) {
        this.$emit("input", n);
      },
      deep: true,
    },
  },
  created () { },
  mounted () { },
  methods: {
    onChange () {
      // 修改临时值 tmpValue
      this.tmpValue = Math.round(Math.random() * 10);
    },
    demoEvent1 () {
      if (this.event) {
        const { demoEvent1 } = this.column;
        if (typeof demoEvent1 === "function") {
          demoEvent1();
        }
      }
    },
    demoEvent2 () {
      if (this.event) {
        const { demoEvent2 } = this.column;
        if (typeof demoEvent2 === "function") {
          demoEvent2();
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>