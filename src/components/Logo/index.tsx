import styles from './logo.module.scss';

type LogoColor = 'white' | 'black';
type LogoProps = {
    color: LogoColor;
};

function Logo({ color = 'white' }: LogoProps): JSX.Element {
    const logoPath = `/resources/img/logo-${color}.svg`;

    return <img src={logoPath} alt="Logo of the website" className={styles.logo} />;
}

export default Logo;
