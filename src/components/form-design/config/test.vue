<template>
  <div>
    <el-form-item label="占位内容">
      <el-input v-model="data.placeholder"
                clearable
                placeholder="占位内容"></el-input>
    </el-form-item>
    <el-form-item label="前缀">
      <el-input v-model="data.prepend"
                clearable
                placeholder="前缀"></el-input>
    </el-form-item>
    <el-form-item label="后缀">
      <el-input v-model="data.append"
                clearable
                placeholder="后缀"></el-input>
    </el-form-item>
    <el-form-item label="最大长度">
      <el-input-number v-model="data.maxlength"
                       controls-position="right"
                       placeholder="最大长度"></el-input-number>
    </el-form-item>
    <el-form-item label="显示计数"
                  v-if="data.type != 'password'">
      <el-switch v-model="data.showWordLimit"></el-switch>
    </el-form-item>
    <el-form-item label="显示密码"
                  v-if="data.type == 'password'">
      <el-switch v-model="data.showPassword"></el-switch>
    </el-form-item>
    <el-form-item label="demoEvent1"
                  class="el-form--label-top">
      <monaco-editor v-model="demoEvent1"
                     height="300"
                     :keyIndex="`event-demoEvent1-${data.prop}`"
                     :options="options"></monaco-editor>
    </el-form-item>
    <el-form-item label="demoEvent2"
                  class="el-form--label-top">
      <monaco-editor v-model="demoEvent2"
                     height="300"
                     :keyIndex="`event-demoEvent2-${data.prop}`"
                     :options="options"></monaco-editor>
    </el-form-item>
  </div>
</template>

<script>
import MonacoEditor from "../utils/monaco-editor";

export default {
  name: "config-test",
  components: { MonacoEditor },
  props: ['data', 'defaultValues'],
  data () {
    return {
      demoEvent1: '',
      demoEvent2: '',
      demoEvent3: '',
      options: {
        fullScreen: true,
        minimap: {
          enabled: false,
        },
      },
    }
  },
  watch: {
    "data.prop": {
      handler () {
        const { demoEvent1, demoEvent2 } = this.data
        this.$set(
          this,
          'demoEvent1',
          demoEvent1 ? demoEvent1 + '' : '(function () {\r\n\r\n})'
        )
        this.$set(
          this,
          'demoEvent2',
          demoEvent2 ? demoEvent2 + '' : '(function () {\r\n\r\n})'
        )
      },
      immediate: true,
    },
  },
  mounted () {
    this.$nextTick(() => {
      const event = ['demoEvent1', 'demoEvent2']
      event.forEach((e) => {
        this.$watch(`${e}`, (val) => {
          try {
            this.$set(this.data, e, eval(val))
          } catch (err) {
            // console.error(e)
          }
        })
      })
    })
  }
}
</script>
