<template>
  <div>
    company
  </div>
</template>

<script>
export default {
  name: "Company",
  components: {},
  filters: {},
  props: ['column', 'value'],
  data () {
    return {
      tmpValue: ''
    };
  },
  watch: {
    value: {
      handler (n) {
        this.tmpValue = n
      },
      deep: true
    },
    tmpValue: {
      handler (n) {
        this.$emit('input', n)
      },
      deep: true
    }
  },
  created () { },
  mounted () { },
  methods: {

  },
};
</script>
<style lang="scss" scoped></style>