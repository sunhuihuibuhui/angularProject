<<<<<<< HEAD
import request from '@/utils/request'


// 查询审核通知列表  后台（分页）
export function noticeList(query) {
    return request({
      url: '/dataSet/notice/list',
      method: 'get',
      params: query
    })
  }


  // 审核待办（允许、删除）
export function noticeEdit(data) {
    return request({
      url: '/dataSet/notice/edit',
      method: 'post',
      data:data
    })
  }
=======
import request from '@/utils/request'


// 查询审核通知列表  后台（分页）
export function noticeList(query) {
    return request({
      url: '/dataSet/notice/list',
      method: 'get',
      params: query
    })
  }


  // 审核待办（允许、删除）
export function noticeEdit(data) {
    return request({
      url: '/dataSet/notice/edit',
      method: 'post',
      data:data
    })
  }
>>>>>>> d68bd52999a1e31b7a655be4532e0c6345f6d2d3
  