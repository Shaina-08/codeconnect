import React ,{useState , useEffect} from 'react';
import toast from'react-hot-toast';
import ACTIONS from '../Actions';
import { useRef } from 'react';
import Client from '../Components/Client';
import CodeEditorWindow from '../Components/CodeEditorWindow';
import { initSocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';



const EditorPages = () => {
  
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  

  useEffect (() =>{
       const init = async () => {
        socketRef.current = await initSocket();
        socketRef.current.on('connect_error', (err)=> handleErrors(err));
        socketRef.current.on('connect_failed', (err)=> handleErrors(err));

        function handleErrors(e){
          console.log('socket error', e);
          toast.error('Socket connection failed , try again later.');

          reactNavigator('/');
        }

        socketRef.current.emit(ACTIONS.JOIN,
        {
          roomId, 
          username: location.state?.username,
         });

         socketRef.current.on(
          ACTIONS.JOINED,
           ({clients, username, socketId}) =>{
            
            
             if(username !== location.state?.username){
              toast.success(`${username} joined the room. `);
              console.log(`${username} joined`);
             }
             
             setClients(clients);
             socketRef.current.emit(ACTIONS.SYNC_CODE, {

               value : codeRef.current, socketId,
              }
               
           );

          socketRef.current.on('disconnected',({socketId, username}) =>{
                toast.success(`${username} left the room`);
                setClients((prev) =>{
                  return prev.filter
                  (client => client.socketId !== socketId)
                })
          })

         });

       };
       init();

       return () => {
        socketRef.current.disconnect();
        socketRef.current.off('join');
        socketRef.current.off('joined');
        

       }
  }, []);

  
  
  async function copyRoomId() {
   try {
     await navigator.clipboard.writeText(roomId)
     toast.success('Room Id is copied to clipboard')
   } catch (err) {
     toast.error('COuld not copy room Id')
     console.error(err);
   }
 }


 function leaveRoom(){
     reactNavigator('/');
 }
  if(!location.state){
    
    return <Navigate to="/" />
  }

  // console.log(clients);
  
  return (
    <div className='mainWrapper'>
      <div className="side">
        <div className="sideinner">

          <div className="logoimage">
            <img  className= "imgs" src="/—Pngtree—glitter golden pattern light effect_6414641.png" alt="" />
          {/* <img src={'/images/veterinary design vet clipart puppy_8947055.png'}  className='logolog' alt="Logo" /> */}
          {/* <h1 className='style'>!</h1> */}
        <h1 className='codeget'>Let's Code</h1>
          </div>
          
          
          <h3 className="heat">ScriptSquad</h3>

          <div className="clientsList">
            {
             clients.map((client) => {
            
              return (
                <Client 
                  key={client.socketId}
                  username={client.username}
                />
              )
            })
            }

          </div>
        </div>
        <div className="someBtns">

        <button className='btn copyBtn' onClick={copyRoomId}>Copy ROOM ID</button>
        <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>
        </div>
        
      </div>

      <div className="editorWrapper">
        <div className="editorContent">

      <CodeEditorWindow socketRef= {socketRef}
      roomId={roomId}
      
      />
        </div>


      </div>

    </div>



  )
}

export default EditorPages