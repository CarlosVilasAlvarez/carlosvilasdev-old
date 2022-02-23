import { GetStaticProps } from 'next';
import BlogPostCard from '../../components/shared/BlogPostCard/BlogPostCard';
import { getAllPosts, Post } from '../../lib/blogApi';
import styles from './index.module.scss';

type BlogHomeProps = {
    posts: Post[];
};

function BlogHome({ posts }: BlogHomeProps): JSX.Element {
    return (
        <main className={styles.blog_page}>
            <div className={styles.filters_section}></div>
            <div className={styles.grid_wrapper}>
                <div className={styles.posts_grid}>
                    {posts.map((post) => {
                        return (
                            <BlogPostCard
                                key={post.slug}
                                slug={post.slug}
                                title={post.metadata.title}
                                description={post.metadata.description}
                                card_image={post.metadata.card_image}
                                published_date={post.metadata.published_date}
                                author={post.metadata.author}
                            />
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getAllPosts();
    return {
        props: {
            posts,
        },
    };
};

export default BlogHome;
