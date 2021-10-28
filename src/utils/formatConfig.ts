/**
 * @description 配置格式化
 * @example
 * const myConfig = new FormatConfig(config, "1");
 * console.log(myConfig.getFormatWriteParams());
 */
export class FormatConfig {
  private originConfig: any[] // 原始数据
  private userLevel: number // 用户权限等级

  constructor(config: string, userLevel: number) {
    this.originConfig = JSON.parse(config)
    this.userLevel = userLevel
    this.setParamsId()
  }

  // 添加ID
  // 规则: address + subAddress + dataType + RW + format + type + count 每个字段之间用 '.,' 分隔
  // count 默认1 ,如果前面部分存在 ID，则count++
  private setParamsId() {
    const separator = '.,'
    const count = 1
    const obj: Record<string, number> = {}
    this.originConfig.forEach((row) => {
      const id = [
        row.address,
        row.subAddress,
        row.dataType,
        row.RW,
        row.format,
        row.type,
        count
      ].join(separator)
      if (obj[id]) {
        obj[id]++
      } else {
        obj[id] = count
      }
      row.$id = [
        row.address,
        row.subAddress,
        row.dataType,
        row.RW,
        row.format,
        row.type,
        obj[id]
      ].join(separator)
    })
  }

  // 参数权限
  private checkParams(row: any) {
    if (row.classLevel == null || row.classLevel == undefined) {
      return true
    } else {
      // 有定义时继续判断
      let levelType = 0
      // 合法的表达为 <=(0) , <(1) , >(2) , >=(3) , =/==(4) 五种
      if (row.classLevel.length > 1) {
        // 只取非数字部分
        const tmp_type = row.classLevel.replace(/\d+/g, '')
        switch (tmp_type) {
          case '<':
            levelType = 1
            break
          case '>':
            levelType = 2
            break
          case '>=':
            levelType = 3
            break
          case '=':
          case '==':
            levelType = 4
            break
          case '<=':
          default:
            levelType = 0
            break
        }
      }

      // 只取数字部分
      const tmp_level = parseInt(row.classLevel.replace(/[^0-9]/gi, ''))

      // 权限没有数值时或数值为0时可视
      if (tmp_level == null || tmp_level == undefined || tmp_level <= 0) {
        // console.log(item.name + "权限无数值或为0");
        return true
      } else {
        switch (levelType) {
          case 1:
            return this.userLevel < tmp_level
          case 2:
            return this.userLevel > tmp_level
          case 3:
            return this.userLevel >= tmp_level
          case 4:
            return this.userLevel == tmp_level
          case 0:
          default:
            return this.userLevel <= tmp_level
        }
      }
    }
  }

  //  字符串 "0:关机;1:开机" 转为对象数组
  private formatEnum = (str: string) => {
    if (typeof str != 'string') return str
    str = str.trim()
    if (str[str.length - 1] == ';') {
      str = str.slice(0, str.length - 1)
    }
    const newObj: any = []
    str.split(';').forEach(function (e) {
      const tempList = e.split(':')
      const tempObj: Record<string, string | number> = {}
      tempObj['value'] = parseInt(tempList[0])
      tempObj['key'] = tempList[1]
      newObj.push(tempObj)
    })
    return newObj
  }

  // 格式数据
  private formatData(dataList: any[]) {
    if (!dataList) return []
    const modules: Record<string, any[]> = {}
    dataList.forEach((row) => {
      const deviceName = row.device.slice(0, 2)
      if (row.type === 'enum') row.$menuValue = this.formatEnum(row.ctrlRange)
      if (!(deviceName in modules)) {
        modules[deviceName] = [
          {
            name: row.name,
            dataRow: [row]
          }
        ]
      } else {
        const flagIndex = modules[deviceName].findIndex((val) => {
          return val.name == row.name
        })
        if (flagIndex !== -1) {
          modules[deviceName][flagIndex].dataRow.push(row)
        } else {
          modules[deviceName].push({
            name: row.name,
            dataRow: [row]
          })
        }
      }
    })

    const result = []
    for (const m in modules) {
      result.push({
        name: m,
        params: modules[m]
      })
    }
    return result
  }

  // 筛选参数
  // 所有参数
  getAllParams() {
    return this.formatData(this.originConfig.filter((row) => row.type !== 'Extra_IP'))
  }
  // 故障参数
  getErrParams() {
    return this.formatData(this.originConfig.filter((row) => row.isError))
  }

  // 可写参数原始数据
  getWriteParams() {
    return this.originConfig.filter((row) => {
      return ['R/W', 'W'].includes(row.RW) && this.checkParams(row)
    })
  }

  // 可写参数
  getFormatWriteParams() {
    return this.formatData(this.getWriteParams())
  }

  // 可读参数原始数据
  getReadParams() {
    return this.originConfig.filter((row) => {
      return ['R'].includes(row.RW) && this.checkParams(row)
    })
  }
  // 可读参数
  getFormatReadParams() {
    return this.formatData(this.getReadParams())
  }
}
