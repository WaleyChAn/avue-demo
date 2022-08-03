<template>
  <div class="of-form-group-header">
    <div class="group-container clearfix">
      <div class="group-icon">
        <i :class="data.icon || 'el-icon-menu'"></i>
      </div>

      <div class="group-title">{{ data.label }}</div>
      <div
        v-for="button in data.button"
        :key="button.value"
        :class="button.position"
        :style="{ color: button.color }"
        class="group-btn"
        @click.stop="buttonClick(button.event)"
      >
        {{ button.label }}
      </div>
    </div>
    <!-- <div class="group-more">收起</div> -->
  </div>
</template>

<script>
export default {
  name: "GroupHeader",
  components: {},
  filters: {},
  props: ["data"],
  created() {},
  mounted() {
    console.log(this.data);
  },
  methods: {
    buttonClick(fn) {
      const _this = this;
      const fns = eval(fn);
      fns();
    },
  },
};
</script>
<style lang="scss" scoped></style>