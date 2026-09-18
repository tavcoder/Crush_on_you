import { Heart } from "lucide-react";
import "./Hearts.css"

export function Hearts({length = 20}) {
    return (
        <div className="hearts">

            {Array.from({ length }, (_, i) => (
                <Heart key={i} className={`hearts__heart hearts__heart--${(i % 3) + 1}`} />
            ))}
        </div>
    )
}   
