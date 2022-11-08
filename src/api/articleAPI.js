// 文章接口Api接口，封装在这里
import request from '@/utils/request.js'

// 向外按需导入一个API函数
export const getArticleListAPI = function(_page, _limit) {
  // eslint-disable-next-line no-sequences
  return request.get('/articles', {
    params: {
    // 请求参数
      _page,
      _limit
    }
  })
//   console.log('调用了getArticleListAPI函数')
}
