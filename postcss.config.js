module.exports = {
    plugins: [
      require('autoprefixer'),
      require('postcss-preset-env')({
        // Opciones de configuración para postcss-preset-env
        // Consulta la documentación para más detalles
      }),
    ],
  };
  