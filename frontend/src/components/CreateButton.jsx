import React from 'react'

const CreateButton = () => {
  return (
    <button className='border px-5 py-2.5 rounded-2xl bg-blue-500 text-white hover:shadow-md transition duration-300'>
    <i class="fas fa-plus" ></i>
    <span className="ml-2">Create new vehicle</span>
    </button>
  )
}

export default CreateButton
