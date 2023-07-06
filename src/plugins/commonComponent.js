import MyTable from '@/components/TablePage'
import Divider from '@/components/Divider'
import StatusTag from '@/components/StatusTag'
import MyInput from '@/components/Form/MyInput'
import MyIcon from '@/components/Form/MyIcon'
import StatusSwitch from '@/components/Form/StatusSwitch'
import MySelectTree from '@/components/Form/MySelectTree'

const installComponents = [MyTable, Divider, StatusTag, MyInput, MyIcon, StatusSwitch, MySelectTree]

const install = function(Vue) {
  installComponents.forEach(item => {
    Vue.component(item.name, item)
  })
}

export default install