import React from 'react'
import loading from '../../images/Spiromaniac.gif'
export default function LoadingScreen() {
  return (
    <div className='loading d-flex justify-content-center align-items-center'>
        <img src={loading} width={200} alt="loading" />
    </div>
  )
}
