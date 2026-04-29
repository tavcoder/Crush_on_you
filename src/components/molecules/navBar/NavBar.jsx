/*NavBar.jsx*/
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'
import { Heart, Bell, Search } from "lucide-react";
import { Input } from '../../ui/input/Input.jsx'
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
        navigate(`${pathname}?${params.toString()}`)
    }

    const navItems = NAV_LINKS.map(({ to, label }) => {
        const isActive = pathname.pathname === to;
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

            <Link to="/" className="nav-bar__logo" aria-label="Crush On You — go to home">
                <div className="nav-bar__logo-icon"><Heart /></div>
                <span className="nav-bar__logo-text">Crush On You</span>
            </Link>

            <form role="search" onSubmit={handleSearch} className="nav-bar__search">
                <Input
                    variant="icon"
                    placeholder="Search people, posts..."
                    id="navbar-search"
                    label="Search"
                    value={query}
                    onChange={handleSearch}
                    className="nav-bar__search"
                />
            </form>

            <div className='nav-bar__actions'>
                <div className='nav-bar__links'>{navItems}</div>

                <IconButton
                    icon={<Search />}
                    variant="outlined"
                    ariaLabel="Open search mobile"
                    className='nav-bar__search-mobile' />

                <IconButton
                    icon={<Bell />}
                    badge={true}
                    variant="outlined"
                    ariaLabel="Open notifications"
                />

                <AvatarMenu user={user} />
            </div>
        </nav>

    )
}