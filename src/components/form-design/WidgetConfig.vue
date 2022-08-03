<template>
  <div class="widget-config">
    <el-form label-suffix="："
             v-if="this.data && Object.keys(this.data).length > 0"
             labelPosition="left"
             labelWidth="90px"
             size="small">
      <el-collapse v-model="collapse">
        <el-collapse-item name="1"
                          title="基本属性">
          <el-form-item label="控件ID">
            {{ data.prop }}
          </el-form-item>
          <!-- <el-form-item label="类型" v-if="data.type && !data.component">
            <el-select
              v-model="data.type"
              style="width: 100%"
              placeholder="请选择类型"
              @change="handleChangeType"
            >
              <el-option-group
                v-for="group in fields"
                :key="group.title"
                :label="group.title"
              >
                <el-option
                  v-for="item in group.list"
                  :key="item.type"
                  :label="item.label"
                  :value="item.type"
                >
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="属性值">
            <el-input
              v-model="data.prop"
              clearable
              placeholder="属性值"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="标题"
                        :required="true">
            <el-row>
              <el-col :span="6">
                <el-select v-model="labelLanguageValue"
                           placeholder="请选择">
                  <el-option v-for="item in languageOption"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="18"
                      style="padding-left: 10px;">
                <el-input v-if="labelLanguageValue == 0"
                          v-model="data.label"
                          clearable
                          placeholder="标题"></el-input>
                <el-input v-if="labelLanguageValue == 1"
                          v-model="data.enLabel"
                          clearable
                          placeholder="English Label"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- <el-form-item
            label="标题宽度"
            v-if="
              !['group', 'dynamic', 'title'].includes(data.type) &&
              (!data.hiddenLabel || data.label)
            "
          >
            <el-input-number
              v-model="data.labelWidth"
              :min="0"
              :step="10"
              controls-position="right"
              placeholder="标签宽度"
              style="width: 100%"
            ></el-input-number>
          </el-form-item> -->
          <!-- <el-form-item
            label="标签位置"
            v-if="!data.subfield && (!data.hiddenLabel || data.label)"
          >
            <el-select
              v-model="data.labelPosition"
              placeholder="标签位置"
              clearable
            >
              <el-option label="上" value="top"></el-option>
              <el-option label="左" value="left"></el-option>
              <el-option label="右" value="right"></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="宽度"
                        v-if="data.subfield">
            <el-input-number style="width: 100%"
                             v-model="data.width"
                             controls-position="right"
                             placeholder="宽度"
                             :min="100"></el-input-number>
          </el-form-item> -->
          <el-form-item label="表单栅格"
                        v-if="!data.subfield && !['group'].includes(data.type)">
            <!-- <el-input-number
              style="width: 100%"
              v-model="data.span"
              controls-position="right"
              placeholder="表单栅格"
              :min="2"
              :max="24"
            ></el-input-number> -->
            <el-radio-group v-model="data.span">
              <el-radio-button :label="24">整行</el-radio-button>
              <el-radio-button :label="12">1/2行</el-radio-button>
              <el-radio-button :label="8">1/3行</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item
            label="数据类型"
            v-if="
              [
                'cascader',
                'checkbox',
                'radio',
                'select',
                'tree',
                'upload',
                'img',
                'array',
                'slider',
                'timerange',
                'daterange',
                'datetimerange',
              ].includes(data.type)
            "
          >
            <template slot="label">
              <el-link
                :underline="false"
                href="https://avuejs.com/docs/datatype.html"
                target="_blank"
                >数据类型 <i class="el-icon-question"></i
              ></el-link>
            </template>
            <el-select v-model="data.dataType" placeholder="数据类型" clearable>
              <el-option label="String" value="string"></el-option>
              <el-option label="Number" value="number"></el-option>
              <el-option label="Array" value="array"></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="深结构"
                        v-if="data.type && !data.component">
            <template slot="label">
              <el-link :underline="false"
                       href="https://avuejs.com/form/form-bind.html"
                       target="_blank">深结构 <i class="el-icon-question"></i></el-link>
            </template>
            <el-input v-model="data.bind"
                      clearable
                      placeholder="深结构"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="字段提示">
            <template slot="label">
              <el-link
                :underline="false"
                href="https://avuejs.com/form/form-tip.html"
                target="_blank"
                >字段提示 <i class="el-icon-question"></i
              ></el-link>
            </template>
            <el-input
              v-model="data.tip"
              clearable
              placeholder="字段提示"
            ></el-input>
          </el-form-item> -->
          <!-- <el-form-item
            v-if="data.tip && !['upload'].includes(data.type)"
            label="字段提示位置"
            label-width="110px"
          >
            <el-select
              v-model="data.tipPlacement"
              placeholder="字段提示位置"
              clearable
            >
              <el-option label="上" value="top"></el-option>
              <el-option label="下" value="bottom"></el-option>
              <el-option label="左" value="left"></el-option>
              <el-option label="右" value="right"></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="标题提示">
            <template slot="label">
              <el-link
                :underline="false"
                href="https://avuejs.com/form/form-tip.html"
                target="_blank"
                >标题提示 <i class="el-icon-question"></i
              ></el-link>
            </template>
            <el-input
              v-model="data.labelTip"
              clearable
              placeholder="标题提示"
            ></el-input>
          </el-form-item> -->
          <!-- <el-form-item
            v-if="data.labelTip && !['upload'].includes(data.type)"
            label="标题提示位置"
            label-width="110px"
          >
            <el-select
              v-model="data.labelTipPlacement"
              placeholder="标题提示位置"
              clearable
            >
              <el-option label="上" value="top"></el-option>
              <el-option label="下" value="bottom"></el-option>
              <el-option label="左" value="left"></el-option>
              <el-option label="右" value="right"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item v-if="
              ![
                'color',
                'dynamic',
                'group',
                'ueditor',
                'upload',
                'map'
              ].includes(data.type) && !data.customDefaultValues
            "
                        label="默认值">
            <template v-if="defaultValues && defaultValues[data.type]">
              <el-select v-model="data.value"
                         allow-create
                         clearable
                         filterable
                         placeholder="默认值">
                <el-option v-for="item in defaultValues[data.type]"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </template>

            <!-- <template v-else-if="data.config && data.config == 'unit'">
              <el-row>
                <el-col :span="13">
                  <el-input-number style="width: 100%"
                                   v-model="data.value.value1"
                                   controls-position="right"
                                   size="small"></el-input-number>
                </el-col>
                <el-col :span="11">
                  <el-select v-model="data.value.value2"
                             placeholder="请选择"
                             size="small">
                    <el-option v-for="item in options"
                               :key="item.label"
                               :label="item.label"
                               :value="item.label">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
               <el-select
                v-model="data.value"
                allow-create
                clearable
                filterable
                placeholder="默认值2"
              >
                <el-option
                  v-for="item in defaultValues[data.type]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template> -->
            <template v-else>
              <el-input v-model="data.value"
                        clearable
                        placeholder="默认值"></el-input>
            </template>
          </el-form-item>
          <!-- <el-form-item label="详情模式">
            <el-switch v-model="data.detail"></el-switch>
          </el-form-item> -->
          <el-form-item label="是否只读"
                        v-if="!['group'].includes(data.type)">
            <el-switch v-model="data.readonly"></el-switch>
          </el-form-item>
          <el-form-item label="是否禁用"
                        v-if="!['group'].includes(data.type)">
            <el-switch v-model="data.disabled"></el-switch>
          </el-form-item>
          <el-form-item label="是否可见"
                        v-if="!['group'].includes(data.type)">
            <el-switch v-model="data.display"></el-switch>
          </el-form-item>
          <template v-if="!['group'].includes(data.type)">
            <el-form-item v-if="data.component && data.component.includes('aggregation')"
                          label="是否校验">
              <el-switch v-model="data.validated"></el-switch>
              <el-alert v-if="data.validated"
                        title="请于对应组件内配置校验规则"
                        type="warning"
                        :closable="false"
                        style="margin-top: 8px">
              </el-alert>
            </el-form-item>
            <el-form-item v-else
                          label="是否必填">
              <el-switch v-model="data.required"></el-switch>
              <template v-if="data.required">
                <el-alert v-if="data.component"
                          title="请于对应组件内配置校验规则"
                          type="warning"
                          :closable="false"
                          style="margin-top: 8px">
                </el-alert>
                <el-input v-else
                          v-model.lazy="data.pattern"
                          placeholder="正则表达式"></el-input>
              </template>
            </el-form-item>
          </template>
          <el-form-item v-if="!['group'].includes(data.type)"
                        label="模型字段">
            <config-entity :data="data"
                           :widgetForm="widgetForm"></config-entity>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item name="2"
                          title="组件属性">
          <component :is="getComponent"
                     :data="data"
                     :default-values="defaultValues"></component>
        </el-collapse-item>
        <el-collapse-item name="3"
                          title="事件属性"
                          v-if="!['group'].includes(data.type)">
          <config-event :data="data"></config-event>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <template v-else>
      <avue-empty v-if="avueVersion('2.9.4')"
                  desc="拖拽字段进行配置"
                  style="margin-top: 100%"></avue-empty>
      <el-empty v-else
                description="拖拽字段进行配置"></el-empty>
    </template>
  </div>
