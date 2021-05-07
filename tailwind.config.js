module.exports = {
  mode: 'jit',
  purge: [
    './app/javascript/**/*.js',
    './app/javascript/**/*.jsx',
    './app/assets/javascripts/**/*.js',
    './app/views/**/*.html.erb',
    './app/dashboard/**/*.rb',
    './app/components/**/*.rb',
    './app/components/**/*.html.erb',
    './app/helpers/**/*.rb',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
