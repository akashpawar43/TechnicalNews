import React from 'react'
import loading from './loading.gif'

export default function Spinner() {
  return (
    <div className=' flex justify-center'>
      <img src={loading} alt="Loading" />
    </div>
  )
}
