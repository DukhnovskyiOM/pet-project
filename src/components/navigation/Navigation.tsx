import './navigation.css'
import { Link } from 'react-router-dom'

export function Navigation() {
    return (
        <nav className="navigation__block">
                <Link to="/" className='button__navigation'>List</Link>
                <Link to="/create" className='button__navigation'>Create</Link>
        </nav>
    )
}
