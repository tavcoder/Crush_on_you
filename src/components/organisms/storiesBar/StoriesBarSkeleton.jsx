// StoriesBarSkeleton.jsx
import { SkeletonBase } from '../../ui/skeletonBase/SkeletonBase.jsx'
import './StoriesBar.css'

const TEXT_WIDTHS = ['36px', '44px', '40px', '52px', '36px', '48px'];

export function StoriesBarSkeleton({ count = 6 }) {
    return (
        <div className='stories-bar' aria-busy="true" aria-label="Loading Stories">
            <ul className='stories-bar__list' role='list'>
                {Array.from({ length: count }, (_, i) => (
                    <li key={i} className='user-story__item'>
                        <SkeletonBase
                            variant="avatar"
                            width="56px"
                            height="56px"
                        />
                        <SkeletonBase
                            variant="text"
                            width={TEXT_WIDTHS[i % TEXT_WIDTHS.length]}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}