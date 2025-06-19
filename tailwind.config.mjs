/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            backgroundImage: {
                "header-gradient":
                    "linear-gradient(180deg, rgba(2,31,95,1) 0%, rgba(2,14,46,1) 45%, rgba(9,9,9,1) 100%)",
            },
            fontFamily: {
				primary: ['Red Hat Display', 'sans-serif']
			},
            colors:{
                "dark-custom": "#090909",
                "tag": "#141414"
            }
        },
    },
    plugins: [],
};
