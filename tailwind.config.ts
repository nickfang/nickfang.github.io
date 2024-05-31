import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        main: '#395775',
        // 'accent': '#f29f05',
        accent: '#22c5e9',
        text: '#000000',
        bg: '#1b2733',
        gunmetal: '#1b2733',
        charcoal: '#273c50',
        'yinmn-blue': '#395775',
        'vivid-sky-blue': '#22c5e9',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'], // Monospace font
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