</template>

<script>
import fields from "./fieldsConfig.js";

const dateArr = [
  "year",
  "month",
  "week",
  "date",
  "datetime",
  "time",
  "daterange",
  "timerange",
  "datetimerange",
  "dates"
];

export default {
  name: "widget-config",
  props: ["data", "defaultValues", "widgetForm"],
  computed: {
    getComponent () {
      const prefix = "config-";
      const { type, component, config } = this.data;
      // console.log(config)
      if (config) return prefix + config;
      if ((!type || component) && type != "ueditor") return prefix + "custom";
      let result = "input";

      if ([undefined, "input", "password", "url"].includes(type))
        result = "input";
      else if (dateArr.includes(type)) result = "date";
      else if (["array", "img"].includes(type)) result = "array";
      else if (["tree", "cascader"].includes(type)) result = "tree";
      else if (["radio", "checkbox", "select"].includes(type))
        result = "select";
      else result = type;
      console.log("当前组件", prefix + result);
      return prefix + result;
    }
  },
  watch: {
    "data.required" (val) {
      if (val)
        this.validator.required = {
          required: true,
          message: `${this.data.label}必须填写`
        };
      else this.validator.required = null;
      this.generateRule();
    },
    "data.pattern" (val) {
      if (val)
        this.validator.pattern = {
          pattern: new RegExp(val),
          message: `${this.data.label}格式不匹配`
        };
      else this.validator.pattern = null;
      this.generateRule();
    }
  },
  data () {
    return {
      fields,
      collapse: ["1", "2", "3"],
      validator: {
        type: null,
        required: null,
        pattern: null,
        length: null
      },
      options: [
        {
          label: "年"
        },
        {
          label: "月"
        },
        {
          label: "日"
        }
      ],
      languageOption: [
        {
          label: "中",
          value: 0
        },
        {
          label: "英",
          value: 1
        }
      ],
      labelLanguageValue: 0,
      placeholderLanguageValue: 0
    };
  },
  methods: {
    handleChangeType (type) {
      if (!type) return;
      const config = this.fields.find(f => f.list.find(l => l.type == type));
      if (!config) return;
      for (let key in config) {
        if (
          config &&
          Object.prototype.hasOwnProperty.call(config, key) &&
          !["icon", "label", "span"].includes(key)
        )
          this.data[key] = config[key];
      }
    },
    generateRule () {
      const rules = [];
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) rules.push(this.validator[key]);
      });
      if (rules.length == 0) delete this.data.rules;
      else this.data.rules = rules;
    }
  }
};
</script>
