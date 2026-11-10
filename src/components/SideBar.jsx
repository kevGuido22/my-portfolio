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

    return (
        <div
            id="mobile-menu"
            className={`fixed top-0 h-screen w-full bg-primary p-10 py-12 flex flex-col justify-between transition-all duration-150 ease-in-out ${
                isOpen ? "visible left-0" : "invisible left-[-500rem]"
            }`}
        >
            <ul className="grid gap-8 text-on-dark font-primary text-2xl">
                {links.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className="flex gap-4 items-baseline"
                            onClick={closeMenu}
                        >
                            <span className="font-mono text-sm text-on-dark-secondary">
                                {link.index}
                            </span>
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="border-t border-t-on-dark grid gap-8 pt-8">
                <a
                    href="/CV.pdf"
                    className="flex gap-2 items-center text-on-dark text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ResumeIcon /> Resume
                </a>

                <a
                    href="https://www.linkedin.com/in/kevin-guido-urbina-2456aa280/"
                    className="flex gap-2 items-center text-on-dark text-xl"
                    target="_blank"
                >
                    <LinkedInIcon />
                    LinkedIn
                </a>

                <a
                    href="https://github.com/kevGuido22"
                    className="flex gap-2 items-center text-on-dark text-xl"
                    target="_blank"
                >
                    <GithubIcon /> GitHub
                </a>
            </div>
        </div>
    );
}
