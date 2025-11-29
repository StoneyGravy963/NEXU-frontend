import { useState } from 'react'
import reactLogo from './assets/logo.webp'

import LoginSignup from './components/auth/LoginSignin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoginSignup />
    </>
  )
}

export default App
