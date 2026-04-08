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
            {images && <div className='post-media__images'>
                {images.map((item, index) => (
                    <img key={`images-${index}`} className='post-media__img'
                        src={`${item}`}
                        alt={`Post image ${index + 1} of ${images.length}`}
                    />))}
            </div>}

            {metadata && <div className='post-media__profile-details'>
                {Object.entries(metadata).map(([key, value]) => (
                    <div className='post-media__detail' key={key}>
                        <span className='post-media__category'>{getMetadataFormat(key)}</span>
                        <span className='post-media__category-content'>{value}</span>
                    </div>))}
            </div>}
        </div>
    )
}