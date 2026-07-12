import { useState, useRef } from "react";
import { X, Image, Paperclip, Hash, Radio, AtSign, Globe, Users } from "lucide-react";
import { Avatar } from '../../ui/avatar/Avatar.jsx'
import { Button } from '../../ui/button/Button.jsx'
import { IconButton } from '../../ui/iconButton/IconButton.jsx'
import { SelectButton } from '../../ui/selectButton/SelectButton.jsx'
import { PostMedia } from '../../molecules/postMedia/PostMedia.jsx'
import { ALLOWED_FILE_TYPES } from '../../../utils/validateUtils.js'
import { usePostMedia } from '../../../hooks/usePostMedia.jsx'
import './CreatePost.css'

// TODO: cuando la API soporte upload real, cambiar createPost a usar FormData
// y ajustar la clave ("files" vs "file") según el backend.
// Por ahora, el estado local actualiza correctamente, pero la imagen se rompe
// porque el backend no recibe los archivos como multipart/form-data.

export function CreatePost({ user, onPostCreated, isSubmitting = false }) {
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState('public');
    const inputRef = useRef(null);
    const { error, handleFileChange, handleRemoveFile, canAddMore, selectedFiles, setError, setSelectedFiles, previewUrls } = usePostMedia();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (!content.trim() && selectedFiles.length === 0) return;
        onPostCreated({
            content: content.trim(),
            visibility,
            files: selectedFiles,
        });
        setContent('');
        setSelectedFiles([]);
        setError(null)

    };

    const handleButton = () => {
        inputRef.current?.click();
    };

    const selectOptions = [
        { value: "public", label: "Public", icon: <Globe /> },
        { value: "friends", label: "Best friends", icon: <Users /> }
    ];

    const handleChange = (_name, value) => {
        setVisibility(value);
    };
    const isDisabled = isSubmitting;

    return (
        <form className="card create-post" onSubmit={handleSubmit}>
            <section className="create-post__header">
                <Avatar user={user} avatarSize="md" />
                <textarea
                    className="create-post__header-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    id="create-post-textarea"
                    name="create-post"
                    rows={1}
                    aria-label="Post content"
                    disabled={isDisabled}
                />
            </section>

            {selectedFiles.length > 0 && (
                <div className="create-post__previews">
                    {previewUrls.map((url, i) => (
                        <div key={url} className="create-post__preview">
                            <img src={url} alt={`Preview ${i + 1}`} />
                            <button
                                type="button"
                                onClick={() => handleRemoveFile(i)}
                                aria-label={`Remove image ${i + 1}`}
                                disabled={isDisabled}
                                className="btn-reset create-post__preview-remove"
                            >
                                <X />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="create-post__error" role="alert">{error}</p>}

            <section className="create-post__actions">
                <div
                    role="toolbar"
                    aria-label="Post formatting tools"
                >
                    <div role="group" aria-label="Media uploads">
                        <label className="sr-only" htmlFor="create-post-file-input">
                            Upload images
                        </label>
                        <input id="create-post-file-input"
                            ref={inputRef}
                            type="file"
                            accept={ALLOWED_FILE_TYPES.join(',')}
                            className="sr-only"
                            tabIndex="-1"
                            onChange={handleFileChange}
                        />

                        <IconButton
                            onClick={handleButton}
                            icon={<Image />}
                            textVisibility="responsive-hidden"
                            direction="row"
                            disabled={!canAddMore}
                            tooltip={canAddMore ? "" : "For now, only one image can be uploaded per post."}
                            aria-label="Upload image" >
                            Image
                        </IconButton>

                        <IconButton icon={<Paperclip />}
                            textVisibility="responsive-hidden"
                            direction="row"
                            aria-label="Upload attachment"
                            disabled
                            tooltip="Atachment coming soon" >Atachment</IconButton>
                        <IconButton icon={<Radio />}
                            textVisibility="responsive-hidden"
                            direction="row"
                            aria-label="Start live"
                            disabled
                            tooltip="Live coming soon" >Live</IconButton>
                        <IconButton icon={<Hash />}
                            textVisibility="responsive-hidden"
                            direction="row"
                            aria-label="Insert hashtag"
                            disabled
                            tooltip="Hashtag coming soon" >Hashtag</IconButton>
                        <IconButton icon={<AtSign />}
                            textVisibility="responsive-hidden"
                            direction="row" aria-label="Insert mention"
                            disabled
                            tooltip="Mention coming soon" >Mention</IconButton>
                        <SelectButton
                            name="visibility"
                            label="public"
                            options={selectOptions}
                            onChange={handleChange} />
                    </div>
                </div>
            </section>
            <Button
                className="create-post__button"
                type="submit"
                disabled={isDisabled || (!content.trim() && selectedFiles.length === 0)}
            >
                {isSubmitting ? "Posting..." : "Post"}
            </Button>
        </form >
    )
}