// PostCardSkeleton.jsx
import { SkeletonBase } from '../../components/ui/skeletons/SkeletonBase';

export function PeoplePageSkeleton({ count = 3 }) {
    return (

        <ul className='users-list' aria-busy="true" aria-label="Loading users" >
            {
                Array.from({ length: count }, (_, index) => (
                    <li key={index} className="post-feed__item">
                        <SkeletonBase variant="avatar" />
                        <div className="user-info__text">
                            <SkeletonBase variant="title" width="120px" />
                            <SkeletonBase variant="text" width="80px" />
                        </div>
                    </li>
                ))
            }
        </ul >

    );
}