import { useState } from "react";
import { Image, Paperclip, Hash, Radio, AtSign, Globe, Users } from "lucide-react";
import { Avatar } from '../../ui/avatar/Avatar.jsx'
import { Input } from '../../ui/input/Input.jsx'
import { Button } from '../../ui/button/Button.jsx'
import { IconButton } from '../../ui/iconButton/IconButton.jsx'
import { SelectButton } from '../../ui/selectButton/SelectButton.jsx'
import './CreatePost.css'

export function CreatePost({ user, onPostCreated }) {
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState('public');

    const handleSubmit = () => {
        if (!content.trim()) return;
        onPostCreated({ content, visibility });
        setContent('');
    };

    const selectOptions = [
        { value: "public", label: "Public", icon: <Globe /> },
        { value: "friends", label: "Best friends", icon: <Users /> }
    ];

    return (
        <form className="card create-post" onSubmit={handleSubmit}>
            <section className="create-post__header">
                <Avatar user={user} avatarSize="md" />
                <Input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    id="create-post"
                    name="create-post"
                    className="create-post__header-input"
                />

            </section>
            <section className="create-post__actions">
                <div
                    role="toolbar"
                    aria-label="Post formatting tools"
                    aria-controls="post-textarea"
                >
                    <div role="group" aria-label="Media uploads">
                        <IconButton icon={<Image />} textVisibility="responsive-hidden" direction="row" aria-label="Upload image" >Image/Video</IconButton>
                        <IconButton icon={<Paperclip />} textVisibility="responsive-hidden" direction="row" aria-label="Upload attachment" >Atachment</IconButton>
                        <IconButton icon={<Radio />} textVisibility="responsive-hidden" direction="row" aria-label="Start live" >Live</IconButton>
                        <IconButton icon={<Hash />} textVisibility="responsive-hidden" direction="row" aria-label="Insert hashtag" >Hashtag</IconButton>
                        <IconButton icon={<AtSign />} textVisibility="responsive-hidden" direction="row" aria-label="Insert mention" >Mention</IconButton>
                        <SelectButton label="public" options={selectOptions} onChange={setVisibility} />
                    </div>
                </div>
            </section>
            <Button className="create-post__button" type="submit" >Post</Button>
        </form>
    )
}