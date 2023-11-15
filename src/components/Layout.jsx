
'use client'
import React, { useEffect, useState } from 'react'

const Layout = () => {
  const [setshowNav, setSetshowNav] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  function handleResize() {
    if (innerWidth <= 640) {
      setshowNav(false);
      setIsMobile(true);
    } else {
      setshowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>Layout</div>
  )
}

export default Layout