import React from "react";
import Tag from "./Tag.tsx";
import MainButton from "./MainButton.tsx";
import { WebIcon } from "../icons/icons";
import { GithubIcon } from "../icons/icons";

interface Props {
    img: string;
    title: string;
    description: string;
    categories: string[];
    tags: string[];
    number: string;
    web?: string;
    gitHub?: string;
}

export default function Card({ img, title, description, categories, tags, number, web, gitHub }: Props) {
    return (
        <div
            className="project-card grid sm:grid-cols-2 rounded-lg overflow-hidden bg-surface border border-border hover:border-gold hover:-translate-y-1 transition-all duration-300 h-min-[22rem]"
        >
            <div className="relative sm:order-1 order-2">
                <img
                    src={img}
                    alt={title}
                    className="h-[22rem] w-full object-cover object-left hover:scale-1.02 transition-transform duration-300"
                />
            </div>
            <div className="p-6 sm:p-8 order-2 sm:order-1 flex flex-col justify-between">
                <div>
                    <p className="text-gold text-sm font-primary mb-1 tracking-wider">{number}</p>
                    <h3 className="text-white font-primary text-xl font-bold mb-2">
                        {title}
                    </h3>
                    <p className="text-text-secondary font-primary mb-4 text-sm leading-relaxed">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag) => <Tag name={tag} />)}
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {
                        web ? (
                            <MainButton text="Website" web={web}>
                                <WebIcon />
                            </MainButton>
                        ) : null
                    }
                    {
                        gitHub ? (
                            <MainButton text="GitHub" web={gitHub}>
                                <GithubIcon />
                            </MainButton>
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
}
