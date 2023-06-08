<template>
  <div class="pageTags" ref="pageTags">
    <div class="left" v-if="isShowMove">
      <i class="el-icon-arrow-left" @click="tagsBoxMove('left')"></i>
    </div>
    <div class="tags_box" ref="tagsBox">
      <div
        v-for="item in tags"
        class="tag_item"
        :class="{ active: item.path === activeTags }"
        @click="tagsChange(item)"
      >
        <span>{{ item.name }}</span>
        <!-- <i class="el-icon-circle-close close"></i> -->
        <i class="el-icon-error close"></i>
      </div>
    </div>
    <div class="right" v-if="isShowMove">
      <i class="el-icon-arrow-right" @click="tagsBoxMove('right')"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTags',
  data() {
    return {
      activeTags: '1',
      isShowMove: false,
      moveWidth: 0,
      tags: [
        {
          name: '首页1',
          path: '1',
        },
        {
          name: '首页2',
          path: '2',
        },
        {
          name: '首页3',
          path: '3',
        },
        {
          name: '首页4',
          path: '4',
        },
        {
          name: '首页5',
          path: '1',
        },
        {
          name: '首页6',
          path: '2',
        },
        {
          name: '首页7',
          path: '3',
        },
        {
          name: '首页8',
          path: '4',
        },
        {
          name: '首页9',
          path: '1',
        },
        {
          name: '首页10',
          path: '2',
        },
        {
          name: '首页11',
          path: '3',
        },
        {
          name: '首页12',
          path: '4',
        },
        {
          name: '首页13',
          path: '1',
        },
        {
          name: '首页14',
          path: '2',
        },
        {
          name: '首页15',
          path: '3',
        },
        {
          name: '首页16',
          path: '4',
        },
        {
          name: '首页17',
          path: '1',
        },
        {
          name: '首页18',
          path: '2',
        },
      ],
    }
  },
  methods: {
    tagsChange(tag) {
      this.activeTags = tag.path
    },
    tagsBoxMove(type) {
      const leftValue = Math.abs(
        Number.parseFloat(this.$refs.tagsBox.style.left || 0)
      )
      if (type === 'left') {
        // 如果不存在则表示没有点击过
        if (leftValue === 0) {
          this.$refs.tagsBox.style.left = '0px'
        } else {
          if (leftValue - 80 <= 0) {
            this.$refs.tagsBox.style.left = '0px'
          } else {
            this.$refs.tagsBox.style.left = -(leftValue - 80) + 'px'
          }
        }
      } else {
        if (leftValue + 80 >= this.moveWidth) {
          this.$refs.tagsBox.style.left = -this.moveWidth + 'px'
        } else {
          this.$refs.tagsBox.style.left = -(leftValue + 80) + 'px'
        }
      }
    },
  },
  watch: {
    tags: {
      immediate: true,
      deep: true,
      handler() {
        this.$nextTick(() => {
          console.log(Array.from(this.$refs.tagsBox.children))
          const tagsBoxWidth = Array.from(this.$refs.tagsBox.children).reduce(
            (pre, next) => pre + next.offsetWidth,
            0
          )
          const pageTagsWidth = this.$refs.pageTags.offsetWidth - 60
          if (tagsBoxWidth > pageTagsWidth) {
            this.moveWidth = tagsBoxWidth - pageTagsWidth
            this.isShowMove = true
          } else {
            this.isShowMove = false
          }
        })
      },
    },
  },
}
</script>

<style lang="less" scoped>
.pageTags {
  position: relative;
  overflow: hidden;
  height: 50px;
  .tags_box {
    display: flex;
    padding: 0 30px;
    position: absolute;
    top: 0;
    left: 0;
    transition: all .5s ease;
    .tag_item {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      color: gainsboro;
      padding: 10px 20px;
      font-size: 14px;
      cursor: pointer;
      
      .close {
        display: none;
        padding-left: 5px;
        font-size: 16px;
      }
    }
    .tag_item:hover .close {
      display: inline-block;
    }
  }

  .active {
    color: #64beff !important;
    border-bottom: 2px solid #64beff;
  }
  .left {
    position: absolute;
    left: 0;
    top: 10px;
    width: 30px;
    text-align: center;
    color: gray;
    font-size: 16px;
    cursor: pointer;
    background-color: rgb(252, 252, 252);
    z-index: 9;
  }
  .right {
    position: absolute;
    top: 10px;
    right: 0;
    width: 30px;
    text-align: center;
    color: gray;
    font-size: 16px;
    cursor: pointer;
    background-color: rgb(252, 252, 252);
    z-index: 9;
  }
}
</style>
