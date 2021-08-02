import request from '@/utils/request'

// 获取用户数据集权限模板
export function getList() {
  return request({
    url: '/dataset/dataRoleQx/dataRoleQxList',
    method: 'get'
  })
}

// 修改用户数据集权限
export function editDataPerm(data) {
  return request({
    url: '/dataset/dataRoleUser/openApi/getUserDataQx',
    method: 'post',
    data: data
  })
}
