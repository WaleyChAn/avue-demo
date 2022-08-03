<template>
  <div :style="{ display: `${hideDiv}` }">
    <div
      class="title"
      :style="{
        color: `${params.explain.color}`
      }"
    >
      <span v-if="params.explain.bold" style="font-size: 16px"
        ><strong>{{ params.explain.title }}</strong></span
      >
      <span v-else style="font-size: 16px">{{ params.explain.title }}</span>
      <div v-if="params.explain.close" class="close">
        <el-button type="text" @click="close">
          <i class="el-icon-close"></i
        ></el-button>
      </div>
    </div>
    <div
      :style="{
        color: `${params.explain.color}`
      }"
    >
      {{ params.explain.description }}
      <a
        v-if="params.explain.isUrl"
        :href="params.explain.url"
        target="_blank"
        :style="{
          color: `${params.explain.urlColor}`
        }"
      >
        {{ params.explain.urlName }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Explain",
  components: {},
  filters: {},
  props: ["column", "value", "params"],
  data() {
    return {
      tmpValue: "",
      tipDisplay: true,
      co: {},
      hideDiv: ""
    };
  },
  watch: {
    value: {
      handler(n) {
        this.tmpValue = n;
      },
      deep: true
    },
    column: {
      handler(n) {
        this.co = n;
      },
      deep: true,
      immediate: true
    },

    tmpValue: {
      handler(n) {
        this.$emit("input", n);
      },
      deep: true
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    close() {
      this.hideDiv = "none";
      // this.$set(this.co, "display", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.close {
  font-size: 12px;
  opacity: 1;
  position: absolute;
  top: 3px;
  right: 15px;
  cursor: pointer;
}
</style>
