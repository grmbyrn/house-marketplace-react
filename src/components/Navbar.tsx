/// <reference types="vite-plugin-svgr/client" />

import OfferIcon from '../assets/svg/localOfferIcon.svg?react'
import ExploreIcon from '../assets/svg/exploreIcon.svg?react'
import PersonOutlineIcon from '../assets/svg/personOutlineIcon.svg?react'
import {useNavigate, useLocation} from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const pathMatchRoute = (route: string) => {
        if(route === location.pathname){
            return true
        }
    }
  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
            <li className="navbarListItem" onClick={() => navigate('/')}>
                <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
            </li>
            <li className="navbarListItem" onClick={() => navigate('/offers')}>
                <OfferIcon fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                <p className={pathMatchRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offers</p>
            </li>
            <li className="navbarListItem" onClick={() => navigate('/profile')}>
                <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
            </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar