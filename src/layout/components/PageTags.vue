<template>
  <div class="pageTags" ref="pageTags">
    <div class="left move_icon" v-if="isShowMove">
      <i class="el-icon-arrow-left" @click="tagsBoxMove('left')"></i>
    </div>
    <div class="tags_box" ref="tagsBox">
      <div
        v-for="item in tags"
        :key="item.path"
        class="tag_item"
        :style="item.path === $route.path ? activeStyle : ''"
        @click="$router.push(item.path)"
        @mouseenter="tagsBoxEnter(item)"
        @mouseleave="showClosePath = undefined"
      >
        <span>{{ item.meta.name }}</span>
        <i
          class="el-icon-error close"
          v-if="showClosePath === item.path"
          @click="delTag(item)"
        ></i>
      </div>
    </div>
    <div class="right move_icon" v-if="isShowMove">
      <i class="el-icon-arrow-right" @click="tagsBoxMove('right')"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTags',
  data() {
    return {
      isShowMove: false,
      canMoveWidth: 0, //可移动距离
      moveWidth: 80, //每次移动的距离
      showClosePath: undefined,
    }
  },
  computed: {
    tags() {
      return this.$store.state.pageTags.tags
    },
    themeColor() {
      return this.$store.state.theme.themeColor
    },
    activeStyle() {
      return {
        color: this.themeColor,
        borderBottom: `2px solid ${this.themeColor}`,
      }
    },
  },
  methods: {
    // 鼠标移入显示删除图标，只剩一个不可删除
    tagsBoxEnter(tag) {
      if (this.tags.length === 1) {
        return
      }
      this.showClosePath = tag.path
    },
    // 删除tag
    delTag(tag) {
      this.$store.commit('pageTags/DEL_TAG', tag)
      if (tag.path === this.$route.path) {
        this.$router.push(this.tags[this.tags.length - 1]['path'])
      }
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
          if (leftValue - this.moveWidth <= 0) {
            this.$refs.tagsBox.style.left = '0px'
          } else {
            this.$refs.tagsBox.style.left = -(leftValue - this.moveWidth) + 'px'
          }
        }
      } else {
        if (leftValue + this.moveWidth >= this.canMoveWidth) {
          this.$refs.tagsBox.style.left = -this.canMoveWidth + 'px'
        } else {
          this.$refs.tagsBox.style.left = -(leftValue + this.moveWidth) + 'px'
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
          const tagsBoxWidth = Array.from(this.$refs.tagsBox.children).reduce(
            (pre, next) => pre + next.offsetWidth,
            0
          )
          const pageTagsWidth = this.$refs.pageTags.offsetWidth - 60
          if (tagsBoxWidth > pageTagsWidth) {
            this.canMoveWidth = tagsBoxWidth - pageTagsWidth
            this.isShowMove = true
          } else {
            this.isShowMove = false
          }
        })
      },
    },
    $route: {
      deep: true,
      immediate: true,
      handler(newV) {
        if (!this.tags.map((item) => item.path).includes(newV.path)) {
          this.$store.commit('pageTags/ADD_TAG', newV)
        }
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
    .tag_item {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      color: gainsboro;
      padding: 10px 20px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      border-bottom: 2px solid transparent;
      .close {
        padding-left: 5px;
        font-size: 16px;
      }
    }
  }

  .move_icon {
    position: absolute;
    top: 10px;
    width: 30px;
    text-align: center;
    color: gray;
    font-size: 16px;
    cursor: pointer;
    background-color: rgb(252, 252, 252);
    z-index: 9;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
}
</style>
