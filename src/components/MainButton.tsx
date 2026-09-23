import React from "react";

interface Props {
    text: string;
    web: string | null;
}

export default function MainButton({ text, web, children }: Props & { children?: React.ReactNode }) {
    return (
        <a
            href={web ?? "#"}
            className="backdrop-filter h-fit backdrop-blur-md py-3 px-4 text-gold cursor-pointer bg-surface-elevated rounded-md flex gap-2 justify-center border border-border-gold transition-all duration-300 hover:bg-glass-hover hover:border-gold hover:text-gold"
        >
            {text} {children}
        </a>
    );
}
