/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        stripe: {
          bg: '#F6F9FC',
          card: '#FFFFFF',
          text: '#0A2540',
          muted: '#425466',
          border: '#E6EBF1',
          accent: '#635BFF',
        },
        brand: {
          cyan: '#00B2FE',
          blue: '#2B35AF',
          purple: '#522785',
          red: '#F04A23',
          yellow: '#FEE100',
        },
      },
      backgroundImage: {
        'flame-gradient': 'linear-gradient(135deg, #00B2FE 0%, #2B35AF 30%, #522785 60%, #F04A23 85%, #FEE100 100%)',
        'stripe-hero': 'linear-gradient(180deg, #F6F9FC 0%, #FFFFFF 100%)',
        'stripe-card-glow': 'radial-gradient(circle at top right, rgba(0, 178, 254, 0.08), transparent 60%)',
      },
      boxShadow: {
        'stripe': '0 13px 27px -5px rgba(50,50,93,0.1), 0 8px 16px -8px rgba(0,0,0,0.08)',
        'stripe-hover': '0 30px 60px -12px rgba(50,50,93,0.15), 0 18px 36px -18px rgba(0,0,0,0.12)',
        'stripe-sm': '0 2px 5px 0 rgba(60,66,87,0.08), 0 1px 1px 0 rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
