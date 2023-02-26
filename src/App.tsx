import React from 'react';
import './App.css';
import Technologies from './Technologies';
import Header from './Header';

// function App() {
//   return (
//     <div className="App">
//      Hello, samurai! Let's go!
//     </div>
//   );
// }

const App = () => {
  return (
    <div>
      <Header />
      <Technologies />
    </div>
  );
}

export default App;
