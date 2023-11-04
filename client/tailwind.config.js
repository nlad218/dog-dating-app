/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#fda94a",

					secondary: "#fda94a",

					accent: "#b6e0ec",

					neutral: "#ff8802",

					"base-100": "#b6e0ec",

					info: "#04abab",

					success: "#36d399",

					warning: "#fbbd23",

					error: "#f87272",
				},
			},
		],
	},
};
