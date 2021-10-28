/*
 * @Description: ElementUI组件注册配置 按需引入
 */
import { ElContainer } from "element-plus";

// import ElementPlus from "element-plus";

export default function loadComponent(app: any) {
  // app.use(ElementPlus); //全部引入
  app.use(ElContainer);
  app.config.globalProperties.$ELEMENT = { size: "medium", zIndex: 3000 };
}
