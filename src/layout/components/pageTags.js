import { setSessionByKey, getSessionByKey } from '@/utils/sessionCRUD'
class Pagetag {
  constructor() {
    const pageTags = getSessionByKey('pageTags')
    if (Array.isArray(pageTags) && pageTags.length > 0) {
      this.tags = getSessionByKey('pageTags')
    } else {
      this.tags = []
    }
    this.syncTag()
  }
  addTag(tag) {
    let flag = this.tags.every((item) => item.path !== tag.path)
    if (flag) {
      this.tags.push(tag)
      this.syncTag()
    }
  }
  delTag(tag) {
    this.tags = this.tags.filter((item) => item.path !== tag.path)
    this.syncTag()
  }
  // 清除tag
  clearTag() {
    this.tags = []
    this.syncTag()
  }
  // 设置tag
  setTag(tags) {
    this.tag = tags || []
    this.syncTag()
  }
  // 同步
  syncTag() {
    setSessionByKey('pageTags', this.tags)
  }
}

export default Pagetag
