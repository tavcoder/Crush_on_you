import { Home, Search, MessageCircle, User } from "lucide-react";
import { IconButton } from "../../ui/iconButton/IconButton.jsx";
import { FloatButton } from "../../ui/floatButton/FloatButton.jsx";
import './BottomNav.css'

export function BottomNav() {
    const isHome = true;
    return (
        <nav className="bottom-nav">
            <IconButton icon={<Home fill={isHome ? "currentColor" : "none"} />} isPressed={isHome} direction="column">Home</IconButton>
            <IconButton icon={<Search />} direction="column">Search</IconButton>
            <FloatButton />
            <IconButton icon={<MessageCircle />} direction="column">Messages</IconButton>
            <IconButton icon={<User />} direction="column" >Profile</IconButton>
        </nav>
    )
}