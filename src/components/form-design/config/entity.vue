<template>
  <div>
    <template v-if="data.component && data.component.includes('aggregation') && data.content">
      <el-form-item v-for="(formItem, index) in data.content"
                    :key="index"
                    style="margin-bottom: 0;">
        <el-row>
          <el-col :span="11">
            <el-input v-model="formItem.label"
                      size="mini"
                      readonly="" />
          </el-col>
          <el-col :span="2"
                  class="text-center"
                  style="opacity: .4;">
            <i class="fa fa-arrows-h"></i>
          </el-col>
          <el-col :span="11">
            <el-select v-model="formItem.entityColumnCode"
                       placeholder="请选择"
                       size="mini"
                       @change="onAggregationChange(formItem)">
              <el-option v-for="item in entityList"
                         :key="item.entityColumnCode"
                         :label="item.entityColumnName"
                         :value="item.entityColumnCode"
                         :disabled="item.entityColumnPath.length > 0">
                <span style="float: left;">{{ item.entityColumnName }}</span>
                <span v-if="item.entityColumnPath.length > 0"
                      style="float: right; color: #67C23A">
                  <i class="fa fa-check"></i>
                </span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
    </template>
    <template v-else>
      <el-select v-model="data.entityColumnCode"
                 placeholder="请选择"
                 @change="onChange">
        <el-option v-for="item in entityList"
                   :key="item.entityColumnCode"
                   :label="item.entityColumnName"
                   :value="item.entityColumnCode"
                   :disabled="item.entityColumnPath.length > 0">
          <span style="float: left;">{{ item.entityColumnName }}</span>
          <span v-if="item.entityColumnPath.length > 0"
                style="float: right; color: #67C23A">
            <i class="fa fa-check"></i>
          </span>
        </el-option>
      </el-select>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { filterEntityFilels } from '../utils'

export default {
  name: "config-entity",
  props: ["data", "widgetForm"],

  data () {
    return {
      selectedOptions: [],
    };
  },
  computed: {
    ...mapGetters([
      'entityFields'
    ]),
    entityList () {
      return filterEntityFilels(this.entityFields, this.widgetForm)
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    onChange (val) {
      this.entityFields.map(item => {
        if (item.entityColumnCode === val) {
          this.data.entityColumnName = item.entityColumnName
        }
      })
    },
    onAggregationChange (item) {
      this.entityFields.map(entity => {
        if (entity.entityColumnCode === item.entityColumnCode) {
          item.entityColumnName = entity.entityColumnName
        }
      })
    },
    onOptionClick (data, val) {
      console.log(val)
      data.entityColumnName = val
    },
    fetchData () {
      if (this.entityFields.length === 0) {
        this.$store.dispatch('fetchEntityFields', this.widgetForm)
      }
    }
  },
};
</script>