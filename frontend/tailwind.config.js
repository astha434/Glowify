/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FC2779', // Nykaa Pink
                secondary: '#FAFAFA', // Light Gray Background
                accent: '#001325', // Deep Dark Blue/Black for text
                'gray-text': '#3F414D', // Standard text gray
                'border-gray': '#E1E1E1'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Plus Jakarta Sans', 'sans-serif']
            },
            keyframes: {
                wave: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(15deg)' },
                    '50%': { transform: 'rotate(-5deg)' },
                    '75%': { transform: 'rotate(10deg)' },
                }
            },
            animation: {
                wave: 'wave 1.5s infinite',
            }
        },
    },
    plugins: [],
}
