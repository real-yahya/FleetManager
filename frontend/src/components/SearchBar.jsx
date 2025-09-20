import React from 'react';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({searchValue, setSearchValue, onSuccess}) => {
  return (
    <div className='bg-white border border-gray-200 py-2.5 px-6 shadow-sm rounded-xl text-lg'>
      <form onSubmit={onSuccess}>
        <div className='flex gap-2'>
            <input value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}} className='flex-1 border-none outline-none cursor-pointer focus:placeholder-transparent' type="text" placeholder="'SD69 LHR', 'AL25 DHM' or 'BC24 KDM' "/>
            
        </div>
      </form>
    </div>
  )
}

export default SearchBar
