
export function btnTemplateStr(btns) {
  let btnStr = ''
  console.log(btns, 'btns');
  if (Array.isArray(btns) && btns.length > 0) {
    btns.forEach(item => {
      btnStr += `<el-button ${item.type ? ('type=' + item.type) : ''} ${item.icon ? ('icon=' + item.icon) : ''} ${item.plain ? 'plain' : ''} ${item.round ? 'round' : ''} ${item.circle ? 'circle' : ''}>${item.name}</el-button>`
    })
    return btnStr
  } else {
    return ''
  }
}

export function operateBtnTempalteStr(btns) {
  let btnStr = ''
  if (Array.isArray(btns) && btns.length > 0) {
    btns.forEach(btnType => {
      console.log(btnType, 'btnTypebtnTypebtnTypebtnType');
      btnStr += `<MyTableBtn btnType=${btnType} ${btnType === 'status' ? (':status="row.status"') : ''}></MyTableBtn>`
    })
    return `<template #endColumn>
    <el-table-column prop="operate" label="操作" align="center">
      ${btnStr}
    </el-table-column>
  </template>`
  } else {
    return ''
  }
}
