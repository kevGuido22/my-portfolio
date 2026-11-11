import { useEffect } from "react";
import { useMenuStore } from "../store/useMenuStore";
import { LinkedInIcon, ResumeIcon, GithubIcon } from "../icons/icons";

const links = [
    { href: "#home", label: "Home", index: "01" },
    { href: "#experience", label: "Experience", index: "02" },
    { href: "#projects", label: "Projects", index: "03" },
    { href: "#skills", label: "Skills", index: "04" },
    { href: "#aboutme", label: "About me", index: "05" },
];

export function SideBar() {
    const isOpen = useMenuStore((state) => state.isOpen);
    const closeMenu = useMenuStore((state) => state.closeMenu);

    // Lock document scroll while the overlay is open.
    useEffect(() => {
        if (!isOpen) return undefined;

        const previous = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.documentElement.style.overflow = previous;
        };
    }, [isOpen]);

    return (
        <div
            id="mobile-menu"
            data-open={isOpen}
            className="mobile-menu fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-primary text-on-dark"
        >
            {/* Brand bar — the close button (BtnMenu) overlays this row at z-50 */}
            <div className="px-7 pt-5">
                <div className="flex h-8 items-center">
                    <span className="font-mono text-sm uppercase tracking-[0.2em]">
                        K. Guido
                    </span>
                </div>
            </div>

            {/* Section links — editorial list with mono indices and hairlines */}
            <nav aria-label="Sections" className="flex flex-1 flex-col justify-center px-7 py-8">
                <ul className="border-t border-on-dark">
                    {links.map((link) => (
                        <li
                            key={link.href}
                            className="mobile-menu-item border-b border-on-dark"
                        >
                            <a
                                href={link.href}
                                onClick={closeMenu}
                                className="flex items-baseline gap-4 py-4 font-primary text-3xl font-medium transition-opacity duration-200 active:opacity-60"
                            >
                                <span className="font-mono text-xs text-on-dark-secondary">
                                    {link.index}
                                </span>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Contact row — mono labels, hairline top, centered */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-on-dark px-7 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <a
                    href="/CV-KevinGuidoUrbina.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-on-dark-secondary transition-colors duration-200 hover:text-on-dark"
                >
                    <ResumeIcon /> Resume
                </a>

                <a
                    href="https://www.linkedin.com/in/kevin-guido-urbina-2456aa280/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-on-dark-secondary transition-colors duration-200 hover:text-on-dark"
                >
                    <LinkedInIcon /> LinkedIn
                </a>

                <a
                    href="https://github.com/kevGuido22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-on-dark-secondary transition-colors duration-200 hover:text-on-dark"
                >
                    <GithubIcon /> GitHub
                </a>
            </div>
        </div>
    );
}
