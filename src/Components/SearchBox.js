"use client";

import React from 'react'

const SearchBox = () => {
  return (
    <>
        <div id='search-box'>

            <input type='text' suppressHydrationWarning={true} placeholder="... جستجوی نماد"/>
            <button suppressHydrationWarning={true}><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
    </>
  )
}

export default SearchBox