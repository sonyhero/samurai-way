import React from 'react';
import './App.css';
import {Header} from "./components/Header";
import {Navbar} from "./components/Navbar";


const App = () => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='content'>
                <div>
                    <img
                        src="https://cdn.wallpapersafari.com/66/25/slYcCE.jpg"
                        alt="itachi content" width='1200px' height='200px'/>
                </div>
                <div>
                    ava+dicr
                </div>
                <div>
                    my posts
                    <div>
                        new post
                    </div>
                    <div>
                        <div>post 1</div>
                        <div>post 2</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
