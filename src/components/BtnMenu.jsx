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

        // Focusables of the modal: the toggle itself + every link inside it.
        const focusables = () => {
            const menu = document.getElementById("mobile-menu");
            const items = menu
                ? Array.from(menu.querySelectorAll("a[href]"))
                : [];
            return [buttonRef.current, ...items].filter(Boolean);
        };

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                closeMenu();
                buttonRef.current?.focus();
                return;
            }

            // Keep focus inside the open menu (it overlays the whole page).
            if (event.key === "Tab") {
                const list = focusables();
                if (list.length === 0) return;

                const first = list[0];
                const last = list[list.length - 1];
                const active = document.activeElement;

                if (event.shiftKey && active === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && active === last) {
                    event.preventDefault();
                    first.focus();
                }
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
            className={`sm:hidden fixed top-3.5 right-7 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-chip border transition-colors duration-200 ${
                isOpen
                    ? "border-on-dark bg-primary text-on-dark"
                    : "border-strong bg-surface text-primary"
            }`}
        >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
    );
}
