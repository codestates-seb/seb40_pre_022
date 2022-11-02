import React from 'react'
import { Link } from 'react-router-dom';
import { Wrapper, Container } from './style'
import { HEADER_PRODUCTS , HEADER_ICONS, SEARCH_TOOLTIPS } from '../../constants/header';

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Link to='/'>stack<strong>overflow</strong></Link>
        <div>
          <button>Products</button>
          <ul>
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
          </ul>
        </div>
        <div>
          <div>
              <input type='text' placeholder='Search...' />
              <ul>
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
                  <button>Ask a question</button>
                  <Link>Search help</Link>
              </li>
              </ul>
          </div>
        </div>
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