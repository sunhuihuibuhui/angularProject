import request from '@/utils/request'

// 获取空间权限模板
export function getList() {
  return request({
    url: '/dataset/teamRoleQxModel/getTeamRoleQxModelList',
    method: 'get'
  })
}

// 修改用户空间权限
export function editSpacePerm(data) {
  return request({
    url: '/dataset/teamRoleQxModel/editTeamRoleQxModel',
    method: 'post',
    data:data
  })
}

// 获取用户团队权限
export function getSpacePerm(teamId) {
  return request({
    url: `/dataset/teamRoleUser/openApi/getUserTeamQx?teamId=${teamId}`,
    method: 'get',
  })
}

// 获取团队角色权限信息
export function getRoleQxInfo(roleId) {
  return request({
    url: `/dataset/teamRoleQx/getRoleQxInfo?roleId=${roleId}`,
    method: 'get',
  })
}

// 新增团队角色
export function addTeamRole(data) {
  return request({
    url: `/dataset/teamRole/add`,
    method: 'post',
    data: data
  })
}
/**
 * /dev-api/dataset/team/getTeamInfo  teamId获取团队信息,teamId不填则为查询编辑中团队信息
 */
