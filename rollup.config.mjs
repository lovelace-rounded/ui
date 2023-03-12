import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import ignore from "./rollup-plugins/ignore-plugin.js";
import babelTypescript from "@babel/preset-typescript";
import babelDecorators from "@babel/plugin-proposal-decorators";
import babelClassProperties from "@babel/plugin-proposal-class-properties";

const IGNORED_FILES = [
    "@material/mwc-notched-outline/mwc-notched-outline.js",
    "@material/mwc-ripple/mwc-ripple.js",
    "@material/mwc-list/mwc-list.js",
    "@material/mwc-list/mwc-list-item.js",
    "@material/mwc-menu/mwc-menu.js",
    "@material/mwc-menu/mwc-menu-surface.js",
    "@material/mwc-icon/mwc-icon.js",
];

const extensions = [".js", ".ts"];

const dev = process.env.ROLLUP_WATCH;

const serveOptions = {
    contentBase: ["./dist"],
    host: "0.0.0.0",
    port: 4000,
    allowCrossOrigin: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
};

const plugins = [
    ignore({
        files: IGNORED_FILES.map((file) => require.resolve(file)),
    }),
    alias({
        entries: [
            { find: /^lit\/decorators$/, replacement: "lit/decorators.js" },
            { find: /^lit\/directive$/, replacement: "lit/directive.js" },
            {
                find: /^lit\/directives\/class-map$/,
                replacement: "lit/directives/class-map.js",
            },
            {
                find: /^lit\/directives\/style-map$/,
                replacement: "lit/directives/style-map.js",
            },
            {
                find: /^lit\/directives\/if-defined$/,
                replacement: "lit/directives/if-defined.js",
            },
        ],
    }),
    typescript({
        declaration: false,
    }),
    nodeResolve({
        extensions: extensions,
        preferBuiltins: false,
        browser: true,
        rootDir: "./src",
    }),
    json({
        compact: true,
        preferConst: true,
    }),
    commonjs({
        sourceMap: false,
    }),
    babel({
        babelrc: false,
        compact: true,
        presets: [babelTypescript.default],
        babelHelpers: "bundled",
        plugins: [
            "@babel/syntax-dynamic-import",
            "@babel/plugin-proposal-optional-chaining",
            "@babel/plugin-proposal-nullish-coalescing-operator",
            [babelDecorators.default, { decoratorsBeforeExport: true }],
            [babelClassProperties.default, { loose: true }],
        ].filter(Boolean),
        extensions,
        exclude: [require.resolve("@mdi/js/mdi.js")],
    }),
    ...(dev ? [serve(serveOptions)] : [terser()]),
];

export default [
    {
        input: "src/rounded.ts",
        output: {
            dir: "dist",
            format: "es",
            inlineDynamicImports: true,
        },
        plugins,
    },
];
