import { GetStaticProps } from 'next';
import BlogPostCard from '../../components/shared/BlogPostCard/BlogPostCard';
import { getAllPosts, Post } from '../../lib/blogApi';
import styles from './index.module.scss';
import Select from '../../components/shared/Select/Select';
import FullTextSearch from '../../components/shared/FullTextSearch/FullTextSearch';
import { useEffect, useState } from 'react';
import { PostsSearchEngineInMemory } from '../../lib/searchEngine';

type BlogHomeProps = {
    posts: Post[];
};

function BlogHome({ posts }: BlogHomeProps): JSX.Element {
    const [displayed_posts, setDisplayedPosts] = useState(posts);
    const [search_engine, setSearchEngine] = useState(new PostsSearchEngineInMemory());

    // Get all the different categories and display "all" as default
    const categories = Array.from(new Set(posts.map((post) => post.metadata.tags).flat()));
    categories.unshift('all');

    useEffect(() => {
        search_engine.indexAll(posts);
    }, []);

    // Handle the change of categories in select element
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

    // Handle input in the select using at the same time the engine (timeouts used to wait for the input to be typed)
    let typing_timeout: NodeJS.Timeout;
    const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        clearTimeout(typing_timeout);

        if (event.target.value === '' || event.target.value.length <= 3) {
            setDisplayedPosts(posts);
            return;
        }

        typing_timeout = setTimeout(async () => {
            let results = await search_engine.search(event.target.value);
            setDisplayedPosts(
                posts.filter((post) => results.some((result: any) => result.slug === post.slug))
            );
        }, 650);
    };

    return (
        <main className={styles.blog_page}>
            <div className={styles.filters_section}>
                <Select categories={categories} onChange={onCategorySelect} />
                <FullTextSearch onInput={onSearchInputChange} />
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
