import React from 'react';
import './noitems.css';
import noitem from '../../asserts/images/no-item-found-here.png'

export const NoItems = () => {
  return (
    <div className='noitems'>
       <img src={noitem}/>
    </div>
  )
}
