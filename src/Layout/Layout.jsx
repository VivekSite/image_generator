import React from 'react'

const Layout = ({children}) => {
  return (
    <div id='layout'>
      <main style={{minHeight:'90vh'}}>
        {children}
      </main>
      <footer>
        <center>&copy; vivek sahani</center>
      </footer>
    </div>
  )
}

export default Layout;