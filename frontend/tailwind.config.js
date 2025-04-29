/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          // Custom colors for our weather app
          primary: '#3b82f6', // blue-500
          secondary: '#64748b', // slate-500
          background: '#f8fafc', // slate-50
        },
      },
    },
    plugins: [
      require('rippleui'),
    ],
  }
  