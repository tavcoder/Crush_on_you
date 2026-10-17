import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { getMetadataFormat } from '../../../utils/formatUtils.js'
import './PostMedia.css'

/** @typedef {import('../../../services/contracts/types.js').ProfileDetails} ProfileDetails */

/**
+ * @param {Object} props
+ * @param {string[]} [props.images]
+ * @param {ProfileDetails} [props.metadata]
+ */

export function PostMedia({ images, metadata }) {
    const [failedImages, setFailedImages] = useState(() => new Set())

    const handleImageError = (src) => {
        setFailedImages((prev) => new Set(prev).add(src))
    }

    const renderImage = (src, alt, key) => {
        if (failedImages.has(src)) {
            return (
                <div
                    key={key}
                    className='post-media__img post-media__img--fallback'
                    role="img"
                    aria-label="Image unavailable"
                >
                    <ImageOff aria-hidden="true" />
                    <span className='post-media__fallback-text'>Image unavailable</span>
                </div>
            )
        }

        return (
            <img
                key={key}
                className='post-media__img'
                src={src}
                alt={alt}
                onError={() => handleImageError(src)}
            />
        )
    }

    return (
        <div className='post-media'>

            {images && images.length > 0 && (
                <div className='post-media__images'>
                    {images.length > 1
                        ? images.map((item, index) =>
                            renderImage(item, `Post image ${index + 1} of ${images.length}`, item)
                        )
                        : renderImage(images[0], 'Post image', images[0])}
                </div>
            )}

            {metadata && (
                <div className='post-media__profile-details'>
                    {Object.entries(metadata).map(([key, value]) => (
                        <div className='post-media__detail' key={key}>
                            <span className='post-media__category'>{getMetadataFormat(key)}</span>
                            <span className='post-media__category-content'>{value}</span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}