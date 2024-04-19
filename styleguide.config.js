module.exports = {
  components: "src/components/**/*.{js,jsx,ts,tsx}",
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json"
  ).parse
};
