import styles from './blogpostcard.module.scss';
import Link from 'next/link';

type BlogPostCardProps = {
    slug: string;
    title: string;
    description: string;
    published_date: string;
    card_image: string;
};

function BlogPostCard({
    slug,
    title,
    description,
    published_date,
    card_image,
}: BlogPostCardProps): JSX.Element {
    return (
        <Link href={`/blog/posts/${slug}`}>
            <a className={styles.post_card__link_wrapper}>
                <div className={styles.post_card}>
                    <div className={styles.post_image_wrapper}>
                        <img src={card_image} alt={`Image of the post ${title}`} />
                    </div>
                    <div className={styles.post_card_body}>
                        <h2>{title}</h2>
                        <p className={styles.post_description}>{description}</p>
                    </div>
                    <div className={styles.post_footer}>
                        <p>{published_date}</p>
                    </div>
                </div>
            </a>
        </Link>
    );
}

export default BlogPostCard;
