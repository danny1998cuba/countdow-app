import React from 'react'
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCopy } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

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
        maxWidth: '90%'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
};

Modal.setAppElement('#root')

export const Share = ({ id, modalIsOpen, setIsOpen }) => {

    const route = `https://time-to.vercel.app/#/countdown/${id}`
    const share_sources = [
        {
            id: 'copy',
            title: 'Copy Link',
            icon: faCopy,
        },
        {
            id: 'whatsapp',
            title: 'Whatsapp',
            icon: faWhatsapp,
        },
        {
            id: 'instagram',
            title: 'Instagram',
            icon: faInstagram,
        },
        {
            id: 'telegram',
            title: 'Telegram',
            icon: faTelegramPlane,
        },
    ]

    const closeModal = () => {
        setIsOpen(false);
    }

    const share = (source) => {
        switch (source) {
            case 'copy':

                break;
            case 'whatsapp':

                break;
            case 'instagram':

                break;
            case 'telegram':

                break;
            default:
                break;
        }
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal">
            <div className="d-flex justify-content-end align-items-center w-100 mb-4">
                <FontAwesomeIcon icon={faTimes} onClick={closeModal} role='button' />
            </div>

            <div className="share">
                <h5 className='text-center'>Share your countdown</h5>

                <p className="link p-2">
                    <Link to={`../countdown/${id}`}>{route}</Link>
                </p>

                <div className="d-flex flex-wrap justify-content-center align-items-center w-100 gap-3">
                    {
                        share_sources.map(source => (
                            <div key={source.id}
                                className={`btn btn-${source.id} text-light`}
                                title={source.title}
                                onClick={() => share(source.id)}>
                                <FontAwesomeIcon icon={source.icon} fontSize={20} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </Modal>
    )
}
