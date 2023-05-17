/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '256': '64rem',
        '320': '80rem',
      },
      colors: {
        // Primary colors
        'primary': '#2d3748',
        'primary-light': '#718096',
        'primary-dark': '#1a202c',
        // Secondary colors
        'secondary': '#4a5568',
        'secondary-light': '#a0aec0',
        'secondary-dark': '#2d3748',
        // Accent colors
        'accent': '#4c51bf',
        'accent-light': '#9fa8da',
        'accent-dark': '#1e293b',
        // Background colors
        'background': '#f7fafc',
        'background-dark': '#edf2f7',
        // Text colors
        'text-primary': '#1a202c',
        'text-secondary': '#718096',
        'text-light': '#f7fafc',
        'text-dark': '#2d3748',
        // Button colors
        'button-primary': '#4c51bf',
        'danger': '#F15412',
        'button-primary-hover': '#434190',
        'button-secondary': '#cbd5e0',
        'button-secondary-hover': '#a0aec0',
      }
    },
  },
  plugins: [],
}
