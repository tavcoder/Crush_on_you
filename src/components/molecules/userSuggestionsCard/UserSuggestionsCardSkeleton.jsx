//UserSuggestionsCardSkeleton
import { SkeletonBase } from "../../ui/skeletons/SkeletonBase";

export function UserSuggestionsCardSkeleton() {
    return (<article className='card suggestions-card' aria-busy="true" aria-label="Loading suggestions info">
        {/* Header: Avatar + UserNick + UserFollowers */}
        <div className="user-info" >
            <SkeletonBase variant="avatar" />
            <div className="user-info__text">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <SkeletonBase variant="title" width="120px" />
                    <SkeletonBase variant="text" width="80px" />
                </div>
            </div>
        </div>

    </article>
    );
}
