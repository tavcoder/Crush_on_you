// BottomNav.jsx
import { Link, useLocation } from 'react-router'
import { Home, Search, MessageCircle, User } from "lucide-react";
import { IconButton } from "../../ui/iconButton/IconButton.jsx";
import { FloatButton } from "../../ui/floatButton/FloatButton.jsx";
import './BottomNav.css'

const messages = 3;
const NAV_ITEMS = [
    { to: '/', icon: Home, label: 'Home', badge: false },
    { to: '/search', icon: Search, label: 'Search', badge: false },
    { to: '/messages', icon: MessageCircle, label: 'Messages', badge: Boolean(messages) },
    { to: '/profile', icon: User, label: 'Profile', badge: false },
];

export function BottomNav() {
    const location = useLocation();


    const navItems = NAV_ITEMS.map(({ to, icon: Icon, label, badge }) => {
        const isActive = location.pathname === to;
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
            <FloatButton />
            {navItems.slice(2)}
        </nav>
    );
}