import React from 'react'

const SearchBar = () => {
  return (
    <div className='bg-white border border-gray-200 py-2.5 px-4 shadow-sm rounded-xl text-lg'>
      <form>
        <div className='flex'>
            <div className=''>
                <input type="text" placeholder="'SD69 LHR','AL25 DHM' or 'BC24 KDM' "/>
            </div>
            <div className=''>
                <button type='submit'>Submit</button>
            </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
