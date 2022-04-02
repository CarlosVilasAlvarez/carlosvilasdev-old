import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllSlugs, getPostBySlug } from '../../../lib/blogApi';
import styles from './post.module.scss';

export default function PostPage({
    title,
    content,
}: {
    title: string;
    content: string;
}): JSX.Element {
    return (
        <main className={styles.post_page}>
            <Link href="/blog">
                <a className={styles.back_link}>
                    <span className={styles.back_icon} role="img" aria-label="go back icon"></span>
                    Back to articles
                </a>
            </Link>
            <div className={styles.post_box}>
                <div className={styles.post_image}>
                    <Image
                        src="https://via.placeholder.com/500"
                        alt="Post cover image"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
                <div className={styles.post_body}>
                    <h1>{title}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: content }}
                        className={styles.markdown_content}></div>
                </div>
            </div>
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await getAllSlugs();
    const paths = slugs.map((slug) => {
        return {
            params: {
                slug,
            },
        };
    });

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const post = await getPostBySlug(context.params.slug as string);
    return {
        props: {
            title: post.metadata.title,
            content: post.content,
        },
    };
};
