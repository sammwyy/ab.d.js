import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/ab.d.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    swc({
      jsc: {
        parser: {
          syntax: "typescript",
        },
        target: "es6",
      },
      module: {
        type: "es6",
      },
    }),
    resolve(),
    commonjs(),
  ],
};
