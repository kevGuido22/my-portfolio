import { useEffect, useRef } from "react";
import { MenuIcon, CloseIcon } from "../icons/icons";
import { useMenuStore } from "../store/useMenuStore";

export function BtnMenu() {
    const isOpen = useMenuStore((state) => state.isOpen);
    const toggleMenu = useMenuStore((state) => state.toggleMenu);
    const closeMenu = useMenuStore((state) => state.closeMenu);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return undefined;

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                closeMenu();
                buttonRef.current?.focus();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, closeMenu]);

    return (
        <button
            ref={buttonRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`sm:hidden fixed top-5 right-5 w-8 h-8 z-50 cursor-pointer transition-colors duration-200 ${
                isOpen ? "text-on-dark" : "text-primary"
            }`}
        >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
    );
}
