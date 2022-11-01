import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';

import { Wrapper, Button } from './style'

const Sns = () => {
  return (
    <Wrapper>
        <Button><FontAwesomeIcon className='icon' icon={faGoogle} />Log in with Google</Button>
        <Button><FontAwesomeIcon className='icon' icon={faGithub} />Log in with GitHub</Button>
        <Button><FontAwesomeIcon className='icon' icon={faSquareFacebook} />Log in with Facebook</Button>
    </Wrapper>
  )
}

export default Sns