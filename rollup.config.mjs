import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";

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
    // entries: {
    //   "lit/decorators$": "lit/decorators.js",
    //   "lit/directive$": "lit/directive.js",
    //   "lit/directives/until$": "lit/directives/until.js",
    //   "lit/directives/class-map$": "lit/directives/class-map.js",
    //   "lit/directives/style-map$": "lit/directives/style-map.js",
    //   "lit/directives/if-defined$": "lit/directives/if-defined.js",
    //   "lit/directives/guard$": "lit/directives/guard.js",
    //   "lit/directives/cache$": "lit/directives/cache.js",
    //   "lit/directives/repeat$": "lit/directives/repeat.js",
    //   "lit/polyfill-support$": "lit/polyfill-support.js",
    //   "@lit-labs/virtualizer/layouts/grid":
    //     "@lit-labs/virtualizer/layouts/grid.js",
    // },
  }),
  typescript({
    declaration: false,
  }),
  nodeResolve(),
  json(),
  commonjs(),
  babel({
    babelHelpers: "bundled",
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
    moduleContext: (id) => {
      const thisAsWindowForModules = [
        "node_modules/@formatjs/intl-utils/lib/src/diff.js",
        "node_modules/@formatjs/intl-utils/lib/src/resolve-locale.js",
      ];
      if (thisAsWindowForModules.some((id_) => id.trimRight().endsWith(id_))) {
        return "window";
      }
    },
  },
];
