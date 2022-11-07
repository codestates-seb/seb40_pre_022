import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';

import { Wrapper, Button } from './style'

const Sns = ({ value='Log in' }) => {
  return (
    <Wrapper>
        <Button><FontAwesomeIcon className='icon' icon={faGoogle} />{value} with Google</Button>
        <Button><FontAwesomeIcon className='icon' icon={faGithub} />{value} with GitHub</Button>
        <Button><FontAwesomeIcon className='icon' icon={faSquareFacebook} />{value} with Facebook</Button>
    </Wrapper>
  )
}

export default Sns