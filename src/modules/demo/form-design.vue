<template>
  <avue-form-design
    :options="options"
    @submit="handleSubmit"
    class="of-form-design"
    storage
  ></avue-form-design>
</template>

<script>
export default {
  name: "AVUEFORM",
  components: {},
  filters: {},
  data() {
    return {
      options: {
        labelWidth: 100
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSubmit(val) {
      this.$message.success("查看控制台");
      console.log(val);
    }
  }
};
</script>
