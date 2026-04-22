// BottomNav.jsx
import { Link, useLocation } from 'react-router'
import { Home, Search, MessageCircle, User } from "lucide-react";
import { IconButton } from "../../ui/iconButton/IconButton.jsx";
import { FloatButton } from "../../ui/floatButton/FloatButton.jsx";
import './BottomNav.css'


const NAV_ITEMS = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/messages', icon: MessageCircle, label: 'Messages' },
    { to: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
    const location = useLocation();

    const navItems = NAV_ITEMS.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;
        return (
            <IconButton
                key={to}
                as={Link}
                to={to}
                icon={<Icon fill={isActive ? 'currentColor' : 'none'} />}
                isPressed={isActive}
                direction="column"
            >
                {label}
            </IconButton>
        );
    });

    return (
        <nav className="bottom-nav" aria-label="Main navigation">
            {navItems.slice(0, 2)}
            <FloatButton />
            {navItems.slice(2)}
        </nav>
    );
}