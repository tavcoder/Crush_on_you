/*NavBar.jsx*/
import { Link, useLocation } from 'react-router'
import { Bell } from "lucide-react";
import { BrandLogo } from '../../ui/brandLogo/BrandLogo.jsx'
import { IconButton } from '../../ui/iconButton/IconButton.jsx'
import { AvatarMenu } from '../../molecules/avatarMenu/AvatarMenu.jsx'
import { SearchBar } from '../../molecules/searchBar/SearchBar.jsx'
import './NavBar.css'

const NAV_LINKS = [
    { to: '/feed', label: 'Feed' },
    { to: '/timeline', label: 'Timeline' },
    { to: '/people/suggestions', label: 'People' },
];
export function NavBar({ user }) {
    const { pathname } = useLocation()

    const navItems = NAV_LINKS.map(({ to, label }) => {
        const isActive = pathname === to;
        return (
            <Link
                key={to}
                to={to}
                className={`nav-bar__link ${isActive ? 'nav-bar__link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
            >
                {label}
            </Link>
        );
    });
    return (
        <nav className="nav-bar">

            <BrandLogo />

            <SearchBar className="nav-bar__search" />

            <div className='nav-bar__actions'>
                <div className='nav-bar__links'>{navItems}</div>

                <IconButton
                    icon={<Bell />}
                    badge={true}
                    variant="outlined"
                    ariaLabel="Notifications — coming soon"
                    disabled
                    tooltip="Notifications coming soon"
                />

                <AvatarMenu user={user} />
            </div>
        </nav>

    )
}