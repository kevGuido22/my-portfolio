/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            fontFamily: {
                primary: ["Red Hat Display", "sans-serif"],
            },
            colors: {
                background: "var(--color-background)",
                surface: "var(--color-surface)",
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                "dark-surface": "var(--color-dark-surface)",
                "on-dark": "var(--color-text-on-dark)",
                "on-dark-secondary": "var(--color-text-on-dark-secondary)",
            },
            borderColor: {
                DEFAULT: "var(--color-border)",
                strong: "var(--color-border-strong)",
                "on-dark": "var(--color-border-on-dark)",
            },
            borderRadius: {
                card: "var(--radius-card)",
                chip: "var(--radius-chip)",
            },
            maxWidth: {
                container: "var(--container-max)",
            },
        },
    },
    plugins: [],
};
