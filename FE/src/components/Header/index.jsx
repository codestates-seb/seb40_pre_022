import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faL, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Wrapper, Container, ProductsBox, ProductsDropBox, SearchBox, SearchInnerBox, SearchDropBox, IconUl } from './style'
import { HEADER_PRODUCTS , HEADER_ICONS, SEARCH_TOOLTIPS } from '../../constants/header';
import { Button } from '@components/Button';

const Header = () => {
  const [isTooltip, setIsTooltip] = useState(false)
  const [isSearchBox, setIsSearchBox] = useState(false)
  const productsTooltip = useRef()

  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside);
    return()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    }
  },[productsTooltip])

  const handleClickOutside = (e) => {
    if(productsTooltip.current && !productsTooltip.current.contains(e.target)) setIsTooltip(false)
  }

  const handleToggle = (e) => {
    if(e ==='search'){
      setIsSearchBox(!isSearchBox)
    }
    if(e === 'products'){
      setIsTooltip(!isTooltip)
    }
    console.log(isSearchBox)
  }

  return (
    <Wrapper>
      <Container>
        <Link className='menu' to='/'>
          <FontAwesomeIcon icon={faBars} />
        </Link>
        <Link className='logo' to='/'><span>stack overflow</span></Link>
        <ProductsBox>
          <Button primary='Linkbutton' label='Products' className={isTooltip ? 'active':''} onClick={()=>handleToggle('products')}>Products</Button>
          {isTooltip && <ProductsDropBox ref={productsTooltip}>
            {
            HEADER_PRODUCTS.map((product, i)=>{
              const { title, detail } = product
              return (
                <li key={i}>
                  <span>{title}</span>
                  <span>{detail}</span>
                </li>
              )
            })}
            <li><Link>About the company</Link></li>
          </ProductsDropBox>}
        </ProductsBox>
        <SearchBox>
          <SearchInnerBox className={isSearchBox ? 'active' : ''}>
              <FontAwesomeIcon className='icon' icon={faMagnifyingGlass} />
              <input type='text' placeholder='Search...' />
              <SearchDropBox>
              {SEARCH_TOOLTIPS.map((tooltip, i)=>{
                const { title, detail } = tooltip
                  return (
                    <li key={i}>
                      <span>{title}</span>
                      <span>{detail}</span>
                    </li>
                    )
              })}
              <li>
                  <Button label='Ask a question' size='small' />
                  <Link>Search help</Link>
              </li>
              </SearchDropBox>
          </SearchInnerBox>
        </SearchBox>
        <IconUl>
          <li><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} onClick={()=>handleToggle('search')} /></li>
          <li>
            <Link className='profile' to='/mypage'>
              <img src="/initialProfile.png" alt='profile' />
              <span>1</span>
            </Link>
          </li>
          {
          HEADER_ICONS.map((icons, i)=>{
            const { title, icon } = icons
            return (
              <li key={i}>
                <FontAwesomeIcon className='icon' role="menuitem" title={title} icon={icon} />
              </li>
            )
          })}
        </IconUl>
      </Container>
    </Wrapper>
  )
}

export default Header