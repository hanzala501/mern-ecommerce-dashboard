import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    let userName = '';
    if (auth) {
        try {
            const parsedAuth = JSON.parse(auth);
            userName = parsedAuth.name;
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    }

    return (
        <div>
            <img
                alt='logo'
                className='logo'
                src='https://media.licdn.com/dms/image/D5612AQHWRr3ZIFoHuw/article-cover_image-shrink_600_2000/0/1689279899477?e=2147483647&v=beta&t=8hI4saEkA7o9Q92TClW8Br-Ff6WIevB7JTwQxOcBmRo'
            />
            {
                auth ? 
                    <ul className="nav-ul">
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Products</Link></li>
                        {/* <li><Link to="/update">Update Products</Link></li>
                        <li><Link to="/profile">Profile</Link></li> */}
                        <li><Link onClick={logout} to="/signup">Logout ({userName})</Link></li>
                    </ul>
                :
                    <ul className="nav-ul nav-right">
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }
        </div>
    );
};

export default Nav;
