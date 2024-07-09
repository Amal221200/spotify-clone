
const Sidebar = () => {
    return (
        <div className='hidden h-full md:block md:flex-none xl:flex-1'>
            <div className="flex h-full flex-col justify-between">
                <img src="/spotify.svg" alt="spotify" width={80} />
                <img src="/profile.png" alt="" width={35} />
            </div>
        </div>
    )
}

export default Sidebar