export default [{
  title: '套件',
  list: [{
    type: 'group',
    typeName: "分组",
    label: '分组',
    icon: 'iconfont icon-group',
    display: true,
    arrow: true,
    collapse: true,
    children: {
      column: []
    }
  }]
},
{
  title: '基本控件',
  list: [{
    type: 'input',
    typeName: "单行文本",
    label: '单行文本',
    icon: 'iconfont icon-input',
    span: 12,
    display: true,
    entity: ""
  },
  {
    type: 'textarea',
    typeName: "多行文本",
    label: '多行文本',
    icon: 'iconfont icon-textarea',
    span: 12,
    display: true
  },
  {
    type: 'linkage',
    typeName: "联动组件",
    label: '联动组件',
    icon: 'iconfont icon-textarea',
    component: 'linkage',
    config: 'linkage',
    span: 12,
    display: true,
    dicData: [{
      label: '选项一',
      value: '0'
    },
    {
      label: '选项二',
      value: '1'
    },
    {
      label: '选项三',
      value: '2'
    },
    ],
  },
  {
    type: 'radio',
    typeName: "单选框组",
    label: '单选框组',
    icon: 'iconfont icon-radio',
    dicData: [{
      label: '选项一',
      value: '0'
    },
    {
      label: '选项二',
      value: '1'
    },
    {
      label: '选项三',
      value: '2'
    },
    ],
    span: 12,
    display: true,
    dicOption: 'static',
    props: {
      label: 'label',
      value: 'value'
    }
  },
  {
    type: 'checkbox',
    typeName: "多选框组",
    label: '多选框组',
    icon: 'iconfont icon-checkbox',
    dicData: [{
      label: '选项一',
      value: '0'
    },
    {
      label: '选项二',
      value: '1'
    },
    {
      label: '选项三',
      value: '2'
    },
    ],
    span: 12,
    display: true,
    dicOption: 'static',
    props: {
      label: 'label',
      value: 'value'
    }
  },
  {
    type: 'select',
    typeName: "下拉选择器",
    label: '下拉选择器',
    icon: 'iconfont icon-select',
    dicData: [{
      label: '选项一',
      value: '0'
    },
    {
      label: '选项二',
      value: '1'
    },
    {
      label: '选项三',
      value: '2'
    },
    ],
    // 用于做级联配置
    cascaderItem: [],
    span: 12,
    display: true,
    dicOption: 'static',
    props: {
      label: 'label',
      value: 'value',
      desc: 'desc'
    }
  },
  {
    type: 'number',
    typeName: "数字框",
    label: '数字',
    icon: 'iconfont icon-number',
    controls: true,
    span: 12,
    display: true,
  },
  {
    type: 'date',
    typeName: "日期选择器",
    label: '日期',
    icon: 'iconfont icon-date',
    span: 12,
    display: true,
    format: 'yyyy-MM-dd',
    valueFormat: 'yyyy-MM-dd'
  },
  {
    type: 'daterange',
    typeName: "日期范围选择器",
    label: '日期范围',
    icon: 'iconfont icon-date-range',
    span: 12,
    display: true,
    format: 'yyyy-MM-dd',
    valueFormat: 'yyyy-MM-dd'
  },
  {
    type: 'user',
    typeName: "人员组件",
    label: '人员',
    icon: 'icon-user',
    component: 'user',
    config: 'user',
    span: 12,
    display: true,
  },
  {
    type: 'company',
    typeName: "公司选择器",
    label: '公司',
    icon: 'icon-company',
    component: 'company',
    config: 'company',
    span: 12,
    display: true,
  },

  {
    type: 'group',
    typeName: "分组",
    label: '意见',
    icon: 'fa fa-commenting-o',
    display: true,
    arrow: true,
    collapse: true,
    children: {
      column: [{
        hiddenLabel: true,
        labelWidth: 0,
        type: 'suggestion',
        label: '意见',
        typeName: "意见组件",
        component: 'suggestion',
        config: 'suggestion',
        span: 24,
        display: true,
        params: {
          suggestion: {
            allowRead: true,
            allowAdd: true
          }
        }
      },]
    }
  },

  {
    type: 'department',
    typeName: "部门组件",
    label: '部门',
    icon: 'icon-department',
    component: 'department',
    config: 'department',
    span: 12,
    display: true,
  },
  {
    type: 'officialDocument',
    typeName: "公文编码组件",
    label: '公文编码',
    icon: 'icon-officialDocument',
    component: 'officialDocument',
    config: 'officialDocument',
    span: 12,
    display: true,
  },
  {
    icon: 'fa fa-bookmark-o icon',
    hiddenLabel: true,
    labelWidth: 0,
    type: 'explain',
    typeName: "说明组件",
    label: '说明',
    // standbyLabel: "说明",
    component: 'explain',
    config: 'explain',
    span: 12,
    display: true,
    params: {
      explain: {
        title: "标题",
        description: "提示文字",
        color: "red",
        bold: false,
        close: true,
        isUrl: false,
        url: "",
        urlName: "",
        urlColor: ""
      }

    }
  },
  {
    type: 'unit',
    typeName: "期限组件",
    label: '期限',
    icon: 'fa fa-calendar-o ',
    component: 'unit',
    config: 'unit',
    span: 12,
    display: true,
    customDefaultValues: true,
    // dicData: [
    //   { label: '年', value: '年' },
    //   { label: '月', value: '月' },
    //   { label: '日', value: '日' },
    // ],
    params: {
      unit: [{
        label: '年'
      }, {
        label: '月'
      },
      {
        label: '日'
      },
      ]

    }
  },
  {
    type: 'cascader',
    typeName: "级联选择器",
    label: '级联选择器',
    icon: 'iconfont icon-link',
    span: 12,
    display: true,
    dicData: [{
      label: '选项一',
      value: 0,
      children: [{
        label: '选项1-1',
        value: 11,
      }, {
        label: '选项1-2',
        value: 12,
      }]
    },
    {
      label: '选项二',
      value: '1'
    },
    {
      label: '选项三',
      value: '2'
    },
    ],
    cascaderIndex: 0,
    // 用于做级联配置
    cascaderItem: [],
    showAllLevels: true,
    dicOption: 'static',
    separator: "/",
    props: {
      label: 'label',
      value: 'value',
      desc: 'desc'
    }
  },
  {
    type: 'test',
    typeName: "自定义组件模板",
    label: '自定义模板',
    icon: 'icon-test',
    component: 'test',
    config: 'test',
    span: 24,
    display: true,
  }
  ]
},
{
  title: '聚合控件',
  list: [{
    type: 'group',
    typeName: "分组",
    label: '聚合模板',
    icon: 'fa fa-th',
    aggregation: true, // 开启自定义聚合模板
    aggregationHeader: 'aggregationDemoHeader', // 自定义聚合模板头部组件
    display: true,
    arrow: true,
    collapse: true,
    children: {
      column: [{
        hiddenLabel: true,
        type: 'aggregationDemo', // 聚合模板类型
        typeName: "聚合模板",
        component: 'aggregationDemo', // 聚合模板组件
        config: 'aggregationDemo', // 聚合模板配置组件
        className: 'of-form-design-aggregation',
        content: [ // 聚合模板内表单属性
          {
            prop: 'value1',
            label: '测试1',
            default: 'test'
          },
          {
            prop: 'value2',
            label: '测试2',
            default: ''
          },
          {
            prop: 'value3',
            label: '测试3',
            default: ''
          },
          {
            prop: 'value4',
            label: '测试4',
            default: ''
          }
        ],
        span: 24,
        display: true
      }]
    }
  }]
},
]
