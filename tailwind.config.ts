import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'CalorieCompass-Neutral': "#e7e7e7",
                'CalorieCompass-Primary': "#3ecb00",
                'CalorieCompass-Secondary': "#ff9f0f",
            },
        },
    },
    plugins: [],
}
export default config
