
const Sidebar = () => {
    return (
        <div className='hidden h-full md:block md:flex-[0.3_0.3_0] lg:flex-[0.5_0.5_0] xl:flex-1'>
            <div className="flex h-full flex-col justify-between">
                <img src="/spotify.svg" alt="spotify" width={80} />
                <img src="/profile.png" alt="" width={35} />
            </div>
        </div>
    )
}

export default Sidebar