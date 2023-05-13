import React, { useContext } from 'react'
import Modal from 'react-modal'
import { growl } from '@crystallize/react-growl'
import { DynamicForm } from 'd98c_dynamic-forms';

import { AuthContext } from '../context';
import { forgotPasswordFormInputs } from '../data/constants/forms'
import { AuthService } from '../data/services';
import { StylingFunctions } from '../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
    content: {
        top: '1rem',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: '1.5rem 2rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '25px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
};

Modal.setAppElement('#root')

export const ForgotPass = ({ modalIsOpen, setIsOpen }) => {

    const { handleLoginToken } = useContext(AuthContext)

    const afterOpenModal = () => {
        StylingFunctions.formStyling()
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handlePassChange = async (values) => {
        try {
            let { token, mailSended } = await AuthService.forgotPassword(values)
            handleLoginToken(token)
            setIsOpen(false)

            let message = `The email was${mailSended ? '' : 'n\'t'} sended. We recommend to change the self-generated password.`
            await growl({
                title: 'Success',
                message: message,
                type: 'info'
            })
        } catch (error) {
            await growl({
                title: 'Password Error',
                message: error.toString(),
                type: 'error'
            })
        }
    }

    return (
        <div className="modal">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="d-flex justify-content-end align-items-center w-100 mb-4">
                    <FontAwesomeIcon icon={faTimes} onClick={closeModal} role='button' />
                </div>
                <DynamicForm formInputs={forgotPasswordFormInputs}
                    onSubmit={handlePassChange}
                    resetOnSubmit={false} />
            </Modal>
        </div>
    )
}
