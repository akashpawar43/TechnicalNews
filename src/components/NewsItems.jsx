import React, { Component } from 'react'

export default class NewsItems extends Component {
    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <div className='flex flex-col rounded-md bg-neutral-900 h-full'>
                <div className=' bg-gray-700 rounded-lg h-48 overflow-hidden'>
                    <img className='rounded-md bg-cover' src={imageUrl ? imageUrl : "https://static.toiimg.com/thumb/msid-105757715,width-900,height-1200,resizemode-6.cms"} alt="" />
                </div>
                <div className='p-3'>
                    <p className=' text-lg font-semibold text-white truncate'>{title}</p>
                    <p className='text-gray-400'>{description}...</p>
                    <a target='_blank' href={newsUrl}>
                        <button className=" mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Details
                        </button>
                    </a>
                </div>
            </div>
        )
    }
}
