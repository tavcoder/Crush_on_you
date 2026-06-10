/*NavBar.jsx*/
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'
import { Bell, Search } from "lucide-react";
import { Input } from '../../ui/input/Input.jsx'
import { BrandLogo } from '../../ui/brandLogo/BrandLogo.jsx'
import { IconButton } from '../../ui/iconButton/IconButton.jsx'
import { AvatarMenu } from '../../molecules/avatarMenu/AvatarMenu.jsx'
import './NavBar.css'

const NAV_LINKS = [
    { to: '/feed', label: 'Feed' },
    { to: '/timeline', label: 'Timeline' },
    { to: '/people', label: 'People' },
];
export function NavBar({ user }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') ?? ''

    const handleSearch = (e) => {
        const value = e.target.value
        const params = new URLSearchParams()
        if (value) params.set('q', value)
        navigate(`${pathname}?${params.toString()}`, { replace: true })// cada keystroke reemplaza la entrada anterior en lugar de añadir una nueva.
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // El param ya está en la URL porque handleSearch lo actualiza en cada keystroke
    }

    const handleClear = () => {
        const params = new URLSearchParams(searchParams)
        params.delete('q')
        navigate(`${pathname}?${params.toString()}`, { replace: true })
    }

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

            <form role="search" onSubmit={handleSubmit} className="nav-bar__search">
                <Input
                    variant="icon"
                    placeholder="Search people, posts..."
                    id="navbar-search"
                    label="Search"
                    value={query}
                    onChange={handleSearch}
                    onClear={handleClear}
                />
            </form>

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