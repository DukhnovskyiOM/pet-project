import React from 'react'
import styles from  './navigation.module.scss'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useAppSelection'
import { useAuth } from '../../hooks/useAuth'
import { removeUser } from '../../redux/user/user.slice'

export function Navigation() {

    const dispatch = useAppDispatch()
    const {isAuth} = useAuth()
    const check = isAuth ? '/create' : '/'

    return (
        <nav className={styles.navigationBlock}>
                <Link to="/list" className={styles.buttonNavigation}>List</Link>
                <Link to={check} className={styles.buttonNavigation}>{isAuth ? 'Create' : 'Exit'}</Link>
                {isAuth && <Link to="/" className={styles.buttonNavigation} onClick={() => dispatch(removeUser())}>Exit</Link>}
                
        </nav>
    )
}
