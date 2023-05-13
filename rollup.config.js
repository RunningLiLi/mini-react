import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import path from "path";
export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.es.js",
      format: "es",
    },
  ],
  plugins: [
    nodeResolve({
      extensions: [".js", ".ts", ".tsx", ".jsx"],
    }),
    commonjs({
      include: "**/node_modules/**",
    }),
    typescript({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
        },
      },
    }),
    babel({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      babelHelpers: "bundled",
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current",
            },
          },
        ],
        "@babel/preset-react",
      ],
    }),
    // terser(),
  ],
};
