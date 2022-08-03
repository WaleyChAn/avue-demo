<template>
  <div class="drawer-container">
    <div class="drawer-header">
      <h2 class="title">中国广核电力股份有限公司发文（表单标1题）</h2>
    </div>
    <div class="drawer-body">
      {{ form }}
      <avue-form ref="form"
                 v-if="show"
                 class="of-form-design-view"
                 :key="reload"
                 :option="option"
                 v-model="form"
                 @submit="handlePreviewSubmit">
        <template v-for="group in groups"
                  :slot="`${group.prop}Header`">
          <component v-if="group.aggregation"
                     :key="group.prop"
                     :is="group.aggregationHeader"
                     :data="group"></component>
          <group-header v-else
                        :key="group.prop"
                        :data="group"></group-header>
        </template>
      </avue-form>
    </div>
    <div class="drawer-footer clearfix">
      <el-button type="primary"
                 class="right"
                 @click="handlePreviewSubmit">确定</el-button>
      <el-button type="primary"
                 class="right"
                 @click="handlePreviewSubmit('entity')">获取实体值</el-button>
      <el-button class="right"
                 @click="handleBeforeClose">取消</el-button>
    </div>
  </div>
</template>

<script>
import { validatenull, removeDisabled, customValidate, getEntityFilelsVal } from "./utils/index";
import GroupHeader from "./custom/GroupHeader";
export default {
  name: "designPreview",
  components: { GroupHeader },
  props: ["widgetForm"],
  filters: {},
  data () {
    return {
      key: "",
      show: false,
      reload: Math.random(),
      form: {},
      option: {}
    };
  },
  computed: {
    groups () {
      return this.widgetForm.column.filter(item => item.type === "group");
    }
  },
  watch: {
    widgetForm: {
      handler (val) { },
      deep: true
    }
  },

  created () { },
  mounted () { },
  methods: {
    refresh () {
      this.reload = Math.random();
    },

    convertForm () {
      this.transformToAvueOptions(this.widgetForm, true).then(data => {
        console.log("转化前的option", this.widgetForm);
        console.log("浏览转化好的option", data);
        this.option = data;
        this.show = true
        this.$nextTick(() => {
          removeDisabled(this.$refs.form);
          // this.option.filterDic = true;
          // this.refresh();
        });
      });
    },
    // 表单设计器配置项 转化为 Avue配置项
    transformToAvueOptions (widgetForm, isPreview = false) {
      const _this = this;
      return new Promise((resolve, reject) => {
        try {
          const data = _this.deepClone(widgetForm);
          for (let key in data) {
            if (validatenull(data[key])) delete data[key];
          }
          for (let i = 0; i < data.column.length; i++) {
            const col = data.column[i];
            //标题和占位内容中英文转化
            if (this.lanEnvironment == "en_US") {
              if (col.label && col.enLabel) {
                col.label = col.enLabel;
              }
              if (!col.placeholder) {
                col.placeholder = this.getPlaceholder(col);
              }
            }
            //方法转化

            let event = ["change", "blur", "click", "focus"];
            event.forEach(e => {
              if (col[e]) {
                col[e] = eval(col[e]);
              }
            });
            if (col.hiddenLabel) delete col.label;
            if (isPreview) {
              //   // 预览调整事件中的this指向
              //   let event = ["change", "blur", "click", "focus"];
              //   event.forEach((e) => {
              //     console.log("col[e]", col);
              //     if (col[e]) {
              //       console.log(
              //         "zz",
              //         eval((col[e] + "").replace(/this/g, "_this"))
              //       );
              //       col[e] = eval((col[e] + "").replace(/this/g, "_this"));
              //     }
              //   });
              //   if (col.event)
              //     Object.keys(col.event).forEach(
              //       (key) =>
              //       (col.event[key] = eval(
              //         (col.event[key] + "").replace(/this/g, "_this")
              //       ))
              //     );
            }

            if (
              col.type == "dynamic" &&
              col.children &&
              col.children.column &&
              col.children.column.length > 0
            ) {
              const c = col.children.column;
              c.forEach(item => {
                delete item.subfield;
              });
              this.transformToAvueOptions(col.children, isPreview).then(res => {
                col.children = res;
              });
            } else if (col.type == "group") {
              if (!data.group) data.group = [];

              const group = {
                label: col.label,
                icon: col.icon,
                prop: col.prop,
                arrow: col.arrow,
                collapse: col.collapse,
                display: col.display
              };
              this.transformToAvueOptions(col.children, isPreview).then(res => {
                group.column = res.column;
                data.group.push(group);
              });
              data.column.splice(i, 1);
              i--;
            } else if (
              ["checkbox", "radio", "tree", "cascader", "select"].includes(
                col.type
              )
            ) {
              if (col.dicOption == "static") {
                delete col.dicUrl;
                delete col.dicMethod;
                delete col.dicQuery;
                delete col.dicQueryConfig;
                const { label, value, desc } = col.props;
                col.dicData.forEach(d => {
                  if (d.label) {
                    const val = d.label;
                    delete d.label;
                    d[label] = val;
                  }
                  if (d.value) {
                    const val = d.value;
                    delete d.value;
                    d[value] = val;
                  }
                  if (d.desc) {
                    const val = d.desc;
                    delete d.desc;
                    d[desc] = val;
                  }
                });
              } else if (col.dicOption == "remote") {
                delete col.dicData;
                if (col.dicQueryConfig && col.dicQueryConfig.length > 0) {
                  const query = {};
                  col.dicQueryConfig.forEach(q => {
                    if (q.key && q.value) query[q.key] = q.value;
                  });
                  col.dicQuery = query;
                  delete col.dicQueryConfig;
                } else delete col.dicQueryConfig;
              }
              delete col.dicOption;
            } else if (["upload"].includes(col.type)) {
              if (col.headersConfig && col.headersConfig.length > 0) {
                const headers = {};
                col.headersConfig.forEach(h => {
                  if (h.key && h.value) headers[h.key] = h.value;
                });
                col.headers = headers;
              } else delete col.headers;
              delete col.headersConfig;

              if (col.dataConfig && col.dataConfig.length > 0) {
                const data = {};
                col.dataConfig.forEach(h => {
                  if (h.key && h.value) data[h.key] = h.value;
                });
                col.data = data;
              } else delete col.data;
              delete col.dataConfig;
            }
            for (let key in col) {
              if (validatenull(col[key])) delete col[key];
            }
          }
          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    },

    // 预览 - 弹窗 - 确定
    handlePreviewSubmit (type) {
      this.$refs.form.validate(async (valid, done) => {
        const isCustomValidated = await customValidate(this.$refs.form);
        if (valid && isCustomValidated) {
          // 此处提交表单
          // 获取实体值
          const entityFilelsVal = await getEntityFilelsVal(this.widgetForm, this.form)
          const alertVal = type === 'entity' ? entityFilelsVal : this.form
          this.$alert(alertVal)
            .then(() => {
              done();
            })
            .catch(() => {
              done();
            });
        } else {
          // 此处校验失败
          done()
        }
      });
    },
    // 预览 - 弹窗 - 关闭前
    handleBeforeClose () {
      this.$refs.form.resetForm();
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
      this.form = {};
      // this.show = false
      this.$emit("closeDialog");
    }
  }
};
</script>
<style lang="scss" scoped></style>
