import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { JOIN_ICONS } from '../../constants/user';

import { Title, Ul, Info } from './style';

const JoinInfo = () => {
  return (
    <>
        <Title>Join the Stack Overflow community</Title>
        <Ul>
            {
            JOIN_ICONS.map((icons, i)=>{
                const { contents, icon } = icons
                return (
                <li key={i}>
                    <FontAwesomeIcon className='icon' role="menuitem" title={contents} icon={icon} />
                    {contents}
                </li>
                )
            })}
        </Ul>
        <Info>
            <p>Collaborate and share knowledge with a private group for FREE.</p>
            <p><Link>Get Stack Overflow for Teams free for up to 50 users.</Link></p>
        </Info>
    </>
  )
}

export default JoinInfo