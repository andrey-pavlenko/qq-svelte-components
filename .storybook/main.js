module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    // Use svelte-preprocess
    // https://github.com/walker-walks/svelte-typescript-storybook-template/blob/master/.storybook/webpack.config.js
    const svelteLoader = config.module.rules.find(
      (r) => r.loader && r.loader.includes('svelte-loader')
    );

    svelteLoader.options.preprocess = require('svelte-preprocess')({});

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader')
        }
      ]
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
};

// module.exports = {
//   stories: ['../src/**/*.stories.[tj]s'],
//   webpackFinal: async (config) => {
//     // Use svelte-preprocess
//     // https://github.com/walker-walks/svelte-typescript-storybook-template/blob/master/.storybook/webpack.config.js
//     const svelteLoader = config.module.rules.find(
//       (r) => r.loader && r.loader.includes('svelte-loader')
//     );

//     svelteLoader.options.preprocess = require('svelte-preprocess')({});

//     config.module.rules.push({
//       test: /\.(ts|tsx)$/,
//       use: [
//         {
//           loader: require.resolve('ts-loader')
//         },
//         // Optional
//         {
//           loader: require.resolve('react-docgen-typescript-loader')
//         }
//       ]
//     });
//     config.resolve.extensions.push('.ts', '.tsx');
//     return config;
//   }
// };
