import React from 'react'

function Footer() {
  return (
    <footer className="text-white flex justify-center p-4 items-center bg-gray-900/50 backdrop-blur-md">
        <p className="text-center">Copyright &copy; {new Date().getFullYear()} BuyMeChai - All rights reserved</p>
    </footer>
  )
}

export default Footer