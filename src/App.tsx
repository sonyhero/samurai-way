import React from 'react';
import './App.css';


const App = () => {
    return (
        <div className='app-wrapper'>
            <header className='header'>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLxOuoX74j_i0OvkPIIwhN6uVhK4KXc9JPjQ&usqp=CAU"
                    alt="itachi logo"/>
            </header>
            <nav className='nav'>
                <div>
                    <a href="">Profile</a>
                </div>
                <div>
                    <a href="">Messages</a>
                </div>
                <div>
                    <a href="">News</a>
                </div>
                <div>
                    <a href="">Music</a>
                </div>
                <div>
                    <a href="">Settings</a>
                </div>
            </nav>
            <div className='content'>
                <div>
                    <img
                        src="https://cdn.wallpapersafari.com/66/25/slYcCE.jpg"
                        alt="itachi content" width='1200px' height='200px'/>
                </div>
                <div>
                    <img
                        src="https://mir-s3-cdn-cf.behance.net/projects/404/a856ac92777323.Y3JvcCwxNTAwLDExNzMsMCwxNjM.png"
                        alt="itachi" width='200px' height='200px'/>
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
