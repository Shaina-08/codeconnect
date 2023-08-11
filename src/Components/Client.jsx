import React from 'react'

import Avatar, { ConfigProvider } from 'react-avatar';



const Client = ({username}) => {
  
  return (
    <div className="client">
      <ConfigProvider colors={['brown', '#4A3729', '#3C280D']}>

    <Avatar  name={username} size={70}  round="40%" />
      </ConfigProvider>
      
     
      <span className="userName">{username}</span>
    </div>
  )
}

export default Client;