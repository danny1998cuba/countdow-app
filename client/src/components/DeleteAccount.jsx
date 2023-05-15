import React, { useContext } from 'react'
import { AuthContext } from '../context'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../data/services'
import { growl } from '@crystallize/react-growl'

const style = {
    border: '1px solid rgba(255, 0, 0, 0.2)',
    borderRadius: '25px',
    padding: '1.5rem 2rem',
}

export const DeleteAccount = () => {
    const { user, handleLogout } = useContext(AuthContext)
    const navigate = useNavigate()

    const delete_ = async () => {
        if (window.confirm('Are you sure you want delete your account?')) {
            try {
                let res = await AuthService.deleteUser(user)
                handleLogout()
                navigate('../')
                await growl({
                    title: 'Success',
                    message: res.msg.toString(),
                    type: 'info'
                })
            } catch (error) {
                await growl({
                    title: 'Error',
                    message: error.toString(),
                    type: 'error'
                })
            }
        }
    }

    return (
        <div style={style}>
            <h4>Delete your account</h4>
            <p>
                This is an irreversible process. All your countdowns will be deleted too.
            </p>
            <button className="btn btn-sm btn-danger" onClick={delete_}>Delete Account</button>
        </div>
    )
}
