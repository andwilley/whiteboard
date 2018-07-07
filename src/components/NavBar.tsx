import * as React from 'react';

const NavBar: React.SFC = () => (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <input
            className="form-control form-control-dark col-sm-3 col-md-2 w-100"
            type="text"
            placeholder="Search"
            aria-label="Search"
        />
        <a className="navbar-brand col-md mr-0" href="#">Whiteboard</a>
        <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
                <a className="nav-link" href="#">Sign out</a>
            </li>
        </ul>
    </nav>
);

export default NavBar;
