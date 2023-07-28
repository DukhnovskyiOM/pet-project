import React from 'react'
import styles from  './navigation.module.scss'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useAppSelection'
import { useAuth } from '../../hooks/useAuth'
import { removeUser } from '../../redux/user/user.slice'
import { getAuth, signOut } from "firebase/auth";

export function Navigation() {
    const auth = getAuth();
    const dispatch = useAppDispatch()
    const {isAuth} = useAuth()
    const check = isAuth ? '/create' : '/';

    return (
        <nav className={styles.navigationBlock}>
                <Link to="/list" className={styles.buttonNavigation}>List</Link>
                <Link to={check} className={styles.buttonNavigation}>{isAuth ? 'Create' : 'Exit'}</Link>
                {isAuth && <Link to="/" className={styles.buttonNavigation} onClick={() => {
                    
                    signOut(auth).then(() => {
                        console.log('Sign-out successful');
                        dispatch(removeUser())
                      }).catch((error) => {
                        console.warn(error);
                      });
                }}>Exit</Link>}
                
        </nav>
    )
}
