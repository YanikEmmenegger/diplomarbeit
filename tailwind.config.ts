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
                'CalorieCompass-Neutral': "#1c1c1c",
                'CalorieCompass-Secondary': "#ff9f0f",
                'CalorieCompass-Primary': "#3ecb00",
            },
        },
    },
    plugins: [],
}
export default config
