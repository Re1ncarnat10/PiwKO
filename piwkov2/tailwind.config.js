module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.{html,js}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {

    },
    extend: {
      height: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
        '256': '63.5rem',
        '272': '68rem'
      }
    },
    maxHeight: {
      '128': '32rem',
      '144': '36rem',
      '160': '40rem',
      '176': '44rem',
      '192': '48rem',
      '208': '52rem',
      '224': '56rem',
      '240': '60rem',
      '256': '63.5rem',
      '272': '68rem'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ]
  }
}
