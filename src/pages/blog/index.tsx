import { GetStaticProps } from 'next';
import BlogPostCard from '../../components/shared/BlogPostCard/BlogPostCard';
import { getAllPosts, Post } from '../../lib/blogApi';
import styles from './index.module.scss';
import Select from '../../components/shared/Select/Select';
import FullTextSearch from '../../components/shared/FullTextSearch/FullTextSearch';
import { useCallback, useEffect, useState } from 'react';
import { PostsSearchEngineInMemory } from '../../lib/searchEngine';
import debounce from '../../lib/debounce';

type BlogHomeProps = {
    posts: Post[];
};

function BlogHome({ posts }: BlogHomeProps): JSX.Element {
    const [displayed_posts, setDisplayedPosts] = useState(posts);
    const [search_engine, setSearchEngine] = useState(new PostsSearchEngineInMemory());
    const [searchInProgress, setSearchInProgress] = useState(false);

    // Get all the different categories and display "all" as default
    const categories = Array.from(new Set(posts.map((post) => post.metadata.tags).flat()));
    categories.unshift('all');

    // Use useEffect to avoid indexing on every page rerender
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

    // Handle user search with debounce
    const searchHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === '') {
            setDisplayedPosts(posts);
            setSearchInProgress(false);
            return;
        }
        let results = await search_engine.search(event.target.value);
        setDisplayedPosts(
            posts.filter((post) => results.some((result: any) => result.slug === post.slug))
        );
        setSearchInProgress(false);
    };
    const debouncedSearchHandler = useCallback(debounce(searchHandler, 700), []);

    const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!searchInProgress) setSearchInProgress(true);
        debouncedSearchHandler(event);
    };

    return (
        <main className={styles.blog_page}>
            <div className={styles.filters_section}>
                <Select categories={categories} onChange={onCategorySelect} />
                <FullTextSearch onInput={onSearchInputChange} searchInProgress={searchInProgress} />
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
