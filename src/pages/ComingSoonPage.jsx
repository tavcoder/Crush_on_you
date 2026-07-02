// pages/ComingSoonPage.jsx
import { useNavigate } from 'react-router'

export default function ComingSoonPage({ feature }) {
    const navigate = useNavigate()

    return (
        <div className="coming-soon">
            <h1>{feature}</h1>
            <p>This feature is under construction.</p>
            <button onClick={() => navigate(-1)}>
                Go back
            </button>
        </div>
    )
}