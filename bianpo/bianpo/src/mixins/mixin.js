import request from '@/utils/request'
export const Mixin = {
  data() {
    return {
      // 查询接口
      queryApi: '',
      // 查询条件,不支持非字符串
      queryParam: {},
      /* 数据源-数组列表 */
      dataSource: [],
      //分页参数
      pagination: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      /* 筛选参数 */
      filters: {},
      /* table加载状态 */
      loading: false,
      /* 高级查询条件 */
      superQueryParams: '',
      /* 执行自定义回调函数功能 */
      loadCallBack: () => { },
    }
  },
  methods: {
    getList() {
      request({
        url: this.queryApi,
        method: 'get',
        params: this.queryParam
      }).then((res) => {
        console.log(res)
      })
    }
  },
}
