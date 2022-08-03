<template>
  <div class="aggregation-body">
    <div class="aggregation-item">
      <el-form ref="aggregationForm"
               :model="tmpValue"
               :rules="column.validated ? rules : {}"
               :labelWidth="labelWidth"
               :validate-on-rule-change="false"
               class="avue-form__group avue-form__group--flex">
        <el-col :span="12">
          <el-form-item :label="getLabel('value1')"
                        prop="value1">
            <el-input v-model="tmpValue.value1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="getLabel('value2')"
                        prop="value2">
            <el-select v-model="tmpValue.value2"
                       placeholder="请选择活动区域">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="getLabel('value3')"
                        prop="value3">
            <el-input type="textarea"
                      v-model="tmpValue.value3"
                      rows="4"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="getLabel('value4')"
                        prop="value4">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="tmpValue.value4"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>

<script>
import { findComponentUpward } from "../../mixins/findComponents";

export default {
  name: "AggregationDemo",
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
    }
  },
  computed: {
    labelWidth () {
      const _formItem = findComponentUpward(this, "ElFormItem");
      return _formItem ? _formItem.labelWidth : "100px";
    },
    defaultValue () {
      const content = this.column.content || []
      let defaultValue = {}
      content.map(item => {
        defaultValue[item.prop] = item.default
      })
      return defaultValue
    },
  },
  data () {
    return {
      tmpValue: this.value,
      rules: {
        value1: [
          { required: true, message: "请输入活动名称" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符" }
        ],
        value2: [{ required: true, message: "请选择活动区域" }],
        value3: [{ required: true, message: "请输入活动名称" }],
        value4: [{ type: "date", required: true, message: "请选择时间" }]
      }
    };
  },
  watch: {
    value: {
      handler (n) {
        this.tmpValue = this.setDefault(n);
      },

      deep: true
    },
    tmpValue: {
      handler (n) {
        this.$emit("input", this.setDefault(n));
      },
      deep: true
    }
  },
  created () {
    this.tmpValue = this.value;
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.aggregationForm.resetFields();
    });
  },
  methods: {
    setDefault (n) {
      if (typeof n === "string") {
        n = { ...this.defaultValue }
      }
      return n;
    },
    getLabel (val) {
      const content = this.column.content || []
      let label = ''
      content.map(item => {
        if (item.prop === val) {
          label = item.label
        }
      })
      return label
    },
    validateField () {
      return new Promise((resolve, reject) => {
        const res = {
          isValidatedField: false,
          massage: ``
        };
        this.$refs.aggregationForm.validate(valid => {
          if (valid) {
            res.isValidatedField = true;
          } else {
            console.log("error submit!!");
          }
        });
        resolve(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
