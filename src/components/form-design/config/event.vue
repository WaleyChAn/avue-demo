<template>
  <div class="formEven">
    <el-button type="primary" size="small" @click="openEvenDialog">代码编辑器</el-button>

    <el-dialog title="代码编辑器" :visible.sync="dialogVisible" width="60%" height="100%" :before-close="handleClose"
      :destroy-on-close="true">
      <el-container>
        <el-aside width="200px">
          <!--  @open="handleOpen"
            @close="handleClose" -->
          <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleOpen" active-text-color="white">
            <el-menu-item index="1">
              <span slot="title">Function change(value)</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">Function click(value)</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">Function blur(value)</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">Function focus(value)</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="el-form-item__content">
            <monaco-editor v-model="eventArr[avtiveIndex - 1]" height="330"
              :keyIndex="`event-${avtiveIndex}-${data.prop}`" :options="options"></monaco-editor>
          </div>
        </el-main>
      </el-container>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveEvent">保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import MonacoEditor from "@utils/monaco-editor";
import MonacoEditor from "../utils/monaco-editor";

export default {
  name: "config-event",
  components: { MonacoEditor },
  props: ["data"],
  watch: {
    "data.prop": {
      handler() {
        const { change, click, focus, blur } = this.data;

        this.$set(
          this.eventArr,
          0,
          change ? change + "" : "(function (e) {\r\n\r\n})"
        );
        this.$set(
          this.eventArr,
          1,
          click ? click + "" : "(function (e) {\r\n\r\n})"
        );
        this.$set(
          this.eventArr,
          2,
          focus ? focus + "" : "(function (e) {\r\n\r\n})"
        );
        this.$set(
          this.eventArr,
          3,
          blur ? blur + "" : "(function (e) {\r\n\r\n})"
        );
      },
      immediate: true,
    },

    eventArr(newValue) {
      // console.log("监听事件val", newValue);
    },
  },

  data() {
    return {
      change: "",
      click: "",
      focus: "",
      blur: "",
      eventArr: ["", "", "", ""],

      avtiveIndex: 1,
      options: {
        fullScreen: true,
        minimap: {
          enabled: false,
        },
      },
      dialogVisible: false,
    };
  },
  mounted() { },
  methods: {
    handleClose() { },
    openEvenDialog() {
      this.dialogVisible = true;
    },
    handleOpen(index) {
      this.avtiveIndex = index;
    },
    saveEvent() {
      try {
        this.$set(this.data, "change", this.eventArr[0]);
        this.$set(this.data, "click", this.eventArr[1]);
        this.$set(this.data, "focus", this.eventArr[2]);
        this.$set(this.data, "blur", this.eventArr[3]);
        this.$message.success("保存成功");
        this.dialogVisible = false;
      } catch (err) {
        console.error(e);
      }
    },
  },
};
</script>
<style scoped>
.formEven>>>.el-dialog__header {
  padding: 10px 20px;
  border-bottom: solid 1px #ebebeb;
}

.formEven>>>.el-dialog__footer {
  text-align: center;
}

.formEven>>>.el-menu-item.is-active {
  background-color: #0c7bca !important;
}
</style>

