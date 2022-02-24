import { GetStaticProps } from 'next';
import BlogPostCard from '../../components/shared/BlogPostCard/BlogPostCard';
import { getAllPosts, Post } from '../../lib/blogApi';
import styles from './index.module.scss';
import Select from '../../components/shared/Select/Select';
import { useState } from 'react';

type BlogHomeProps = {
    posts: Post[];
};

function BlogHome({ posts }: BlogHomeProps): JSX.Element {
    const [displayed_posts, setDisplayedPosts] = useState(posts);
    const categories = Array.from(new Set(posts.map((post) => post.metadata.tags).flat()));
    categories.unshift('all'); // Add 'all' category to the beginning of the array so it's displayed in the select by default

    const onCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const selected_category = event.target.value;
        if (selected_category === 'all') {
            setDisplayedPosts(posts);
        } else {
            setDisplayedPosts(
                posts.filter((post) => post.metadata.tags.includes(selected_category))
            );
        }
    };

    return (
        <main className={styles.blog_page}>
            <div className={styles.filters_section}>
                <Select categories={categories} onChange={onCategorySelect} />
            </div>
            <div className={styles.grid_wrapper}>
                <div className={styles.posts_grid}>
                    {displayed_posts.map((post) => {
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
