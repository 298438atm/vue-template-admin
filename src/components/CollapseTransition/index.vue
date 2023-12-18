<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>
<script>
// element ui  el-collapse-transition 无法捕捉动画结束，这边采取对element collapse-transition代码摘取
import { addClass, removeClass } from 'element-ui/src/utils/dom'
 
export default {
  name: 'CollapseTransition',
  methods: {
    beforeEnter(el) {
      addClass(el, 'collapse-transition')
      if (!el.dataset) el.dataset = {}
 
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
 
      el.style.height = '0'
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },
 
    enter(el) {
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px'
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.height = ''
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }
 
      el.style.overflow = 'hidden'
    },
 
    afterEnter(el) {
      // for safari: remove class then reset height is necessary
      removeClass(el, 'collapse-transition')
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
 
      this.$emit('transition-end')
    },
 
    beforeLeave(el) {
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow
 
      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    },
 
    leave(el) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        addClass(el, 'collapse-transition')
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
    },
 
    afterLeave(el) {
      removeClass(el, 'collapse-transition')
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
 
      this.$emit('transition-end')
    }
  }
}
</script>