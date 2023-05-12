import { createContext, useState } from 'react';
import { growl } from '@crystallize/react-growl'

import { TOKEN_HEADER, USER_KEY } from '../data/constants/storage.keys';
import { AuthService, StorageService } from '../data/services';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(StorageService.isInSession(TOKEN_HEADER))
    const [user, setUser] = useState(StorageService.getItemSession(USER_KEY))

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
            await growl({
                title: 'Authentication Error',
                message: error.toString(),
                type: 'error'
            })
        }
    }

    const handleLogout = () => {
        StorageService.removeItemSession(TOKEN_HEADER)
        StorageService.removeItemSession(USER_KEY)
        setLogged(false)
        setUser(null)
    }

    const data = {
        logged, user,
        handleLogin, handleLogout
    }

    return (<AuthContext.Provider value={data}>{children}</AuthContext.Provider>)
}

export { AuthProvider };
export default AuthContext;