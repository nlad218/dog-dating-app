/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#fd5564",

					secondary: "#CACACA",

					accent: "#ef4a75",

					neutral: "#424242",

					"base-100": "#424242",

					info: "#ef4a75",

					success: "#36d399",

					warning: "#fbbd23",

					error: "#f87272",
				},
			},
		],
	},
};
