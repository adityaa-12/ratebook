import React from 'react'

const Loading: React.FC = () => {
    return (
        <div>
            <div id="loader" className='border-blue-500 border-t-transparent rounded-full w-10 h-10 border-4 animate-spin mx-auto my-36'></div>
        </div>  
    )
}

export default Loading
