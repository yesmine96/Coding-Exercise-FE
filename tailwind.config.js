module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { 
        primary: {
          DEFAULT: '#dc2626',  
        },
        secondary: {
          DEFAULT: "#00003c",
        },
        accent: {
          DEFAULT: '#3d3d3d',   
        },
     
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
 
    },
  },
  plugins: [],
}

