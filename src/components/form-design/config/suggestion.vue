<template>
  <div>
    <el-checkbox
      v-model="data.params.suggestion.allowRead"
      label="允许读取词条"
    ></el-checkbox>
    <el-checkbox
      v-model="data.params.suggestion.allowAdd"
      label="允许添加词条"
    ></el-checkbox>
  </div>
</template>

<script>
export default {
  name: "config-suggestion",
  props: ["data"]
};
</script>
