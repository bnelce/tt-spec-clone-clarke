const shared = require("../../packages/config/tailwind.config.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...shared,
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ]
};
