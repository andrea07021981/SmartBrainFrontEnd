import React from 'react';

const FaceRegnition = ({ imageUrl }) => {
    return (
        <div className='center ma '>
            <div className='absolute mt2'>
                {/* AUTO avoit stretch of image */}
                <img alt='image' src={imageUrl} width='500px' height='auto'/>
            </div>
        </div>
    )
}

export default FaceRegnition;