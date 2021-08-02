import request from '@/utils/request'

// 获取精选空间列表
export function getList(query) {
  return request({
    url: '/dataSet/choiceTeam/list',
    method: 'get',
    params: query
  })
}

// 修改精选空间排序
export function edit(data) {
  return request({
    url: '/dataset/choiceTeam/edit',
    method: 'post',
    data:data
  })
}

// 移除精选空间
export function remove(id) {
  return request({
    url: `/dataset/choiceTeam/delById?id=${id}`,
    method: 'get'
  })
}
