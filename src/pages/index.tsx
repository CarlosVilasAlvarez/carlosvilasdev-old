import { useState } from 'react';

import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import styles from './index.module.scss';

function HomePage(): JSX.Element {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const onHamburgerClickHandler = (): void => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <HeaderMobile
                onHamburgerClickHandler={onHamburgerClickHandler}
                isMobileMenuOpen={isMobileMenuOpen}
            />
            <Header />
            <h1>Carlos Vilas Álvarez</h1>

            <section className={styles.section__contact}>
                <h2>Lmao</h2>
            </section>
        </>
    );
}

export default HomePage;
