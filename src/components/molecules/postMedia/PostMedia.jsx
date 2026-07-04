import { getMetadataFormat } from '../../../utils/formatUtils.js'
import './PostMedia.css'

/** @typedef {import('../../../services/contracts/types.js').ProfileDetails} ProfileDetails */

/**
 * @param {Object} props
 * @param {string[]} [props.images]
 * @param {ProfileDetails} [props.metadata]
 */

export function PostMedia({ images, metadata }) {

    return (
        <div className='post-media'>

            {images && images.length > 0 && (
                <div className='post-media__images'>

                    {images.length > 1 ? (
                        images.map((item, index) => (
                            <img
                                key={item}
                                className='post-media__img'
                                src={item}
                                alt={`Post image ${index + 1} of ${images.length}`}
                            />
                        ))
                    ) : (
                        <img
                            className='post-media__img'
                            src={images[0]}
                            alt='Post image'
                        />
                    )}

                </div>
            )}

            {metadata && (
                <div className='post-media__profile-details'>

                    {Object.entries(metadata).map(([key, value]) => (
                        <div
                            className='post-media__detail'
                            key={key}
                        >
                            <span className='post-media__category'>
                                {getMetadataFormat(key)}
                            </span>

                            <span className='post-media__category-content'>
                                {value}
                            </span>
                        </div>
                    ))}

                </div>
            )}

        </div>
    )
}