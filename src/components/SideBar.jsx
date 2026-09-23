import { useMenuStore } from "../store/useMenuStore";
import {
    HomeIcon,
    ClipBoardIcon,
    LightningIcon,
    StarIcon,
    BriefCaseIcon,
    LinkedInIcon,
    ResumeIcon,
    GithubIcon,
} from "../icons/icons";

export function SideBar() {
    const { isOpen, closeMenu } = useMenuStore((state) => state);

    return (
        <div
            className={`w-[100%] h-screen bg-surface-elevated/80 ${isOpen ? "left-0" : "left-[-500rem]"} fixed top-0 z-40 p-10 py-12 bg-opacity-100 bg-clip-padding backdrop-filter backdrop-blur-md transition-all duration-150 ease-in-out justify-between flex flex-col`}
        >
            <ul className="grid gap-10 text-white font-primary text-xl ">
                <li>
                    <a
                        href="#"
                        className="flex gap-2 items-center"
                        onClick={closeMenu}
                    >
                        <HomeIcon />
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="#experience"
                        className="flex gap-2 items-center"
                        onClick={closeMenu}
                    >
                        <BriefCaseIcon />
                        Experience
                    </a>
                </li>
                <li>
                    <a
                        href="#projects"
                        className="flex gap-2 items-center"
                        onClick={closeMenu}
                    >
                        <ClipBoardIcon />
                        Projects
                    </a>
                </li>
                <li>
                    <a
                        href="#skills"
                        className="flex gap-2 items-center"
                        onClick={closeMenu}
                    >
                        <LightningIcon />
                        Skills
                    </a>
                </li>
                <li>
                    <a
                        href="#aboutme"
                        className="flex gap-2 items-center"
                        onClick={closeMenu}
                    >
                        <StarIcon />
                        About me
                    </a>
                </li>
            </ul>
            <div className="border-t-[1px] grid gap-10 pt-8">
                <a
                    href="/CV.pdf"
                    className="flex gap-2 items-center text-white text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ResumeIcon /> Resume
                </a>

                <a
                    href="https://www.linkedin.com/in/kevin-guido-urbina-2456aa280/"
                    className="flex gap-2 items-center text-white text-xl"
                    target="_blank"
                >
                    <LinkedInIcon />
                    LinkedIn{" "}
                </a>

                <a
                    href="https://github.com/kevGuido22"
                    className="flex gap-2 items-center text-white text-xl"
                    target="_blank"
                >
                    <GithubIcon /> Github
                </a>
            </div>
        </div>
    );
}
