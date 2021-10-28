/**
 * @description 获取tree第一个元素的最后一层
 *  children属性
 */
export function getTreeFirstItem(tree: Array<any>): any {
  if (!('children' in tree[0])) return tree[0]
  return getTreeFirstItem(tree[0].children)
}

/**
 * @description 获取treeItem 的路径(所有父级的label)
 * @param {any} node el-tree 节点
 */
export function getTreeItemPath(node: any): any[] {
  let res: string[] = []
  if ('parent' in node && node.parent != null) {
    res = [node.label]
    return (res = [...getTreeItemPath(node.parent), ...res])
  }
  return res
}

/**
 * @description 获取节点所有children
 * @param data
 * @param attr 获取某个属性值
 */
export function getTreeAllNodeChildren(data: any, attr?: string) {
  let res: any[] = []
  if (data.children) {
    for (let i = 0; i < data.children.length; i++) {
      res = [...res, ...getTreeAllNodeChildren(data.children[i], attr)]
    }
  } else {
    res.push(attr ? data[attr] : data)
  }
  return res
}
