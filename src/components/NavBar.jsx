export function NavBar() {
    return (
        <nav className="fixed hidden items-center gap-10 mt-12 px-8 py-3 border bg-background rounded-md left-1/2 transform -translate-x-1/2 z-10 sm:flex">
            <ul class="flex gap-6 text-primary font-primary">
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#experience">Experience</a>
                </li>
                <li>
                    <a href="#projects">Projects</a>
                </li>
                <li>
                    <a href="#skills">Skills</a>
                </li>
                <li>
                    <a href="#aboutme">About me</a>
                </li>
            </ul>
        </nav>
    );
}
