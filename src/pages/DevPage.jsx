// pages/DevPage.jsx
import { UserInfo } from "../components/molecules/userInfo/UserInfo.jsx"
import { PostMedia } from "../components/molecules/postMedia/PostMedia.jsx"
import { PostStats } from "../components/molecules/postStats/PostStats.jsx"
import { IconButton } from "../components/ui/iconButton/IconButton.jsx"
import { RoundButton } from "../components/ui/roundButton/RoundButton.jsx"
import { usersData } from "../services/mocks/users.mock.js"
import { postsData } from "../services/mocks/post.mock.js"

export function DevPage() {
    const userName = `${usersData[0]?.userName ?? ""} ${usersData[0]?.userSurName ?? ""}`;
    const userNick = usersData[0].userNick;
    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* <h2>UserInfo</h2>
            <UserInfo
                user={usersData[0]}
                avatarSize="md"
                primaryText={userName}
                secondaryText="14 Aug at 4:21 PM"
                direction="row"
                action={<IconButton
                    icon="..."
                    variant="ghost"
                    ariaLabel="Post options" />}
            />

            <UserInfo
                user={usersData[0]}
                avatarSize="md"
                primaryText={userNick}
                secondaryText="Recently active"
                direction="row"
                action={<RoundButton />}
            />

            <UserInfo
                user={usersData[0]}
                avatarSize="lg"
                primaryText={userName}
                secondaryText="Bremen, Germany"
                direction="column"
            />

            <PostStats
                stats={postsData[0].stats}
                isLiked={postsData[0].isLiked}
                isBookmarked={postsData[0].isBookmarked}
            />*/}

            <PostMedia
                img={postsData[0].images}
                profileDetails={postsData[0].profileDetails}
                content={postsData[0].content}
            />
        </div>


    )
}