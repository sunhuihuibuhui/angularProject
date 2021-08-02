import request from '@/utils/request'

// 查询首页配置信息
export function getInfo() {
  return request({
    url: '/dataset/homePage/info',
    method: 'get'
  })
}

// 修改首页配置信息
export function editInfo(data) {
  return request({
    url: '/dataset/homePage',
    method: 'put',
    data:data
  })
}

// 查询首页文件信息
export function getFileInfo() {
  return request({
    url: '/dataset/file/list',
    method: 'get'
  })
}

// 上传文件
export function uploadFile() {
  return request({
    url: '/dataset/file/addFile',
    method: 'post'
  })
}

// 上传文件
export function delFile(id) {
  return request({
    url: `/dataset/file/`+id,
    method: 'delete'
  })
}
// 