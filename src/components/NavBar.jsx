export function NavBar() {
    return (
        <nav className="fixed hidden items-center gap-10 mt-12 px-8 py-3 border bg-dark-custom/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-100 border-gray-100 left-1/2 transform -translate-x-1/2 z-10 sm:flex">
            {/* <!-- <h2 class="text-white font-primary text-2xl font-bold">K</h2> --> */}
            <ul class="flex gap-6 text-white font-primary">
                <li>
                    <a href="#" className="glow-hover">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#experience" className="glow-hover">
                        Experience
                    </a>
                </li>
                <li>
                    <a href="#projects" className="glow-hover">
                        Projects
                    </a>
                </li>
                <li>
                    <a href="#skills" className="glow-hover">
                        Skills
                    </a>
                </li>
                <li>
                    <a href="#aboutme" className="glow-hover">
                        About me
                    </a>
                </li>
            </ul>
        </nav>
    );
}
