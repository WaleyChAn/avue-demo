<template>
  <div>
    <!-- {{ data }} -->
    <el-form-item label="标题">
      <el-input v-model="data.params.explain.title" size="small"></el-input>
    </el-form-item>
    <el-form-item label="辅助描述">
      <el-input
        v-model="data.params.explain.description"
        size="small"
      ></el-input>
    </el-form-item>
    <el-form-item label="字段颜色">
      <el-row>
        <el-col :span="20">
          <el-input v-model="data.params.explain.color" size="small"></el-input>
        </el-col>
        <el-col :span="4">
          <el-color-picker
            v-model="data.params.explain.color"
            size="small"
          ></el-color-picker>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="属性">
      <el-row>
        <el-col :span="9">
          <el-checkbox
            v-model="data.params.explain.bold"
            label="标题加粗"
          ></el-checkbox>
        </el-col>
        <el-col :span="7">
          <el-checkbox
            v-model="data.params.explain.close"
            label="可关闭"
          ></el-checkbox>
        </el-col>
        <el-col :span="7">
          <el-checkbox
            v-model="data.params.explain.isUrl"
            label="超链接"
          ></el-checkbox>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item v-if="data.params.explain.isUrl" label="超链接名字">
      <el-input v-model="data.params.explain.urlName" size="small"></el-input>
    </el-form-item>
    <el-form-item v-if="data.params.explain.isUrl" label="超链接地址">
      <el-input v-model="data.params.explain.url" size="small"></el-input>
    </el-form-item>
    <el-form-item v-if="data.params.explain.isUrl" label="超链接颜色">
      <el-row>
        <el-col :span="20">
          <el-input
            v-model="data.params.explain.urlColor"
            size="small"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-color-picker
            v-model="data.params.explain.urlColor"
            size="small"
          ></el-color-picker>
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-explain",
  props: ["data"],

  data() {
    return {};
  },

  watch: {},
  methods: {}
};
</script>
<style scoped>
.expa {
  padding-bottom: 7px;
}
</style>
