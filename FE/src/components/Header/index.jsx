import React from 'react'
import { Link } from 'react-router-dom';
import { Wrapper, Container, ProductsBox, ProductsDropBox, SearchBox, SearchInnerBox, SearchDropBox } from './style'
import { HEADER_PRODUCTS , HEADER_ICONS, SEARCH_TOOLTIPS } from '../../constants/header';
import { Button } from '@components/Button';

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Link className='logo' to='/'><span>stack overflow</span></Link>
        <ProductsBox>
          <Button label='Products'>Products</Button>
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
                  <Button label='Products' size='small'>Ask a questio</Button>
                  <Link>Search help</Link>
              </li>
              </SearchDropBox>
          </SearchInnerBox>
        </SearchBox>
        <ul>
          {
          HEADER_ICONS.map((icons, i)=>{
            const { title, icon } = icons
            return (
              <li key={i}>
                <span role="menuitem" title={title}>{icon}</span>
              </li>
            )
          })}
        </ul>
      </Container>
    </Wrapper>
  )
}

export default Header