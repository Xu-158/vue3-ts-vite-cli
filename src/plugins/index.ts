/*
 * @Description: 批量注入app实例
 */
import { createApp } from "vue";
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = import.meta.glob("./*.ts");
  for (const path in files) {
    files[path]().then((mod) => {
      console.log(path, mod);
      if (typeof mod.default === "function" && path !== "./index.ts") {
        mod.default(app);
      }
    });
  }
}
