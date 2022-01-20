import Link from 'next/link';

function HomePage(): JSX.Element {
    return (
        <Link href="/blog">
            <a>Blog</a>
        </Link>
    );
}

export default HomePage;
