function generateTree(menu) {
  const map = {};
  const tree = [];

  menu.forEach(item => {
    map[item.code] = item;
    item.children = [];
  });

  menu.forEach(item => {
    if (item.childrenCode && item.childrenCode.length > 0) {
      item.childrenCode.forEach(childCode => {
        map[childCode].parent = item;
        map[item.code].children.push(map[childCode]);
      });
      map[item.code].children.sort((a, b) => a.sort - b.sort); // 对children进行排序
    }
  });

  menu.forEach(item => {
    if (!item.parent) {
      tree.push(item);
    }
  });

  tree.sort((a, b) => a.sort - b.sort); // 对顶级目录进行排序

  function buildTree(node) {
    if (node.children.length > 0) {
      node.children.forEach(child => {
        buildTree(child);
      });
      node.children.sort((a, b) => a.sort - b.sort); // 对当前层级的children进行排序
    }
  }

  tree.forEach(item => {
    buildTree(item);
  });

  return tree;
}
// 示例数据
const menu = [
  {
    code: 1,
    name: "顶级目录1",
    sort: 2,
    childrenCode: [2, 3]
  },
  {
    code: 2,
    name: "子目录1-1",
    sort: 1,
    childrenCode: [4, 5]
  },
  {
    code: 3,
    name: "子目录1-2",
    sort: 2,
    childrenCode: [6]
  },
  {
    code: 4,
    name: "子目录1-1-1",
    sort: 1,
    childrenCode: []
  },
  {
    code: 5,
    name: "子目录1-1-2",
    sort: 2,
    childrenCode: []
  },
  {
    code: 6,
    name: "子目录1-2-1",
    sort: 1,
    childrenCode: []
  }
];

console.log(generateTree(menu));