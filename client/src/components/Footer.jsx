import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Footer = () => {

    return (
        <footer className='w-100 mt-3 py-4 text-center'>
            <div className="container h-100">
                <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row gap-3">
                    <div className="copy  d-flex flex-sm-row flex-column align-items-center justify-content-center">
                        <img src="/images/logo.svg" alt="" width="50" className="me-0 me-sm-3" />
                        <a href="https://linktr.ee/danny98cuba" target='_blank' rel='noreferrer' className="text-decoration-none small">
                            d98c_sw - 2023
                        </a>
                    </div>
                    <div>
                        <ul className="d-flex justify-content-evenly m-0 list-unstyled gap-4 small">
                            <li>
                                <a href="https://linkedin.com/in/danny98cuba"
                                    className="text-decoration-none d-flex flex-sm-row flex-column align-items-center justify-content-center"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedin} className='me-2' />
                                    Linkedin
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/danny1998cuba"
                                    className="text-decoration-none d-flex flex-sm-row flex-column align-items-center justify-content-center"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faGithub} className='me-2' />
                                    Github
                                </a>
                            </li>
                            <li>
                                <a href="mailto://danny.glezcuet98@gmail.com"
                                    className="text-decoration-none d-flex flex-sm-row flex-column align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faEnvelope} className='me-2' />
                                    Mail
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
