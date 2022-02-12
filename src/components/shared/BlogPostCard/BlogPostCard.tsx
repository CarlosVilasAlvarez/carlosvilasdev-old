import styles from './blogpostcard.module.scss';

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
        <div className={styles.blogPostCard}>
            <img src={card_image} alt={`Image of the post ${title}`} />
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{published_date}</p>
            <a href={`/blog/${slug}`}>Read more</a>
        </div>
    );
}

export default BlogPostCard;
