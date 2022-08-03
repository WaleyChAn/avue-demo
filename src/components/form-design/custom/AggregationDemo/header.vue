<template>
  <div class="of-form-group-header">
    <div class="group-container clearfix">
      <div class="group-icon">
        <i :class="data.icon || 'el-icon-menu'"></i>
      </div>

      <div class="group-title">{{ data.label }}</div>
      <div class="group-btn left primary"
           @click.stop="headerEvent1">蓝色按钮</div>
      <div class="group-btn left danger"
           @click.stop="headerEvent2">红色按钮</div>
      <div class="group-btn right info"
           @click.stop="headerEvent3">
        <i class="el-icon-warning-outline"></i>
        <span>带图标按钮</span>
      </div>
    </div>
    <!-- <div class="group-more">收起</div> -->
  </div>
</template>

<script>
export default {
  name: "AggregationDemoHeader",
  components: {},
  filters: {},
  props: ["data"],
  created () { },
  mounted () {
    console.log(this.data);
  },
  methods: {
    headerEvent1 () {
      this.$alert('蓝色按钮被点击了', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          console.log(action)
        }
      })
    },
    headerEvent2 () {
      // 自定义事件中查找form-design主体也可以这么些，将this改成_this即可
      const _avue = this.$findComponentsUpward(this, 'FormDesign')[0]
      console.log(_avue)
      this.$alert('红色按钮被点击了，并且打印了form-design的主体vue，请打开控制台查看', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          console.log(action)
        }
      })
    },
    headerEvent3 () {
      this.$alert('灰色按钮被点击了', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          console.log(action)
        }
      })
    }
  },
};
</script>
<style lang="scss" scoped></style>