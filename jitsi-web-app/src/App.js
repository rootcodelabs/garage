import React, { useState } from 'react'
import { Jutsu } from 'react-jutsu'
import "./App.css"

const App = () => {
  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)
  const [password, setPassword] = useState('')

  const handleClick = event => {
    event.preventDefault()
    if (room && name) setCall(true)
  }

  return (
  // <div className="App">{call ? (
  //   <Jutsu
  //     roomName={room}
  //     displayName={name}
  //     password={password}
  //     onMeetingEnd={() => console.log('Meeting has ended')}
  //     loadingComponent={<p>loading ...</p>}
  //     errorComponent={<p>Oops, something went wrong</p>} containerStyles={{ width: window.innerWidth, height: window.innerHeight }} />
  // ) : (
  //   <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:'100vh' }}>
  //     <h2 style={{ textAlign: 'center' }}>Create your Meeting</h2>
  //     <div style={{ textAlign: 'center' }}>
  //       <form>
  //         <div style={{ marginBottom: 5 }}>
  //           <input id='room' type='text' placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)} />
  //         </div>
  //         <div style={{ marginBottom: 5 }}>
  //           <input id='name' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
  //         </div>
  //         <div style={{ marginBottom: 5 }}>
  //           <input id='password' type='text' placeholder='Password (optional)' value={password} onChange={(e) => setPassword(e.target.value)} />
  //         </div>
  //         <button onClick={handleClick} type='submit' style={{ marginTop: 10 }}>
  //           Start / Join
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // )}</div>
  <h1>Hello World</h1>
  )
}

export default App