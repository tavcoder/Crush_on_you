import { useState, useRef, useCallback, useContext } from 'react'
import { Link } from 'react-router'
import { UserAuthContext } from "../../../context/UserAuthContext.jsx";
import { useDismissible } from '../../../hooks/useDismissible.js'
import { Avatar } from '../../ui/avatar/Avatar.jsx'
import './AvatarMenu.css'

const STATIC_ITEMS = [
    { type: 'link', to: '/profile', label: 'Profile' },
    { type: 'link', to: '/settings', label: 'Settings' },
];

export function AvatarMenu({ user }) {
    const context = useContext(UserAuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const close = useCallback(() => setIsOpen(false), []);

    useDismissible({
        isOpen,
        onClose: close,
        triggerRef: buttonRef,
        contentRef: menuRef,
    });

    const menuItems = [
        ...STATIC_ITEMS,
        { type: 'action', label: 'Logout', variant: 'danger' },
    ];

    return (
        <div className='avatar-menu'>
            <button
                ref={buttonRef}
                className="btn-reset avatar-menu__trigger"
                onClick={() => setIsOpen(prev => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-label="User menu"
            >
                <Avatar user={user} isCurrentUser={true} avatarSize="sm" />
            </button>

            {isOpen && (
                <ul
                    ref={menuRef}
                    className="card avatar-menu__dropdown"
                    role="menu"
                >
                    {menuItems.map((item) => {
                        if (item.type === 'link') {
                            return (
                                <li key={item.to} role="none">
                                    <Link
                                        to={item.to}
                                        role="menuitem"
                                        className="link-reset avatar-menu__item"
                                        onClick={close}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        }
                        if (item.type === 'action') {
                            return (
                                <li key={item.label} role="none">
                                    <button
                                        role="menuitem"
                                        className={`btn-reset avatar-menu__item ${item.variant ? `avatar-menu__item--${item.variant}` : ''}`}
                                        onClick={() => { close(); context.logout() }}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
        </div>
    )
}