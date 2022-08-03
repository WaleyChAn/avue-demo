import {
  findComponentUpward,
  findComponentsCustom
} from '../mixins/findComponents'

import store from '@/store'

export function getAsVal (obj, bind = '') {
  let result = deepClone(obj)
  if (validatenull(bind)) return result
  bind.split('.').forEach(ele => {
    if (!validatenull(result[ele])) {
      result = result[ele]
    } else {
      result = ''
    }
  });
  return result
}

export function validatenull (val) {
  if (val instanceof Date || typeof val === 'boolean' || typeof val === 'number' || val instanceof Array) return false;
  else if (val instanceof Function) {
    const fun = val.toString().replace(/\s+/g, '')
    const arr = ['({value})=>{}', '(res,cb)=>{}', '(res)=>{}', '()=>{}']
    if (arr.includes(fun)) return true
    else return false
  } else if (val instanceof Object) {
    for (var o in val) {
      return false;
    }
    return true;
  } else {
    if (
      val === 'null' ||
      val == null ||
      val === 'undefined' ||
      val === undefined ||
      val === ''
    ) {
      return true;
    }
    return false;
  }
}

export const deepClone = data => {
  var type = getObjType(data);
  var obj;
  if (type === 'array') obj = [];
  else if (type === 'object') obj = {};
  else return data;
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      data[i] = (() => {
        if (data[i] === 0) {
          return data[i];
        }
        return data[i];
      })();
      if (data[i]) {
        delete data[i].$parent;
      }
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      if (data) {
        delete data.$parent;
      }
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

export const getObjType = obj => {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};

/**
 * 是否小于等于某个Avue版本
 * Avue:2.8.27 v2:2.8.27 -> true
 * Avue:2.9.1 v2:2.9.0 -> false
 */
export const avueVersion = (v2) => {
  if (!window.AVUE) return
  let v1 = window.AVUE.version.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  // 调整两个版本号位数相同
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  // 循环判断每位数的大小
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return false
    } else if (num1 < num2) {
      return true
    }
  }

  return true
}

export const removeDisabled = (ref) => {
  const _obj = ref.$el
  const _disabled = _obj.querySelectorAll('div[disabled="disabled"]')
  for (let i = 0; i < _disabled.length; i++) {
    _disabled[i].removeAttribute('disabled')
  }
}

// 自定义校验报错
export const customValidateError = (ref, error) => {
  const _formItem = findComponentUpward(ref, 'ElFormItem')
  _formItem.validateState = 'error'
  _formItem.validateMessage = error
}

// 自定义校验非空 | 无自定义规则的情况下
export const customValidateField = (ref) => {
  return new Promise((resolve, reject) => {
    const {
      column = {}
    } = ref
    let isValidatedField = true
    if (typeof ref.value === 'object') {
      for (let key in ref.value) {
        if (ref.value[key] !== 0 && !ref.value[key]) {
          isValidatedField = false
        }
      }
    } else {
      isValidatedField = true
    }
    const res = {
      isValidatedField,
      massage: `${column.label}不能为空`
    }
    resolve(res)
  })
}

// 自定义校验
export const customValidate = (ref) => {
  const _ref = ref
  const custom = findComponentsCustom(_ref)
  console.log("获取到的自定义组件", custom)
  return new Promise(async (resolve, reject) => {
    let isValidated = true
    await custom.forEach(async item => {
      const {
        column = {}
      } = item
      let res = {}
      if ((column.required || column.validated) && item.validateField) {
        res = await item.validateField()
      } else if (column.required && !item.validateField) {
        res = await customValidateField(item)
      } else if (column.validated && !item.validateField) {
        res = {
          isValidatedField: false,
          massage: `${column.label}不能为空`
        }
      }
      const {
        isValidatedField = true, massage = ''
      } = res
      isValidated = isValidatedField && isValidated
      if (!isValidated && column.required) {
        customValidateError(item, massage)
      }
    })
    resolve(isValidated)
  })
}

/**
 * 过滤单个实体字段
 * @param list 实体列表
 * @param form 表单属性
 * */
export const filterEntityField = (list, column, path = '') => {
  column.map(item => {
    const { prop, type = '', children = {}, entityColumnCode = '', content = [] } = item
    const { column: childColumn = [] } = children
    if (type === 'group') {
      filterEntityField(list, childColumn)
    } else if (type.includes('aggregation')) {
      filterEntityField(list, content, prop)
    }
    list.map(entity => {
      if (entityColumnCode === entity.entityColumnCode) {
        const columnPath = path.length > 0 ? `${path}/${prop}` : prop
        entity.entityColumnPath = columnPath
      }
      return entity
    })
  })
  return list
}

/**
 * 过滤实体字段
 * @param list 实体列表
 * @param form 表单属性
 * */
export const filterEntityFilels = (list, form) => {
  const { column = [] } = form
  const newList = JSON.parse(JSON.stringify(list))
  return filterEntityField(newList, column)
}

/**
 * 实体字段值
 * @param form avue 表单属性
 * @param formVal avue 值
 * */
export const getEntityFilelsVal = async (form, formVal) => {
  let entityFields = store.getters.entityFields
  if (entityFields && entityFields.length === 0) {
    entityFields = await store.dispatch('fetchEntityFields')
  }
  const filterd = filterEntityFilels(entityFields, form)
  let newVal = {}
  filterd.map(item => {
    let formItem = formVal[item.entityColumnPath]
    // 获取聚合组件内表单实体
    if (item.entityColumnPath.includes('aggregation')) {
      const aggPath = item.entityColumnPath.split('/')
      const aggName = aggPath[0] || ''
      const aggProp = aggPath[1] || ''
      const aggGroup = formVal[aggName] || {}
      formItem = aggGroup[aggProp]
    }
    if (typeof formItem === 'undefined') {
      // 实体尚未设置
      formItem = 'Entity has not been set!'
    }
    newVal[item.entityColumnCode] = formItem
  })
  return newVal
}
