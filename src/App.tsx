import React from 'react';
import './App.css';

import Grid from './components/Grid/Grid';

function App() {
  return (
    <div className="App">
      <Grid rows={20} columns={10} border={true} />
    </div>
  );
}

export default App;
