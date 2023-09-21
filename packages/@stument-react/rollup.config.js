import sizes from "@atomico/rollup-plugin-sizes";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import autoExternal from "rollup-plugin-auto-external";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      name: pkg.name,
      file: pkg.umd,
      format: "umd",
      sourcemap: true,
    },
    {
      name: pkg.name,
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "auto",
    },
    {
      name: pkg.name,
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    autoExternal({
      packagePath: "./package.json",
    }),
    sourcemaps(),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "../../node_modules/**",
    }),
    sizes(),
    typescript({
      tsconfig: "../../tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          paths: {
            "@stument/*": ["packages/*/src"],
          },
        },
        include: null,
      },
    }),
    postcss({
      plugins: [autoprefixer(), cssnano()],
      extract: "css/index.css",
    }),
    scss({
      include: ["scss/**/*.css", "scss/**/*.scss", "scss/**/*.sass"],
      failOnError: true,
    }),
  ],
};
