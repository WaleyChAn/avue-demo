<template>
  <div>
    <el-form-item v-if="data.customDefaultValues && data.value" label="默认值">
      <el-row>
        <el-col :span="16">
          <el-input-number
            style="width: 100%"
            v-model="data.value.value1"
            controls-position="right"
            @change="handleValueChange"
            size="small"
          ></el-input-number>
        </el-col>
        <el-col :span="8" style="padding-left: 5px">
          <el-select
            v-model="data.value.value2"
            placeholder="请选择"
            size="small"
            @change="handleValueChange"
          >
            <el-option
              v-for="item in data.params.unit"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="单位">
      <draggable
        tag="ul"
        :list="data.params.unit"
        :group="{ name: 'dic' }"
        ghost-class="ghost"
        handle=".drag-item"
      >
        <li v-for="(item, index) in data.params.unit" :key="index">
          <el-input
            style="margin-right: 5px"
            size="mini"
            clearable
            v-model="item.label"
            placeholder="label"
          ></el-input>
          <i
            class="drag-item el-icon-s-operation"
            style="font-size: 16px; margin: 0 5px; cursor: move"
          ></i>
          <el-button
            @click="handleAddFields(index)"
            circle
            plain
            type="primary"
            size="mini"
            icon="el-icon-plus"
            style="padding: 4px; margin-left: 5px"
          ></el-button>
          <el-button
            @click="handleRemoveFields(index)"
            circle
            plain
            type="danger"
            size="mini"
            icon="el-icon-minus"
            style="padding: 4px; margin-left: 5px"
          ></el-button>
        </li>
      </draggable>
    </el-form-item>
  </div>
</template>

<script>
import Draggable from "vuedraggable";

export default {
  name: "config-unit",
  props: ["data"],
  components: { Draggable },
  created() {
    this.setDefault();
  },
  methods: {
    setDefault() {
      if (!this.data.value) {
        this.data.value = {
          value1: 0,
          value2: ""
        };
      }
    },
    handleValueChange() {
      this.$forceUpdate();
    },
    handleAddFields(index) {
      console.log("当前index", index);
      this.data.params.unit.splice(index + 1, 0, { label: `` });
      // this.data.params.options.push({ label: "" });
    },
    handleRemoveFields(index) {
      this.data.params.unit.splice(index, 1);
    }
  }
};
</script>
