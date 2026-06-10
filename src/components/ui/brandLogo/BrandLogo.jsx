//BrandLogo.jsx
import { Link } from "react-router";
import { Heart } from "lucide-react";
import './BrandLogo.css'

export function BrandLogo({ asLink = true, size = "xs" }) {
    const content = (
        <>
            <div className="brand-logo__icon"><Heart /></div>
            <span className={`brand-logo__text brand-logo__text--${size}`}>Crush On You</span>
        </>
    )

    if (asLink) {
        return (
            <Link to="/" className="brand-logo" aria-label="Crush On You — go to home">
                {content}
            </Link>
        )
    }

    return <div className="brand-logo">{content}</div>
}