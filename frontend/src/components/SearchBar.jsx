import React from 'react'

const SearchBar = () => {
  return (
    <div class="input-box">
      <i class="uil uil-search"></i>
      <input type="text" placeholder="Search here..." />
      <button class="button">Search</button>
    </div>
  );
}

export default SearchBar