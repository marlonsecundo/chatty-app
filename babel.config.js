module.exports = function (api) {
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "babel-plugin-root-import",
        {
          rootPathSuffix: "./",
          rootPathPrefix: "@/",
        },
      ],
      ["inline-dotenv"],
      ["react-native-reanimated/plugin"],
    ],
  };
};

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: [
//       [
//         "babel-plugin-root-import",
//         {
//           rootPathSuffix: "./",
//           rootPathPrefix: "@/",
//         },
//       ],
//       ["inline-dotenv"],
//       ["react-native-reanimated/plugin"],
//     ],
//   };
// };
