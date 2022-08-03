const entityList = [
  {
    entityColumnCode: '1001',
    entityColumnName: '标题',
    entityColumnPath: ''
  },
  {
    entityColumnCode: '1002',
    entityColumnName: '参与人',
    entityColumnPath: ''
  },
  {
    entityColumnCode: '1003',
    entityColumnName: '发文字号',
    entityColumnPath: ''
  },
  {
    entityColumnCode: '1004',
    entityColumnName: '模拟字段4',
    entityColumnPath: ''
  },
  {
    entityColumnCode: '1005',
    entityColumnName: '模拟字段5',
    entityColumnPath: ''
  },
  {
    entityColumnCode: '1006',
    entityColumnName: '模拟字段6',
    entityColumnPath: ''
  },
  {
    entityColumnCode: '1007',
    entityColumnName: '模拟字段7',
    entityColumnPath: ''
  },
  {
    entityColumnCode: '1008',
    entityColumnName: '模拟字段8',
    entityColumnPath: ''
  },
  {
    entityColumnCode: '1009',
    entityColumnName: '模拟字段9',
    entityColumnPath: ''
  },
  {
    entityColumnCode: '1010',
    entityColumnName: '模拟字段10',
    entityColumnPath: ''
  },
  {
    entityColumnCode: '1011',
    entityColumnName: '模拟字段11',
    entityColumnPath: ''
  }
]

export function getEntityFields (query) {
  // 虚拟异步数据，正常直接返回请求内容即可
  return new Promise((resolve, reject) => {
    resolve(entityList)
  })
  // 正常返回请求内容即可
  // return request({
  //   url: 'rest/modelFields',
  //   method: 'get',
  //   params: query
  // })
}
