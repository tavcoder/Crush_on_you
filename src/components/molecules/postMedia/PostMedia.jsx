import { getMetadataFormat } from '../../../utils/formatUtils.js'

import './PostMedia.css'

export function PostMedia({ img, metadata }) {

    return (
        <div className='post-media'>
            {img && <div className='post-media__images'>
                {img.map((item, index) => (
                    <img key={`img-${index}`} className='post-media__img'
                        src={`${item}`}
                        alt={`Post image ${index + 1} of ${img.length}`}
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