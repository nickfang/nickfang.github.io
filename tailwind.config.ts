import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      main: '#395775',
      accent: '#22c5e9',
      text: '#000000',
      bg: '#1b2733',
      gunmetal: '#1b2733',
      charcoal: '#273c50',
      'yinmn-blue': '#395775',
      'vivid-sky-blue': '#22c5e9',
      energy: '#5C7FAF',
      hologram: '#80A7D3',
      white: '#ffffff',
    },
    fontFamily: {
      mono: ['Courier New', 'monospace'], // Monospace font
    },
    extend: {
      animation: {
        scale: 'scale 0.3s ease-in-out', // Customize duration and easing as needed
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
