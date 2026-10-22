/*CreatePost.jsx*/
import { useState, useRef, useEffect } from "react";
import { X, Info, Image, Paperclip, Hash, Radio, AtSign, Globe } from "lucide-react";
import { Avatar } from '../../ui/avatar/Avatar.jsx'
import { Button } from '../../ui/button/Button.jsx'
import { IconButton } from '../../ui/iconButton/IconButton.jsx'
import { SelectButton } from '../../ui/selectButton/SelectButton.jsx'
import { ALLOWED_FILE_TYPES } from '../../../utils/validateUtils.js'
import { usePostMedia } from '../../../hooks/usePostMedia.js'
import './CreatePost.css'

const TEXT_REQUIRED_HINT = "Add some text to publish your post."
const SUBMIT_ERROR = "Couldn't publish your post. Please try again."

/**
 * @param {Object} props
 * @param {import('../../../services/contracts/types.js').User} props.user
 * @param {(
 *   data: { content: string, visibility: string, files: File[] },
 *   options?: { onSuccess?: () => void, onError?: (error: unknown) => void }
 * ) => void} props.onPostCreated Normalmente el `mutate` de `useCreatePost`:
 *   el segundo argumento son callbacks por llamada.
 * @param {boolean} [props.isSubmitting]
 */
export function CreatePost({ user, onPostCreated, isSubmitting = false }) {
    const [content, setContent] = useState('');
    // módulo
    // TODO: [DEUDA TÉCNICA] "Best friends" no existe en el backend. Restaurar la opción
    // y el estado `visibility` cuando haya soporte.
    const POST_VISIBILITY = 'public'

    const selectOptions = [
        { value: "public", label: "Public", icon: <Globe /> },
    ]

    const [submitError, setSubmitError] = useState(null);
    const inputRef = useRef(null);
    const textareaRef = useRef(null);
    const { error, handleFileChange, handleRemoveFile, canAddMore, selectedFiles, setError, setSelectedFiles, previewUrls } = usePostMedia();

    const trimmedContent = content.trim();
    const hasText = trimmedContent.length > 0;
    // El mensaje solo aparece cuando ya hay imagen y falta el texto
    const needsText = selectedFiles.length > 0 && !hasText;
    const formError = error ?? submitError;

    // Con una imagen elegida, el siguiente paso es el texto: se lleva allí el foco.
    // Va en un efecto (no en el onChange del input) para que el aviso y el
    // aria-describedby ya estén en el DOM cuando el textarea recibe el foco.
    useEffect(() => {
        if (selectedFiles.length > 0) textareaRef.current?.focus();
    }, [selectedFiles.length]);

    const resetForm = () => {
        setContent('');
        setSelectedFiles([]);
        setError(null);
        setSubmitError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mismo criterio que el `disabled` del botón: protege también
        // un submit que no pase por él
        if (isSubmitting || !hasText) return;
        setSubmitError(null);
        onPostCreated(
            { content: trimmedContent, visibility: POST_VISIBILITY, files: selectedFiles },
            {
                // Se limpia solo si el post se creó: si falla, se conserva lo escrito
                onSuccess: resetForm,
                onError: () => setSubmitError(SUBMIT_ERROR),
            }
        );
    };

    const handleButton = () => {
        inputRef.current?.click();
    };


    const isDisabled = isSubmitting;

    return (
        <form className="card create-post" onSubmit={handleSubmit}>
            <section className="create-post__header">
                <Avatar user={user} avatarSize="md" />
                <div className="create-post__field">
                    <textarea
                        ref={textareaRef}
                        className={`create-post__header-input${needsText ? ' create-post__header-input--needs-text' : ''}`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        id="create-post-textarea"
                        name="create-post"
                        rows={1}
                        aria-label="Post content"
                        required
                        aria-describedby={needsText ? "create-post-hint" : undefined}
                        disabled={isDisabled}
                    />
                    {needsText && (
                        <p id="create-post-hint" className="create-post__hint">
                            <Info aria-hidden="true" />
                            {TEXT_REQUIRED_HINT}
                        </p>
                    )}
                </div>
            </section>

            {/* Región live siempre montada: un lector de pantalla anuncia de forma
                fiable los cambios de una región que ya existía antes del cambio */}
            <p className="sr-only" role="status">{needsText ? TEXT_REQUIRED_HINT : ''}</p>

            {(selectedFiles.length > 0 || formError) && (
                <div className="create-post__extras">
                    {selectedFiles.length > 0 && (
                        <div className="create-post__previews">
                            {previewUrls.map((url, i) => (
                                <div key={url} className="create-post__preview">
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(i)}
                                        aria-label={`Remove image ${i + 1}`}
                                        disabled={isDisabled}
                                        className="btn-reset create-post__preview-remove"
                                    >
                                        <X />
                                    </button>
                                    <img src={url} alt={`Preview ${i + 1}`} />

                                </div>
                            ))}
                        </div>
                    )}

                    {formError && (
                        <p className="create-post__error" role="alert">{formError}</p>
                    )}
                </div>
            )}

            <section className="create-post__actions">
                <div role="toolbar" aria-label="Post formatting tools">
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
                            tooltip={canAddMore ? undefined : "For now, only one image can be uploaded per post."}
                            ariaLabel="Upload image" >
                            Image
                        </IconButton>

                        <IconButton icon={<Paperclip />}
                            textVisibility="responsive-hidden"
                            direction="row"
                            ariaLabel="Upload attachment"
                            disabled
                            tooltip="Attachment coming soon" >Attachment</IconButton>
                        <IconButton icon={<Radio />}
                            textVisibility="responsive-hidden"
                            direction="row"
                            ariaLabel="Start live"
                            disabled
                            tooltip="Live coming soon" >Live</IconButton>
                        <IconButton icon={<Hash />}
                            textVisibility="responsive-hidden"
                            direction="row"
                            ariaLabel="Insert hashtag"
                            disabled
                            tooltip="Hashtag coming soon" >Hashtag</IconButton>
                        <IconButton icon={<AtSign />}
                            textVisibility="responsive-hidden"
                            direction="row"
                            ariaLabel="Insert mention"
                            disabled
                            tooltip="Mention coming soon" >Mention</IconButton>
                        <SelectButton
                            name="visibility"
                            label="public"
                             options={selectOptions}
                            disabled
                            tooltip="Best friends visibility coming soon" />
                    </div>
                </div>
            </section>
            <Button
                className="create-post__button"
                type="submit"
                disabled={isDisabled || !hasText}
            >
                {isSubmitting ? "Posting..." : "Post"}
            </Button>
        </form>
    )
}