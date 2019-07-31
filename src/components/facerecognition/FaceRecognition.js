import React from 'react';

const FaceRegnition = ({ imageUrl }) => {
    return (
        <div className='center'>
            <img alt='image' src={imageUrl}/>
        </div>
    )
}

export default FaceRegnition;