<template>
  <div>
    <el-form-item label="图标">
      <avue-input-icon
        v-model="data.icon"
        placeholder="请选择图标"
        :icon-list="iconList"
      ></avue-input-icon>
    </el-form-item>
    <el-form-item label="开启折叠">
      <el-switch v-model="data.arrow"></el-switch>
    </el-form-item>
    <el-form-item label="默认展开" v-if="data.arrow">
      <el-switch v-model="data.collapse"></el-switch>
    </el-form-item>
    <el-form-item label="默认展开" v-if="data.arrow">
      <el-switch v-model="data.collapse"></el-switch>
    </el-form-item>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label" style="padding: 0">操作按钮：</label>
      <div v-if="data.aggregation" class="el-form-item__content">
        <el-alert
          title="请于对应模块的头部组件编辑按钮功能"
          type="warning"
          :closable="false"
          style="margin-top: 8px"
        >
        </el-alert>
      </div>
      <div v-else class="el-form-item__content">
        <draggable
          tag="ul"
          :list="data.button"
          :group="{ name: 'button' }"
          ghost-class="ghost"
          handle=".drag-item"
        >
          <li v-for="(item, index) in data.button" :key="index">
            <i
              class="drag-item el-icon-s-operation"
              style="font-size: 16px; margin: 0 5px; cursor: move"
            ></i>
            <el-input
              style="margin-right: 5px"
              size="mini"
              clearable
              v-model="item.label"
              placeholder="label"
            ></el-input>
            <el-select
              style="margin-right: 5px"
              size="mini"
              clearable
              v-model="item.position"
              placeholder="position"
            >
              <el-option value="left" label="居左"></el-option>
              <el-option value="right" label="居右"></el-option>
            </el-select>
            <el-select
              size="mini"
              clearable
              v-model="item.color"
              placeholder="color"
            >
              <el-option
                v-for="item in colorList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left; padding-right: 0;">{{
                  item.label
                }}</span>
                <span
                  style="float: right; display: block; width: 10px; height: 10px; padding: 0; margin: 12px 20px 12px 0; border-radius: 2px;"
                  :style="{ background: item.value }"
                ></span>
              </el-option>
            </el-select>
            <el-tooltip effect="dark" content="添加点击事件" placement="top">
              <el-button
                @click="handleEventClick(item)"
                circle
                plain
                type="primary"
                size="mini"
                icon="el-icon-edit"
                style="padding: 4px; margin-left: 5px"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除按钮" placement="top">
              <el-button
                @click="handleRemoveFields(index)"
                circle
                plain
                type="danger"
                size="mini"
                icon="el-icon-minus"
                style="padding: 4px; margin-left: 5px"
              ></el-button>
            </el-tooltip>
          </li>
        </draggable>
        <div style="margin-left: 22px">
          <el-button type="text" @click="handleAddFields">添加按钮 </el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="按钮事件"
      :visible.sync="showDialogEvent"
      width="50%"
      :before-close="handleDialogEventClose"
    >
      <monaco-editor
        v-model="tmpEvent"
        height="300"
        keyIndex="dialog-event"
        :options="editorOptions"
      ></monaco-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialogEvent = false">取 消</el-button>
        <el-button type="primary" @click="onDialogEventConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Draggable from "vuedraggable";
import MonacoEditor from "../utils/monaco-editor";

export default {
  name: "config-group",
  props: ["data"],
  components: { Draggable, MonacoEditor },
  data() {
    return {
      iconList: [
        {
          label: "基本图标",
          list: [
            "iconfont icon-group",
            "iconfont icon-input",
            "iconfont icon-textarea",
            "iconfont icon-radio",
            "iconfont icon-checkbox",
            "iconfont icon-select",
            "iconfont icon-number",
            "iconfont icon-date",
            "iconfont icon-date-range",
            "fa fa-calendar-o",
            "iconfont icon-link",
            "fa fa-th"
          ]
        },

        {
          label: "elementui图标",
          list: [
            "el-icon-info",
            "el-icon-error",
            "el-icon-error",
            "el-icon-success",
            "el-icon-warning",
            "el-icon-question"
          ]
        },
        {
          label: "方向图标",
          list: [
            "el-icon-info",
            "el-icon-back",
            "el-icon-arrow-left",
            "el-icon-arrow-down",
            "el-icon-arrow-right",
            "el-icon-arrow-up"
          ]
        },
        {
          label: "符号图标",
          list: [
            "el-icon-plus",
            "el-icon-minus",
            "el-icon-close",
            "el-icon-check"
          ]
        }
      ],
      colorList: [
        {
          label: "确认",
          value: "#409EFF"
        },
        {
          label: "警告",
          value: "#E6A23C"
        },
        {
          label: "危险",
          value: "#F56C6C"
        },
        {
          label: "默认",
          value: "#909399"
        }
      ],
      showDialogEvent: false,
      editorOptions: {
        fullScreen: true,
        minimap: {
          enabled: false
        }
      },
      tmpButton: {},
      tmpEvent: ""
    };
  },
  methods: {
    handleEventClick(item) {
      this.tmpButton = item;
      this.tmpEvent =
        item.event !== "" ? item.event : "(function () {\r\n\r\n})";
      this.showDialogEvent = true;
    },
    handleRemoveFields(index) {
      this.data.button.splice(index, 1);
    },
    handleAddFields() {
      const i = Math.ceil(Math.random() * 99999);
      if (!this.data.button) {
        this.$set(this.data, "button", []);
      }
      this.data.button.push({
        label: `按钮${i}`,
        value: `button_${i}`,
        position: "left",
        color: "#409EFF",
        event: "(function () {\r\n\r\n})"
      });
    },
    onDialogEventConfirm() {
      const { value } = this.tmpButton;
      const button = this.data.button.find(item => item.value === value);
      button.event = this.tmpEvent;
      this.showDialogEvent = false;
    },
    handleDialogEventClose() {
      this.tmpButton = {};
      this.tmpEvent = "";
      this.showDialogEvent = false;
    }
  }
};
</script>
<style lang="scss" scoped></style>
