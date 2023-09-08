<template>
  <div class="welcome">
    <div class="container">
      <h1 class="title">{{ title }}</h1>

      <div class="grid-content">
        <div class="item-title">
          <div><i class="iconfont icon-quick-start"></i></div>
          <div>小试牛刀</div>
        </div>

        <div class="item-list">
          <ul>
            <li v-for="item in samples" :key="item"><a @click="send(item)">{{ item }}</a></li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>

import {ref} from "vue";

const title = process.env.VUE_APP_TITLE

const samples = ref([
  "用小学生都能听懂的术语解释什么是量子纠缠",
  "能给一位6岁男孩的生日会提供一些创造性的建议吗？",
  "如何用 Go 语言实现支持代理 Http client 请求?"
])

const emits = defineEmits(['send']);
const send = (text) => {
  emits('send', text)
}
</script>
<style scoped lang="stylus">
.welcome {
  text-align center
  display flex
  justify-content center
  margin-top 8vh

  .container {
    max-width 768px;
    width 100%

    .title {
      font-size: 2.25rem
      line-height: 2.5rem
      font-weight 600
      margin-bottom: 4rem
    }

    .grid-content {
      .item-title {
        div {
          padding 6px 10px;

          .iconfont {
            font-size 24px;
          }
        }
      }

      .item-list {
        ul {
          padding 10px;

          li {
            font-size 14px;
            padding .75rem
            border-radius 5px;
            background-color: rgba(247, 247, 248, 1);

            line-height 1.5
            color #666666

            a {
              cursor pointer
              display block
              width 100%
            }
            margin-top 10px;
          }
        }
      }
    }
  }
}
</style>