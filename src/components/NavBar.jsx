export function NavBar() {
    return (
        <nav className="fixed hidden items-center gap-10 mt-12 px-8 py-3 border bg-surface/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-100 border-white/10 left-1/2 transform -translate-x-1/2 z-10 sm:flex">
                    <ul className="flex gap-6 text-white font-primary">
                <li>
                    <a href="#" className="hover:text-gold transition-colors duration-300">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#experience" className="hover:text-gold transition-colors duration-300">
                        Experience
                    </a>
                </li>
                <li>
                    <a href="#projects" className="hover:text-gold transition-colors duration-300">
                        Projects
                    </a>
                </li>
                <li>
                    <a href="#skills" className="hover:text-gold transition-colors duration-300">
                        Skills
                    </a>
                </li>
                <li>
                    <a href="#aboutme" className="hover:text-gold transition-colors duration-300">
                        About me
                    </a>
                </li>
            </ul>
        </nav>
    );
}
