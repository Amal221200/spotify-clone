import React from 'react'
import Sidebar from './Sidebar'

const Information = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='hidden h-full flex-1 gap-x-4 sm:flex'>
            <Sidebar />
            <div className='h-full flex-1'>
                {children}
            </div>
        </div>
    )
}

export default Information