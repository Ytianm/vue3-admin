import http from '../utils/http'

// 列表
export const usersPageList = data => {
    return http.post('/users/pageList', data)
}

// 列表-编辑
export const updateSelectiveList = data => {
  return http.post('/users/updateSelective', data)
}

// 列表-新增
export const insertSelectiveList = data => {
  return http.post('/users/insertSelective', data)
}

// 工时
export const usersPageListHours = data => {
  return http.post('/users/workHours/pageList', data)
}

// 工时-编辑
export const updateSelectiveHours = data => {
  return http.post('/users/workHours/updateSelective', data)
}

// 工时-新增
export const insertSelectiveHours = data => {
  return http.post('/users/workHours/insertSelective', data)
}

// 用户下拉列表
export const getUserList = data => {
  return http.post('/users/getUserList', data)
}