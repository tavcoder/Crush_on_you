// BottomNav.jsx
import { Link, useLocation } from 'react-router'
import { Home, Search, Users, User } from "lucide-react";
import { IconButton } from "../../ui/iconButton/IconButton.jsx";
import { FloatButton } from "../../ui/floatButton/FloatButton.jsx";
import './BottomNav.css'

const NAV_ITEMS = [
    { to: '/feed', icon: Home, label: 'Home', badge: false },
    { to: '/search', icon: Search, label: 'Search', badge: false },
    { to: '/people/suggestions', icon: Users, label: 'People', badge: false },
    { to: '/profile', icon: User, label: 'Profile', badge: false },
];

export function BottomNav({ onCreate, createButtonRef }) {
    const location = useLocation();


    const navItems = NAV_ITEMS.map(({ to, icon: Icon, label, badge }) => {
        const isActive = location.pathname.startsWith(
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

    return (
        <nav className="bottom-nav" aria-label="Main navigation">
            {navItems.slice(0, 2)}
            <FloatButton ref={createButtonRef} onClick={onCreate} />
            {navItems.slice(2)}
        </nav>
    );
}