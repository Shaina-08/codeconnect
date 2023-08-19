import React from 'react'

import Avatar, { ConfigProvider } from 'react-avatar';



const Client = ({username}) => {
  
  return (
    <div className="client">
      <ConfigProvider colors={['#791111',  '#ccb782']}>

    <Avatar  name={username} size={60}  round="35%" />
      </ConfigProvider>
      
     
      <span className="userName">{username}</span>
    </div>
  )
}

export default Client;