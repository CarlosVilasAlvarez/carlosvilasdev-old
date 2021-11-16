import Navbar from './Navbar';
import styles from './header.module.scss';

function Header(): JSX.Element {
    return (
        <header className={styles.header}>
            <Navbar></Navbar>
        </header>
    );
}

export default Header;
