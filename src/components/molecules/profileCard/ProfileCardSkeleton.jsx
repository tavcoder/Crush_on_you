//ProfileCardSkeleton
import { SkeletonBase } from "../../ui/skeletons/SkeletonBase";

export function ProfileCardSkeleton() {
    return (<article className='card profile-card' aria-busy="true" aria-label="Loading profile info">
        {/* Header: Avatar + UserFullName + UserLocation */}
        <div className="user-info" >
            <SkeletonBase variant="avatar" />
            <div className="user-info__text">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <SkeletonBase variant="title" width="120px" />
                    <SkeletonBase variant="text" width="80px" />
                </div>
            </div>
        </div>

        {/* Content: UserStats */}
        <dl className="user-stats">
            <div className="user-stats__item">
                <dt>Posts</dt>
                <dd><SkeletonBase variant="text" /></dd>
            </div>
            <div className="user-stats__item">
                <dt>Followers</dt>
                <dd><SkeletonBase variant="text" /></dd>
            </div>
            <div className="user-stats__item">
                <dt>Following</dt>
                <dd><SkeletonBase variant="text" /></dd>
            </div>
        </dl>

    </article>
    );
}
