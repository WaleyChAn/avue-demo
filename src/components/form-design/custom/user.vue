<template>
  <div>
    <!-- <eig-multi-select
      collapseTags
      placeholder="请选择人员或组织"
      v-model="multiList"
      :isPersonSingle="false"
      :isOrganizeSingle="false"
      :personTab="true"
      :organizeTab="true"
      :isShowGroup="false"
    >
    </eig-multi-select> -->
  </div>
</template>

<script>
export default {
  name: "User",
  components: {},
  filters: {},
  props: ["column", "value"],
  data() {
    return {
      tmpValue: [],
      showTags: true,
      multiList: []
    };
  },
  watch: {
    value: {
      handler(n) {
        this.tmpValue = this.setDefault(n);
      },
      deep: true
    },
    tmpValue: {
      handler(n) {
        this.$emit("input", this.setDefault(n));
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    setDefault(n) {
      if (typeof n === "string") {
        n = [];
      }
      return n;
    },
    confirm(value) {
      console.log("选人", value);
    }
  }
};
</script>
<style lang="scss" scoped></style>
