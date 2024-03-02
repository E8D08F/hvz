import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import config from "./package.json" with { type: "json" }


export default {
    input: "src/index.ts",
    output: [
        {
            file: config.main,
            format: "cjs",
        }, {
            file: config.module,
            format: "esm",
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
    ]
}
