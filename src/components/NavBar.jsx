const links = [
    { href: "#home", label: "Home" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#aboutme", label: "About me" },
];

export function NavBar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-20 hidden sm:flex items-center justify-between h-16 px-6 md:px-10 border-b bg-background">
            <a
                href="#home"
                className="font-mono text-sm uppercase tracking-[0.2em] text-primary"
            >
                K. Guido
            </a>
            <ul className="flex items-center gap-6 md:gap-8">
                {links.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className="relative py-2 text-sm md:text-base font-primary text-secondary transition-colors duration-200 hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
