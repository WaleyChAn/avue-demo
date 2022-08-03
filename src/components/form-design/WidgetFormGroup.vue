<template>
  <div>
    <div class="widget-form-group__head"
         v-show="column.label">
      <div class="group-container">
        <div class="group-icon">
          <i :class="column.icon || 'el-icon-menu'"></i>
        </div>
        <div class="group-title">{{ column.label }}</div>
        <div v-for="button in column.button"
             :key="button.value"
             :class="button.position"
             :style="{ color: button.color }"
             class="group-btn">
          {{ button.label }}
        </div>
      </div>
    </div>
    <draggable class="widget-form-group__body"
               :list="column.children.column"
               :group="{ name: 'form' }"
               ghost-class="ghost"
               :animation="200"
               @add="handleWidgetGroupAdd($event, column)"
               @end="$emit('change')">
      <template v-for="(item, groupIndex) in column.children.column">
        <div class="widget-form-table"
             v-if="item.type == 'dynamic'"
             :key="groupIndex"
             :class="{ active: selectWidget.prop == item.prop }"
             @click.stop="handleWidgetTableSelect(item)">
          <widget-form-table :data="column.children"
                             :column="item"
                             :index="groupIndex"
                             :select.sync="selectWidget"
                             @change="$emit('change')"></widget-form-table>
        </div>
        <el-col v-else
                :key="groupIndex"
                :md="item.span || 12"
                :xs="24"
                :offset="item.offset || 0">
          <el-form-item class="widget-form-group__item"
                        :label="item.labelWidth == 0 ? '' : item.label"
                        :labelWidth="
              item.labelWidth
                ? item.labelWidth + 'px'
                : item.labelWidth == 0
                ? '0'
                : '80px'
            "
                        :prop="item.prop"
                        :class="{
              active: selectWidget.prop == item.prop,
              required: item.required,
            }"
                        @click.native.stop="handleWidgetTableSelect(item)">
            <widget-form-item :item="item"
                              :params="column.params"></widget-form-item>
            <el-button title="删除"
                       @click.stop="handleWidgetTableDelete(column, groupIndex)"
                       class="widget-form-group__item--delete"
                       v-if="selectWidget.prop == item.prop"
                       circle
                       plain
                       type="danger">
              <i class="iconfont icon-delete"></i>
            </el-button>
            <el-button title="复制"
                       @click.stop="handleWidgetTableClone(column, item)"
                       class="widget-form-group__item--clone"
                       v-if="selectWidget.prop == item.prop"
                       circle
                       plain
                       type="primary">
              <i class="iconfont icon-copy"></i>
            </el-button>
          </el-form-item>
        </el-col>
      </template>
    </draggable>
    <el-button title="删除"
               @click.stop="handleWidgetDelete(index)"
               class="widget-action-delete"
               v-if="selectWidget.prop == column.prop"
               circle
               plain
               size="small"
               type="danger">
      <i class="iconfont icon-delete"></i>
    </el-button>
    <el-button title="清空"
               @click.stop="handleWidgetClear(index)"
               class="widget-action-clear"
               v-if="selectWidget.prop == column.prop"
               circle
               plain
               size="small"
               type="warning">
      <i class="iconfont icon-clear"></i>
    </el-button>
    <el-button title="复制"
               @click.stop="handleWidgetCloneTable(index)"
               class="widget-action-clone"
               v-if="selectWidget.prop == column.prop"
               circle
               plain
               size="small"
               type="primary">
      <i class="iconfont icon-copy"></i>
    </el-button>
  </div>
</template>
<script>
import WidgetFormItem from "./WidgetFormItem";
import WidgetFormTable from "./WidgetFormTable";
import draggable from "vuedraggable";

export default {
  name: "widget-form-group",
  props: ["data", "column", "select", "index"],
  components: { WidgetFormItem, WidgetFormTable, draggable },
  data () {
    return {
      selectWidget: this.select,
    };
  },
  methods: {
    handleSelectWidget (index) {
      this.selectWidget = this.data.column[index];
    },
    handleWidgetClear (index) {
      this.data.column[index].children.column = [];
      this.selectWidget = this.data.column[index];

      this.$emit("change");
    },
    handleWidgetDelete (index) {
      if (this.data.column.length - 1 === index) {
        if (index === 0) this.selectWidget = {};
        else this.handleSelectWidget(index - 1);
      } else this.handleSelectWidget(index + 1);

      this.$nextTick(() => {
        this.data.column.splice(index, 1);
        this.$emit("change");
      });
    },
    handleWidgetCloneTable (index) {
      let cloneData = this.deepClone(this.data.column[index]);
      cloneData.prop = cloneData.type
        ? cloneData.type + "-" + this.guid()
        : this.guid();
      cloneData.children.column.forEach((t) => {
        t.prop = t.type ? t.type + "-" + this.guid() : this.guid();
      });
      this.data.column.splice(index, 0, cloneData);
      this.$nextTick(() => {
        this.handleSelectWidget(index + 1);
        this.$emit("change");
      });
    },
    guid () {
      return "xxxxxxxx-xxxxxxxx-xxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    handleWidgetTableSelect (data) {
      this.selectWidget = data;
    },
    handleWidgetTableClone (column, item) {
      const data = this.deepClone(item);
      data.prop = data.type ? data.type + "-" + this.guid() : this.guid();
      this.$set(column.children.column, column.children.column.length, {
        ...data,
      });
      this.$nextTick(() => {
        this.selectWidget =
          column.children.column[column.children.column.length - 1];
        this.$emit("change");
      });
    },
    handleWidgetTableDelete (column, index) {
      if (column.children.column.length - 1 == index) {
        if (index == 0) this.selectWidget = column;
        else this.selectWidget = column.children.column[index - 1];
      } else this.selectWidget = column.children.column[index + 1];
      this.$nextTick(() => {
        column.children.column.splice(index, 1);
        this.$emit("change");
      });
    },
    handleWidgetGroupAdd (evt, column) {
      // console.log("分组移进组件", evt, column);
      let newIndex = evt.newIndex;
      const item = evt.item;
      if (["group"].includes(column.children.column[newIndex].type)) {
        column.children.column.splice(newIndex, 1);
        this.$message({ type: "warning", message: "分组中不支持放入该组件" });
        return;
      }

      if (newIndex == 1 && newIndex > column.children.column.length - 1)
        newIndex = 0;
      // if (["分组"].includes(item.textContent)) {
      //   column.children.column.splice(newIndex, 1);
      //   return;
      // }

      const data = this.deepClone(column.children.column[newIndex]);
      if (!data.prop)
        data.prop = data.type ? data.type + "-" + this.guid() : this.guid();
      delete data.icon;
      if (data.type == "dynamic" || data.type.includes('aggregation')) data.span = 24;
      else data.span = 12;
      this.$set(column.children.column, newIndex, { ...data });
      this.selectWidget = column.children.column[newIndex];

      this.$emit("change");
    },
  },
  watch: {
    select (val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler (val) {
        this.$emit("update:select", val);
      },
      deep: true,
    },
  },
};
</script>
