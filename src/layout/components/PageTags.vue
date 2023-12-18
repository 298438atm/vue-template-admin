<template>
  <div class="pageTags">
    <el-scrollbar>
      <div class="tags_box" ref="tagsBox">
        <el-tag
          v-for="item in tags"
          :key="item.path"
          class="tag_item"
          disable-transitions
          :type="item.path === $route.path ? '' : 'info'"
          :closable="tags.length > 1"
          @click="$router.push(item.path)"
          @close="delTag(item)"
        >
          <span>{{ item.meta.name }}</span>
        </el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import Pagetag from './pageTags.js'
export default {
  name: 'PageTags',
  data() {
    return {
      isShowMove: false,
      canMoveWidth: 0, //可移动距离
      moveWidth: 80, //每次移动的距离
      showClosePath: undefined,
      tag: null
    }
  },
  computed: {
    tags() {
      return this.tag?.tags || []
    },
    themeColor() {
      return this.$store.state.theme.themeColor
    },
    activeStyle() {
      return {
        color: this.themeColor,
      }
    },
  },
  created() {
    this.tag = new Pagetag()
  },
  methods: {
    // 删除tag
    delTag(tag) {
      this.tag.delTag(tag)
      if (tag.path === this.$route.path) {
        this.$router.push(this.tags[this.tags.length - 1]['path'])
      }
    },
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(newV) {
        if (!this.tags.map((item) => item.path).includes(newV.path)) {
          // 排除matched属性
          const { matched, ...tagData } = newV
          this.$nextTick(() => {
            this.tag.addTag(tagData)
          })
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.pageTags {
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid rgb(220, 220, 220);
  .tags_box {
    display: flex;
    align-items: center;
    height: 40px;
    .tag_item {
      padding: 0 20px;
      margin-right: 10px;
      font-size: 12px;
      cursor: pointer;
    }
    .tag_item:hover {
      color: var(--themeColor);
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
