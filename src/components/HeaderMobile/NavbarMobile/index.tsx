import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';
import Hamburger from './Hamburger';
import styles from '../NavbarMobile/navbar.mobile.module.scss';

type NavMobileProps = {
    isMenuOpen: boolean;
};

function NavbarMobile({ isMenuOpen }: NavMobileProps): JSX.Element {
    return (
        <nav className={`${styles.modal_menu} ${isMenuOpen ? styles.open : styles.closed}`}>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/blog">Blog</Link>
                </li>
                <li>
                    <Link href="/#cv">Resume</Link>
                </li>
                <li>
                    <Link href="/#contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavbarMobile;
