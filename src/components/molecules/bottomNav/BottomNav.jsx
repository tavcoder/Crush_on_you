// BottomNav.jsx
import { useLocation } from 'react-router'
import { Home, Search, Users, User } from "lucide-react";
import { IconButton } from "../../ui/iconButton/IconButton.jsx";
import { FloatButton } from "../../ui/floatButton/FloatButton.jsx";
import './BottomNav.css'

const NAV_ITEMS = [
    { to: '/feed', icon: Home, label: 'Home', badge: false },
    { to: '/people/suggestions', icon: Users, label: 'People', badge: false },
    { to: '/profile', icon: User, label: 'Profile', badge: false },
];

export function BottomNav({ onCreate, createButtonRef, onSearch, isSearchOpen, searchButtonRef }) {
    const { pathname } = useLocation();

    const [home, people, profile] = NAV_ITEMS.map(({ to, icon: Icon, label, badge }) => {
        const isActive = pathname.startsWith(
            to.startsWith('/people') ? '/people' : to
        )
        return (
            <IconButton
                key={to}
                to={to}
                icon={<Icon fill={isActive ? 'currentColor' : 'none'} />}
                isPressed={isActive}
                direction="column"
                badge={badge}
            >
                {label}
            </IconButton>
        );
    });

    const searchItem = (
        <IconButton
            ref={searchButtonRef}
            key="search"
            icon={<Search fill={isSearchOpen ? 'currentColor' : 'none'} />}
            isPressed={isSearchOpen}
            ariaExpanded={isSearchOpen}
            direction="column"
            onClick={onSearch}
        >
            Search
        </IconButton>
    )

    return (
        <nav className="bottom-nav" aria-label="Main navigation">
            {home}
            {searchItem}
            <FloatButton ref={createButtonRef} onClick={onCreate} />
            {people}
            {profile}
        </nav>
    );
}