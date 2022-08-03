/**
 * 这些方法采用独立组件开发非常实用
 * 查找对应组件
 * */

/**
 * 向上找最近的父组件
 * @param context VueComponent 当前组件的作用域
 * @param componentName String 需要找的组件名称
 * */
export function findComponentUpward (context, componentName) {
  let parent = context.$parent
  let { name } = parent.$options

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent

    if (parent) {
      // eslint-disable-next-line prefer-destructuring
      name = parent.$options.name
    }
  }
  return parent
}

/**
 * 向上找所有的父组件
 * @param context VueComponent 当前组件的作用域
 * @param componentName String 需要找的组件名称
 * */
export function findComponentsUpward (context, componentName) {
  const parents = []
  const parent = context.$parent

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent)

    return parents.concat(findComponentsUpward(parent, componentName))
  }
  return []
}

/**
 * 向下寻找最近对应的子组件
 * @param context VueComponent 当前组件的作用域
 * @param componentName String 需要寻找的组件名称
 * */
export function findComponentDownward (context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    // eslint-disable-next-line no-restricted-syntax
    for (const child of childrens) {
      if (child.$options.name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

/**
 * 向下寻找所有对应的子组件
 * @param context VueComponent 当前组件的作用域
 * @param componentName String 需要找的组件名称
 * */
export function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChild = findComponentsDownward(child, componentName)
    return components.concat(foundChild)
  }, [])
}

/**
 * 获取指定的兄弟组件
 * @param context VueComponent 当前组件的作用域
 * @param componentName String 需要找的组件名称
 * @param exceptMe Boolean 是否本身除外 default = true
 * */
export function findBrothersComponents (context, componentName, exceptMe = true) {
  const res = context.$parent.$children.filter(broth => broth.$options.name === componentName)

  if (exceptMe) {
    // eslint-disable-next-line no-underscore-dangle
    const index = res.findIndex(item => item._uid === context._uid)
    res.splice(index, 1)
  }
  return res
}

/**
 * 获取所有自定义组件
 * @param context VueComponent 当前组件的作用域
 * */
export function findComponentsCustom (context) {
  return context.$children.reduce((components, child) => {
    const { column = {} } = child
    if (column.component && child.$options.name !== 'form-temp') {
      components.push(child)
    }
    const foundChild = findComponentsCustom(child)
    return components.concat(foundChild)
  }, [])
}
