import { SearchIcon } from "lucide-react"

const SearchBox = ({ handleInput, value }: { handleInput: (val: string) => void; value: string }) => {
    return (
        <div className="mb-3 flex items-center gap-x-1 rounded bg-white/10 p-2">
            <input value={value} type="text" placeholder="Search Song, Artist" className="flex-1 bg-transparent text-sm font-medium outline-none" onInput={(e) => handleInput(e.currentTarget.value.toLowerCase())} />
            <SearchIcon size={18} color="rgba(255 255 255 / 0.5)" className="cursor-pointer" />
        </div>
    )
}

export default SearchBox