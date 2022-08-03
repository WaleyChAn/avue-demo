<template>
  <div>
    <el-form-item label="占位内容">
      <el-row>
        <el-col :span="6">
          <el-select v-model="placeholderLanguageValue" placeholder="请选择">
            <el-option
              v-for="item in languageOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-col>
        <el-col :span="18">
          <el-input
            v-if="placeholderLanguageValue == 0"
            v-model="data.placeholder"
            clearable
            placeholder="标题"
          ></el-input>
          <el-input
            v-if="placeholderLanguageValue == 1"
            v-model="data.enPlaceholder"
            clearable
            placeholder="English Label"
          ></el-input
        ></el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="前缀">
      <el-input v-model="data.prepend" clearable placeholder="前缀"></el-input>
    </el-form-item>
    <el-form-item label="后缀">
      <el-input v-model="data.append" clearable placeholder="后缀"></el-input>
    </el-form-item>
    <el-form-item label="最大长度">
      <el-input-number
        v-model="data.maxlength"
        controls-position="right"
        placeholder="最大长度"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="显示计数" v-if="data.type != 'password'">
      <el-switch v-model="data.showWordLimit"></el-switch>
    </el-form-item>
    <el-form-item label="显示密码" v-if="data.type == 'password'">
      <el-switch v-model="data.showPassword"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-input",
  props: ["data", "defaultValues"],

  data() {
    return {
      languageOption: [
        {
          label: "中",
          value: 0,
        },
        {
          label: "英",
          value: 1,
        },
      ],
      placeholderLanguageValue: 0,
    };
  },
};
</script>
