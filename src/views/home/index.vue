<template>
<div class="home">
  <van-nav-bar title="黑马头条" style="position:fixed;width:100%;  z-index: 1000;">

    </van-nav-bar>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <p>刷新次数: {{ count }}</p>

 <van-tabs v-model="activeTab" style="margin-bottom:50px;margin-top:50px">
  <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
     <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
  <van-cell
            v-for="item in list"
            :key="item"
            :title="item"
            />
</van-list>
  </van-tab>
</van-tabs>
</van-pull-refresh>
</div>
</template>

<script>
import { getChannels } from '@/api/channel'
import { getArticle } from '@/api/article'
export default {

  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      activeTab: 0,
      count: 0,
      isLoading: false,
      channels: []

    }
  },
  created () {
    // 定义频道列表在methods里 调用 this.loadChannels
    this.loadChannels()
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },

  methods: {
    async loadChannels () {
      // 判断用户是否登录
      if (this.user) {
        const data = await getChannels()
        this.channels = data.channels
      } else {
      //  用户没有登录,从本地缓存中获取数据
        this.channels = JSON.parse(window.localStorage.getItem('channels')) || []
        // 如果本地缓存中没有数据
        if (this.channels.length === 0) {
          // 继续获取数据
          const data = await getChannels()
          this.channels = data.channels
          // 保存到本地仓库
          window.localStorage.setItem('channels', JSON.stringify(this.channels))
        }
      }
      // this.channels.map((item) => {
      //   this.$set(item, 'articles', [])
      // })
    },
    async onLoad () {
      const currentChannel = this.channels[this.activeTab]
      const id = currentChannel.id

      const data = await getArticle({

        channelId: id,
        timestamp: this.timestamp
      })
      console.log(data)
      currentChannel.articles.push(...data.results)

      // 记录时间戳
      this.timestamp = data.pre_timestamp
      // 本次数据加载完毕
      this.loading = false
      // 判断数据是否加载完毕
      if (data.results.length === 0) {
        this.finished = true
      }
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    }

  }
}
</script>

<style>

</style>
