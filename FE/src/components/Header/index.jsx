import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Wrapper, Container, ProductsBox, ProductsDropBox, SearchBox, SearchInnerBox, SearchDropBox, IconUl } from './style'
import { HEADER_PRODUCTS , HEADER_ICONS, SEARCH_TOOLTIPS } from '../../constants/header';
import { Button } from '@components/Button';

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Link className='menu' to='/'>
          <FontAwesomeIcon icon={faBars} />
        </Link>
        <Link className='logo' to='/'><span>stack overflow</span></Link>
        <ProductsBox>
          <Button primary='Linkbutton' label='Products'>Products</Button>
          <ProductsDropBox>
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
          </ProductsDropBox>
        </ProductsBox>
        <SearchBox>
          <SearchInnerBox>
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
                  <Button label='Ask a questio' size='small' />
                  <Link>Search help</Link>
              </li>
              </SearchDropBox>
          </SearchInnerBox>
        </SearchBox>
        <IconUl>
          <li><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} /></li>
          <li>
            <Link className='profile' to='/'>
              <img src="../../../public/initialProfile.png" alt='profile' />
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