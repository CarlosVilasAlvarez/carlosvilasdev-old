import { MouseEventHandler } from 'react';
import styles from './hamburger.module.scss';

type HamburgerProps = {
    onClick: MouseEventHandler;
    isMenuOpen: boolean;
};

function Hamburger({ onClick, isMenuOpen }: HamburgerProps): JSX.Element {
    return (
        <div
            className={`${styles.hamburger} ${isMenuOpen ? styles.menu_open : styles.menu_closed}`}
            onClick={onClick}>
            <div className="hamburger_line" />
            <div className="hamburger_line" />
            <div className="hamburger_line" />
        </div>
    );
}

export default Hamburger;
