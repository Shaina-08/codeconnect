import React, {useState} from 'react';
import {v4} from 'uuid';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();
  const[roomId, setRoomId] = useState('');
  const[username, setUsername] = useState('');

  const createNewRoom =(e) => {
    e.preventDefault();
    const id = v4();
    setRoomId(id)
    toast.success('Created your new room ')
  }

  const joinRoom =() => {
    if(!roomId || !username){
      toast.error('ROOM ID & username is required')
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });         
  };


  const handleInputEnter =(e) =>{
    
    if(e.code === 'Enter'){
      joinRoom();
    }
  }
  return (
    <div className="homePagewrapper">
      <div className="formwrapper">
        <div className="someStyle">
        <img className="homeLogo" src="icons8-metamask-logo-50.png" alt="logo-image" />
        <h1 className='styling'>|</h1>
        <h1 className='code'>Let's Code</h1>
        <h4 className='mainLabel'>Paste invitation ROOM ID</h4>
        </div>

      <div className="form">
        <input 
        type="text" 
        className="inputBox"
        placeholder='ROOM ID'
        onChange={(e) => setRoomId(e.target.value)}
        value={roomId}
        onKeyUp={handleInputEnter} 


  
        />
        <input 
        type="text" 
        className="inputBox"
        placeholder='USERNAME'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        onKeyUp={handleInputEnter} 
        />
        <button className="btn joinBtn"   onClick={joinRoom}>Join</button>
        <span className="information">
          Create ROOM ID
        <a onClick={createNewRoom} href="" className="createNewBtn">
          new room
        </a>
        </span>
        </div>
      </div>

    <footer>
      <h4>
        React project by &nbsp; <a href="">Shaina</a>
      </h4>
    </footer>
    </div>
    
  )
}

export default Home