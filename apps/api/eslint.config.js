import base from "../../packages/config/eslint.config.js";

export default [
  ...base,
  {
    ignores: ["dist", "node_modules"]
  }
];
