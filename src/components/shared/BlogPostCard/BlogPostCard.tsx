import styles from './blogpostcard.module.scss';

type BlogPostCardProps = {
    slug: string;
    title: string;
    description: string;
    published_date: string;
};

function BlogPostCard({
    slug,
    title,
    description,
    published_date,
}: BlogPostCardProps): JSX.Element {
    return (
        <div className={styles.blogPostCard}>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{published_date}</p>
            <a href={`/blog/${slug}`}>Read more</a>
        </div>
    );
}

export default BlogPostCard;
