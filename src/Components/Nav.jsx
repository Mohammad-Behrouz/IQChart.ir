"use client";


import React, { useEffect, useState } from 'react'
import Link from "next/link";
import SearchBox from './SearchBox';


export const Nav = () => {
  const [loggedIn, setLoggedIn] = useState("حساب کاربری")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [marketsAccordionOpen, setMarketsAccordionOpen] = useState(false)

  useEffect(() => {
    const fetchLogin = async () => {
      var res = await fetch("https://localhost:7282/api/Login", {
        method: "get",
        credentials: "include"
      })
      var json = await res.json()
      console.log(json.message);


      if (json.loggedIn == "y") {
        setLoggedIn(json.name.toString())
      } else if (json.loggedIn == "n") {
        setLoggedIn("حساب کاربری")
      }


    }

    // fetchLogin()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (mobileMenuOpen) {
      const scrollY = window.scrollY || window.pageYOffset
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.body.style.overflowX = 'hidden'
      document.documentElement.style.overflowX = 'hidden'
      document.body.setAttribute('data-scroll-y', scrollY.toString())
    } else {
      const scrollY = document.body.getAttribute('data-scroll-y')
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.overflowX = ''
      document.documentElement.style.overflowX = ''
      document.body.removeAttribute('data-scroll-y')
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY))
      }
    }

    return () => {
      if (typeof window === 'undefined') return;
      const scrollY = document.body.getAttribute('data-scroll-y')
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.overflowX = ''
      document.documentElement.style.overflowX = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY))
        document.body.removeAttribute('data-scroll-y')
      }
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMarketsAccordionOpen(false)
  }

  const toggleMarketsAccordion = () => {
    setMarketsAccordionOpen(!marketsAccordionOpen)
  }

  return (
    <>

      <header className="header">
        <div id='logo-and-ul-nav'>
          <img className='logo' src="/Images/IQChart_logo_rtl_white.png" alt="" />
          <ul className="desktop-nav">
            <li className='nav-li' ><Link href="/">صفحه اصلی</Link></li>
            <li className='nav-li drop-down-markets-li' style={{ cursor: 'pointer' }} >
              مارکت ها  &nbsp;<i className="fa-solid fa-chevron-down"></i>
              <div className="drop-down-markets nav-li">
                <ul>
                  <li><Link href="/Bourse"> <img src="/svg/Bourse.svg" className='svg-icon' /> بازار بورس</Link></li>
                  <li>  <Link href="Crypto"><i className='fa-brands fa-bitcoin cars-icon svg-icon' style={{ fontSize: "24px" }}></i>ارزدیجیتال</Link></li>
                  <li> <Link href="/gold"> <img src="/svg/tala.svg" className='svg-icon' />طلا</Link></li>
                  <li><Link href="/Forex"> <img src="/svg/Forex.svg" className='svg-icon' />فارکس</Link></li>
                  <li><Link href="/Cars"> <i className='fa-solid fa-cars cars-icon svg-icon' style={{ fontSize: "24px" }}></i>خودرو</Link></li>
                  <li><Link href="/Arz"> <i className='fa-solid fa-dollar-sign cars-icon svg-icon' style={{ fontSize: "24px" }}></i>بازار ارز</Link></li>
                </ul>
              </div>
            </li>
            <li className='nav-li' ><Link href="/Shop">فروشگاه</Link></li>
            <li className='nav-li' ><Link href="/Blogs">بلاگ ها</Link></li>
            {/* <li className='nav-li' ><Link href="/Plans">تعرفه ها</Link></li> */}
          </ul>
        </div>

        <div id='account-and-search-nav' className="desktop-account-nav">
          <Link href="Plan"><i className="fa-solid fa-star"></i>&nbsp; اشتراک</Link>
          <SearchBox />
          <Link href="login"><i className="fa-solid fa-user"></i>&nbsp;{loggedIn}</Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="منو"
        >
          <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></span>
        </button>

        <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}></div>

        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <img className='mobile-logo' src="/Images/IQChart_logo_rtl_white.png" alt="IQChart" />
            {/* <button className="mobile-menu-close" onClick={closeMobileMenu}>
              <i className="fa-solid fa-times"></i>
            </button> */}
          </div>

          <div className="mobile-menu-content">


            <nav className="mobile-nav-list">
              <Link href="/" className="mobile-nav-item" onClick={closeMobileMenu}>
                <i className="fa-solid fa-home"></i>
                <span>صفحه اصلی</span>
              </Link>

              <div className="mobile-nav-item mobile-accordion">
                <div className="mobile-accordion-header" onClick={toggleMarketsAccordion}>
                  <div>
                    <i className="fa-solid fa-chart-line"></i>
                    <span>مارکت ها</span>
                  </div>
                  <i className={`fa-solid fa-chevron-down accordion-icon ${marketsAccordionOpen ? 'open' : ''}`}></i>
                </div>
                <div className={`mobile-accordion-content ${marketsAccordionOpen ? 'open' : ''}`}>
                  <Link href="/Bourse" className="mobile-accordion-item" onClick={closeMobileMenu}>
                    <img src="/svg/Bourse.svg" className='svg-icon' alt="" />
                    <span>بازار بورس</span>
                  </Link>
                  <Link href="/Crypto" className="mobile-accordion-item" onClick={closeMobileMenu}>
                    <i className='fa-brands fa-bitcoin' style={{ fontSize: "20px" }}></i>
                    <span>ارزدیجیتال</span>
                  </Link>
                  <Link href="/gold" className="mobile-accordion-item" onClick={closeMobileMenu}>
                    <img src="/svg/tala.svg" className='svg-icon' alt="" />
                    <span>طلا</span>
                  </Link>
                  <Link href="/" className="mobile-accordion-item" onClick={closeMobileMenu}>
                    <img src="/svg/Forex.svg" className='svg-icon' alt="" />
                    <span>فارکس</span>
                  </Link>
                  <Link href="/Cars" className="mobile-accordion-item" onClick={closeMobileMenu}>
                    <i className='fa-solid fa-cars' style={{ fontSize: "20px" }}></i>
                    <span>خودرو</span>
                  </Link>
                  <Link href="/Arz" className="mobile-accordion-item" onClick={closeMobileMenu}>
                    <i className='fa-solid fa-dollar-sign' style={{ fontSize: "20px" }}></i>
                    <span>بازار ارز</span>
                  </Link>
                </div>
              </div>

              <Link href="/Shop" className="mobile-nav-item" onClick={closeMobileMenu}>
                <i className="fa-solid fa-store"></i>
                <span>فروشگاه</span>
              </Link>

              <Link href="/Blogs" className="mobile-nav-item" onClick={closeMobileMenu}>
                <i className="fa-solid fa-blog"></i>
                <span>بلاگ ها</span>
              </Link>

              <Link href="/Plans" className="mobile-nav-item" onClick={closeMobileMenu}>
                <i className="fa-solid fa-tags"></i>
                <span>تعرفه ها</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div style={{ width: "100%", height: "75px" }}></div>
    </>
  )
}

export default Nav;