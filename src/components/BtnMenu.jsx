import { MenuIcon, CloseIcon } from "../icons/icons";
import { useMenuStore } from "../store/useMenuStore";

export function BtnMenu() {
    const { toggleMenu, isOpen } = useMenuStore((set) => set);

    const handleClick = () => {
        toggleMenu();
    };

    return (
        <div
            onClick={handleClick}
            className="sm:hidden fixed top-5 right-5 w-8 h-8 z-50 cursor-pointer"
        >
            <div className="transition-all duration-300 ease-in-out">
                {isOpen ? (
                    <CloseIcon style={"opacity-100 scale-100 "} />
                ) : (
                    <MenuIcon className="opacity-100 scale-100 color-red-500" />
                )}
            </div>
        </div>
    );
}
