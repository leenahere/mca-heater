import React from 'react';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>MCA IoT Heizung</h1>
    </header>
  )
}

const headerStyle = {
  backgroundColor: '#a8d0e6',
  color: 'white',
  textAlign: 'center',
  padding: '20px',
  margin: '20px',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
}

export default Header;
