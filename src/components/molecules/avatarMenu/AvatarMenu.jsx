import { useState, useRef, useCallback, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { UserAuthContext } from "../../../context/UserAuthContext.jsx";
import { useDismissible } from '../../../hooks/useDismissible.js'
import { Avatar } from '../../ui/avatar/Avatar.jsx'
import { ConfirmDialog } from '../../ui/overlay/ConfirmDialog.jsx'
import './AvatarMenu.css'

export function AvatarMenu({ user }) {
    const context = useContext(UserAuthContext);
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const close = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        if (!isOpen) return;

        const firstMenuItem = menuRef.current?.querySelector('[role="menuitem"]');

        firstMenuItem?.focus();
    }, [isOpen]);


    const handleLogoutClick = () => {
        close();
        setIsLogoutConfirmOpen(true);
    };

    const handleConfirmLogout = () => {
        setIsLogoutConfirmOpen(false);
        context.logout();
    };

    const handleCancelLogout = () => {
        setIsLogoutConfirmOpen(false);
    };



    const handleMenuKeyDown = (event) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
            return;
        }
        event.preventDefault();
        const items = [...menuRef.current.querySelectorAll('[role="menuitem"]')];

        const currentIndex = items.indexOf(document.activeElement);
        
        const nextIndex = event.key === 'ArrowDown'
            ? (currentIndex + 1) % items.length
            : (currentIndex - 1 + items.length) % items.length;

        items[nextIndex].focus();
    };

    useDismissible({
        isOpen,
        onClose: close,
        triggerRef: buttonRef,
        contentRef: menuRef,
    });

    const menuItems = [
        { type: 'link', to: '/profile', label: 'Profile', state: { from: location.pathname } },
        { type: 'link', to: '/settings', label: 'Settings', state: null },
        { type: 'action', label: 'Logout', variant: 'danger', state: null }
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
                    onKeyDown={handleMenuKeyDown}
                >
                    {menuItems.map((item) => {
                        if (item.type === 'link') {
                            return (
                                <li key={item.to} role="none">
                                    <Link
                                        to={item.to}
                                        state={item.state}
                                        role="menuitem"
                                        className="avatar-menu__item"
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
                                        onClick={handleLogoutClick}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            );
                        }
                    })}
                </ul>
            )}

            <ConfirmDialog
                isOpen={isLogoutConfirmOpen}
                title="Logout"
                message="Are you sure you want to log out?"
                confirmLabel="Logout"
                cancelLabel="Cancel"
                variant="danger"
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
                triggerRef={buttonRef}
            />
        </div>
    )
}