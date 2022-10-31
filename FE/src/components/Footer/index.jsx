import React from 'react' 
import { Wrapper, Container, InnerBox, ListWrap, List } from './style'
import { FOOTER_LIST, SNS_LIST } from '../../constants/footer';

const { STACK_OVERFLOW, PRODUCTS, COMPANY, STACK_EXCHANGE_NETWORK } = FOOTER_LIST

const Footer = () => {
  return (
    <Wrapper>
       <Container>
          <InnerBox className='logo'>
            Logo
          </InnerBox>
          <InnerBox className='sitemap'>
            {[STACK_OVERFLOW, PRODUCTS, COMPANY, STACK_EXCHANGE_NETWORK].map((list, i)=>{
              return (
                <ListWrap key={i}>
                  {
                    list.map((title, i)=>{
                      return (
                        <List key={i}>{title.name}</List>
                      ) 
                    })
                  }
                </ListWrap>
              )
            })}
        </InnerBox>
        <InnerBox direction='column' className='sns'>
          <ListWrap className='sns'>
            {SNS_LIST.map((sns, i)=>{
              return (
                <List key={i}>{sns.name}</List>
              ) 
            })}
          </ListWrap>
          <ListWrap className='sns'>
            <List>Site design / logo © 2022 Stack Exchange Inc; user<br />contributions licensed under CC BY-SA. rev 2022.10.26.42989</List>
          </ListWrap>
        </InnerBox>
       </Container>
    </Wrapper>
  )
}

export default Footer