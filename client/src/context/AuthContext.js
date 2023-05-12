import { createContext, useEffect, useState } from 'react';
import { AuthService, StorageService } from '../data/services';
import { TOKEN_HEADER, USER_KEY } from '../data/constants/storage.keys';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState(null)

    const handleLogin = async (values, signin) => {
        try {
            let token
            if (signin) {
                token = await AuthService.signin(values)
            } else {
                token = await AuthService.signup(values)
            }

            StorageService.setItemSession(TOKEN_HEADER, token)
            let user = await AuthService.profile()
            StorageService.setItemSession(USER_KEY, user)
            setUser(user)
            setLogged(true)
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = () => {
        StorageService.removeItemSession(TOKEN_HEADER)
        StorageService.removeItemSession(USER_KEY)
        setLogged(false)
        setUser(null)
    }

    useEffect(() => {
        setLogged(StorageService.isInSession(TOKEN_HEADER))
        setUser(StorageService.getItemSession(USER_KEY))
    }, [])

    const data = {
        logged, user,
        handleLogin, handleLogout
    }

    return (<AuthContext.Provider value={data}>{children}</AuthContext.Provider>)
}

export { AuthProvider };
export default AuthContext;