module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
          app: './app',
          assets: './assets',
          storybook: './storybook',
          api: './app/api',
          components: './app/components',
          constants: './app/constants',
          config: './app/config',
          i18n: './app/i18n',
          interfaces: './app/interfaces',
          navigation: './app/navigation',
          screens: './app/screens',
          services: './app/services',
          store: './app/store',
          theme: './app/theme',
          utils: './app/utils',
          hooks: './app/hooks',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
