<!-- eslint-disable no-undef -->
<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <van-nav-bar title="黑马头条" fixed/>

    <!-- 导入，注册，并使用ArticleIofo组件  -->
    <!-- 使用组件时，属性名是小驼峰形式，则绑定属性时改为连字符形式 -->
    <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <ArticleInfo v-for="item in artlist" :key="item.id" :title="item.title" :author="item.aut_name" :cmt-count="item.comm_count" :time="item.pubdate" :cover="item.cover"></ArticleInfo>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>

// 按需导入Api接口
import { getArticleListAPI } from '@/api/articleAPI.js'

// 导入需要的组件
import ArticleInfo from '@/components/Article/Articleinfo.vue'
import _ from 'lodash'
let fn = null

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data() {
    return {
      // 页码值
      page: 1,
      // 每页显示多少条数据
      limit: 10,
      // 文章的数组
      artlist: [],
      // 是否正在加载下一页数据，如果loading为true，则不会反复触发load事件
      // 每当下一页数据请求回来之后，把loading从true改为false
      loading: true,
      // 所有数据是否加载完毕了，如果没有更多数据了，一定要把finished改成true
      finished: false,
      // 是否正在下拉刷新
      isLoading: true
    }
  },
  created() {
    this.initArticleList()
  },
  activated() {
    fn = this.recordTopHander()
    window.addEventListener('scroll', fn)
  },
  deactivated() {
    window.removeEventListener('scroll', fn)
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticleList(isRefresh) {
      // 发起get 请求，获取文章的列表数据
      const { data: res } = await getArticleListAPI(this.page, this.limit)

      if (isRefresh) {
      // 证明是下拉刷新，新数据在前，旧数据在后
        this.artlist = [...res, ...this.artlist]
        this.isLoading = false
      } else {
        // 证明是上拉加载更多，旧数据在前，新数据在后
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }

      // console.log(res)
      // 上拉加载[旧数据在前，新数据在后]

      if (res.length === 0) {
        // 证明没有下一页数据了把finished改为true，表示数据加载完了
        this.finished = true
      }
    },
    // 只要onload被调用，就应该请求下一页数据
    onLoad() {
      console.log('触发了onload事件')
      // 1.让页码值加1
      this.page++
      // 2.重新请求接口获取数据
      this.initArticleList()
    },
    onRefresh() {
      console.log('触发了下拉刷新')
      // 1. 让页码值 加1
      this.page++
      // 2. 重新请求接口获取数据
      this.initArticleList(true)
    },
    recordTopHander() {
      // eslint-disable-next-line no-undef
      return _.debounce(
        () => {
          this.$route.meta.top = window.scrollY
        },
        50,
        { trailing: true }
      )
    }
  },
  // 注册组件
  components: {
    ArticleInfo
  }
}

</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;

}
</style>
