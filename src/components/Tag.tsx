import React from "react";

interface Props {
    name: string;
}

export default function Tag({ name }: Props) {
    return (
        <span className="text-text-muted px-4 py-1 bg-surface-elevated rounded-md w-fit backdrop-filter backdrop-blur-md">
            {name}
        </span>
    );
}
