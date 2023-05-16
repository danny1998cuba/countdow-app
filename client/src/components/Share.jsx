import React from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom';
import copy from 'clipboardy'
import { growl } from '@crystallize/react-growl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCopy, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faTelegramPlane, faFacebookF } from '@fortawesome/free-brands-svg-icons';

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
            id: 'facebook',
            title: 'Facebook',
            icon: faFacebookF,
        },
        {
            id: 'telegram',
            title: 'Telegram',
            icon: faTelegramPlane,
        },
        {
            id: 'other',
            title: 'More options',
            icon: faPlus,
        },
    ]

    const closeModal = () => {
        setIsOpen(false);
    }

    const share = async (source) => {
        let link = null
        switch (source) {
            case 'copy':
                await copy.write(route)
                await growl({
                    title: 'Success',
                    message: 'Copied to the clipboard',
                    type: 'info'
                })
                break;
            case 'whatsapp':
                link = `https://api.whatsapp.com/send?text=${encodeURIComponent(route)}`
                break;
            case 'facebook':
                link = `http://www.facebook.com/sharer.php?u=${encodeURIComponent(route)}`
                break;
            case 'telegram':
                link = `https://t.me/share/url?url=${encodeURIComponent(route)}&text=${encodeURIComponent("Share my countdown")}`
                window.open(link, '_blank')
                break;
            default:
                if (navigator.share) {
                    await navigator.share({
                        title: document.title,
                        text: "Share my countdown",
                        url: route
                    })
                }
                break;
        }
        if (link) window.open(link, '_blank')
        setIsOpen(false)
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
