import React from 'react'
import './navigation.css'
import { Link } from 'react-router-dom'

export function Navigation(): React.JSX.Element {
    return (
        <nav className="navigation__block">
                <Link to="/list" className='button__navigation'>List</Link>
                <Link to="/create" className='button__navigation'>Create</Link>
        </nav>
    )
}
