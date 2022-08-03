<template>
  <el-row>
    <el-col :span="16">
      <el-input-number
        style="width: 100%"
        v-model="tmpValue.value1"
        controls-position="right"
        size="small"
      ></el-input-number>
    </el-col>
    <el-col :span="8" style="padding-left: 5px">
      <el-select v-model="tmpValue.value2" placeholder="请选择" size="small">
        <el-option
          v-for="item in unit"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "unit",
  components: {},
  filters: {},
  props: {
    value: {
      type: [Object, String],
      default: () => {
        return {};
      }
    },
    column: {
      type: Object,
      default: () => {
        return {};
      }
    },
    unit: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      tmpValue: this.value
    };
  },
  watch: {
    value: {
      handler(n) {
        this.tmpValue = this.setDefault(n);
      },
      deep: true
    },
    tmpValue: {
      handler(n) {
        this.$emit("input", this.setDefault(n));
      },
      deep: true
    }
  },
  created() {
    this.tmpValue = this.value;
  },
  mounted() {},
  methods: {
    setDefault(n) {
      if (typeof n === "string") {
        n = {
          value1: "",
          value2: ""
        };
      }
      return n;
    },
    validateField() {
      // 自定义校验
      return new Promise((resolve, reject) => {
        /**
         * 校验返回值格式
         * @param isValidatedField 是否校验成功
         * @param massage String 返回报错信息
         * */
        let res = {
          isValidatedField: false,
          massage: ``
        };
        const { value1, value2 } = this.tmpValue;

        // 自定义校验规则
        if (value1 < 100) {
          res = {
            isValidatedField: false,
            massage: `数值必须大于100`
          };
        } else if (value2 !== "日") {
          res = {
            isValidatedField: false,
            massage: `必须选择“日”`
          };
        } else {
          res.isValidatedField = true;
        }
        resolve(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
