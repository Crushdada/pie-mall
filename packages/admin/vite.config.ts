import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
import { createVuePlugin } from "vite-plugin-vue2";
import { injectHtml } from "vite-plugin-html";
import ViteRestart from "vite-plugin-restart";
import dotenv from "dotenv";

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}
try {
  // 根据环境变量加载环境变量文件
  const file = dotenv.parse(
    fs.readFileSync(`.env.${process.env.NODE_ENV || "local"}`)
  );
  // 根据获取的key给对应的环境变量赋值
  for (const key in file) {
    process.env[key] = file[key];
  }
} catch (e) {
  console.error(e);
}

const API_LOCATION = process.env.API_LOCATION || "/api";
export default defineConfig({
  root: "./", // 项目根目录（index.html 文件所在的位置）可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
  publicDir: "public", // 作为静态资源服务的文件夹.该值可以是文件系统的绝对路径，也可以是相对于项目的根目录的相对路径。
  base: "./", // 公共基础路径。改值可以是绝对路径或空字符串
  mode: "development",
  optimizeDeps: {
    // 要预构建的第三方依赖
    include: [],
  },
  resolve: {
    alias: {
      // 'vue': 'vue/dist/vue.esm.js', // 如果是模板解析的 - 使用这个 vue：内部为正则表达式  vue 结尾的
      vendor: resolve("src/vendor"),
      "@": resolve("src"),
      "~@": resolve("src"),
      "~component": resolve("src/components"),
      "~config": resolve("config"),
    },
  },
  plugins: [
    createVuePlugin({
      jsx: true,
      jsxOptions: {
        injectH: false,
      },
    }),
    injectHtml({
      injectData: {
        title: process.env.VITE_APP_TITLE || "商家端",
      },
    }),
    ViteRestart({
      restart: ["vite.config.ts", ".env"],
    }),
  ],
  define: {
    "process.env": process.env,
  },
  server: {
    host: "localhost",
    open: true, // 是否自动打开浏览器
    port: process.env.PORT || 8081,
    proxy: {
      [API_LOCATION]: {
        target: "http://127.0.0.1:8001",
        rewrite: (path) => path.replace(API_LOCATION, ""),
      },
    },
  },
});
