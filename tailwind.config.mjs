/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            backgroundImage: {
                "header-gradient":
                    "linear-gradient(180deg, rgba(212,175,106,.12) 0%, rgba(108,142,255,.06) 50%, #050505 100%)",
            },
            fontFamily: {
				primary: ['Red Hat Display', 'sans-serif']
			},
            colors:{
                "main": "#050505",
                "background": "#050505",
                "background-secondary": "#0A0A0A",
                "surface": "#0F0F0F",
                "surface-elevated": "#151515",
                "gold": "#D4AF6A",
                "gold-light": "#E6C98A",
                "gold-dark": "#9E7A3A",
                "navy": "#0B1220",
                "blue-accent": "#6C8EFF",
                "text-primary": "#F5F5F5",
                "text-secondary": "#A1A1AA",
                "text-muted": "#71717A",
                "border": "rgba(255,255,255,0.10)",
                "border-gold": "rgba(212,175,106,0.35)",
                "glass": "rgba(255,255,255,0.04)",
                "glass-hover": "rgba(255,255,255,0.07)",
            }
        },
    },
    plugins: [],
};
