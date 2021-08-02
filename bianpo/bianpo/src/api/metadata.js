import request from '@/utils/request'
// 获取元数据模板list
export function getList(query) {
  return request({
    url: '/dataSet/datasetModel/list',
    method: 'get',
    params: query
  })
}

// 启用/停用数据集模板
export function toggleStatus(data) {
  return request({
    url: '/dataSet/datasetModel/status',
    method: 'post',
    data: data
  })
}

// 数据集模板删除
export function del(ids) {
    return request({
      url: `/dataSet/datasetModel/remove/${ids}`,
      method: 'get',
    })
}

// 添加
export function add(data) {
  return request({
    url: '/dataSet/datasetModel/add',
    method: 'post',
    data: data
  })
}

// 上传excel
export function uploadExcel(data) {
  return request({
    url: '/dataSet/datasetModel/edit',
    method: 'post',
    data: data
  })
}

// 下载excel
export function downloadExcel(query) {
  return request({
    url: `/dataSet/datasetModel/download`,
    method: 'get',
    params: query,
    responseType:'blob'
  })
}
