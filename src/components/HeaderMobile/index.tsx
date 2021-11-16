import NavbarMobile from './NavbarMobile';
import Logo from '../Logo';
import Hamburger from './NavbarMobile/Hamburger';
import { MouseEventHandler } from 'react';
import styles from './headermobile.module.scss';

type HeaderProps = {
    onHamburgerClickHandler: MouseEventHandler;
    isMobileMenuOpen: boolean;
};

function HeaderMobile({ onHamburgerClickHandler, isMobileMenuOpen }: HeaderProps): JSX.Element {
    return (
        <header className={styles.header_mobile}>
            <Logo color={isMobileMenuOpen ? 'black' : 'white'} />
            <Hamburger onClick={onHamburgerClickHandler} isMenuOpen={isMobileMenuOpen} />
            <NavbarMobile isMenuOpen={isMobileMenuOpen} />
        </header>
    );
}

export default HeaderMobile;
