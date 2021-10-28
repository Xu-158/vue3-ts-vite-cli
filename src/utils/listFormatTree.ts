/**
 * @description 设备树列表转 tree 结构
 *
 let res = {
  imei: "841231111333",
  GPRS: "699999999",
  devCode: "699999999",
  children: [
    {
      portNum: 0,
      name: "485-0",
      devCode: "699999999-0",
      children: [
        {
          sysNum: 0,
          name: "系统-0",
          devCode: "699999999-0-0",
          children: [
            {
              devId: "2ba31a23as124",
              imei: "841231111333",
              devNum: 1,
              name: "内机-1",
              devCode: "699999999-0-0-1",
                //  info:{
                //  AmbTem:240,
                //  Mode:1,
                //  ModeLock:false,
                //  SetTem:220,
                //  Switch:false,
                //  SwitchLock:false,
                //  WindLevel:1,
                // }
            },
          ],
        },
      ],
    },
  ],
};
 */
export interface IDevInitData {
  gprs: string
  imei: string
  portNum: string | number
  portName: string
  sysNum: string | number
  sysName: string
  devNum: string | number
  devName: string
  devId: string
  devCode: string
  info?: {
    AmbTem: number
    Mode: number
    ModeLock: boolean
    SetTem: number
    Switch: boolean
    SwitchLock: boolean
    WindLevel: number
  }
}
const compare = (key: string) => {
  return function (value1: any, value2: any) {
    const val1 = value1[key]
    const val2 = value2[key]
    return val1 - val2
  }
}

export function formatTree(initList: IDevInitData[]) {
  const tree: Record<string, any> = {}

  // 一级tree
  initList.forEach((item) => {
    if (!tree[item.imei]) {
      tree[item.imei] = {
        imei: item.imei,
        GPRS: item.gprs,
        devCode: item.gprs,
        tempChildren: [item],
        name: item.imei
      }
    } else {
      tree[item.imei].tempChildren.push(item)
    }
  })

  // 二级tree
  Object.values(tree).forEach((item) => {
    item.tempChildren.sort(compare('devNum'))
    const tempPort: Record<string, any> = {}
    item.tempChildren.forEach((portItem: IDevInitData) => {
      if (!tempPort[portItem.portNum]) {
        tempPort[portItem.portNum] = {
          // name: portItem.portName,
          name: '485-' + ((portItem.portNum as number) + 1).toString(),
          portNum: portItem.portNum,
          devCode: portItem.gprs + '-' + portItem.portNum,
          tempChildren: [portItem]
        }
      } else {
        tempPort[portItem.portNum].tempChildren.push(portItem)
      }
    })
    item.children = Object.values(tempPort)
    delete item.tempChildren
  })

  // 三级tree
  Object.values(tree).forEach((item) => {
    item.children.forEach((portItem: any) => {
      const tempSys: Record<string, any> = {}
      portItem.tempChildren.forEach((sysItem: IDevInitData) => {
        if (!tempSys[sysItem.sysNum]) {
          tempSys[sysItem.sysNum] = {
            // name: sysItem.sysName,
            name: '系统-' + ((sysItem.sysNum as number) + 1).toString(),
            sysNum: sysItem.sysNum,
            devCode: sysItem.gprs + '-' + sysItem.portNum + '-' + sysItem.sysNum,
            children: [
              {
                devId: sysItem.devId,
                imei: sysItem.imei,
                devNum: sysItem.devNum,
                // name: sysItem.devName,
                name: '内机-' + ((sysItem.devNum as number) + 1).toString(),
                devCode: sysItem.devCode,
                info: sysItem.info || null
              }
            ]
          }
        } else {
          tempSys[sysItem.sysNum].children.push({
            devId: sysItem.devId,
            imei: sysItem.imei,
            devNum: sysItem.devNum,
            // name: sysItem.devName,
            name: '内机-' + ((sysItem.devNum as number) + 1).toString(),
            devCode: sysItem.devCode,
            info: sysItem.info || null
          })
        }
      })
      portItem.children = Object.values(tempSys)
      delete portItem.tempChildren
    })
  })

  return Object.values(tree)
}
