// pages/ComingSoonPage.jsx
import { Link } from 'react-router'
import { Sparkles } from 'lucide-react'
import './ComingSoonPage.css'

export default function ComingSoonPage({
    feature = 'This feature',
    tagline = "We're still playing cupid on this one. Check back soon!",
}) {
    return (
        <section className="coming-soon card">
            <Sparkles className="coming-soon__icon" size={40} aria-hidden="true" />
            <h1 className="coming-soon__title">{feature} is on its way</h1>
            <p className="coming-soon__text">{tagline}</p>
            <Link to="/feed" className="coming-soon__link">
                Back to the feed
            </Link>
        </section>
    )
}