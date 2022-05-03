import React, {Component} from "react";
import { Link } from "react-router-dom";
class NavBar extends Component{

    render()
    {
        return(
            <div className="container">
                 <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-book-fill" viewBox="0 0 16 16">
  <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
</svg>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link" to="/Harry Potter"><b>Harry Potter</b></Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/Agatha Christie"><b>Agatha Christie</b></Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/Premchand"><b>Premchand</b></Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/Jane Austen"><b>Jane Austen</b></Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/myshelf/mybook"><b>My Books</b></Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/app/format/setting"><b>Settings</b></Link>
                    </li>
                </ul>
                </div>
             </div>
             </nav>
            </div>
        )
    }
}
export default NavBar;