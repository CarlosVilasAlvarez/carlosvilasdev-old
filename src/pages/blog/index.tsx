import { GetStaticProps } from 'next';
import BlogPostCard from '../../components/shared/BlogPostCard/BlogPostCard';
import { getAllPosts, Post } from '../../lib/blogApi';
import styles from './index.module.scss';
import Select from '../../components/shared/Select/Select';
import FullTextSearch from '../../components/shared/FullTextSearch/FullTextSearch';
import { useState } from 'react';
import MiniSearch from 'minisearch';

type BlogHomeProps = {
    posts: Post[];
};

function BlogHome({ posts }: BlogHomeProps): JSX.Element {
    const [displayed_posts, setDisplayedPosts] = useState(posts);
    const categories = Array.from(new Set(posts.map((post) => post.metadata.tags).flat()));
    // Add 'all' category to the beginning of the array so it's displayed in the select by default
    categories.unshift('all');

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

    const mini_search = new MiniSearch({
        idField: 'slug',
        fields: ['title', 'description', 'author', 'tags', 'content'],
        storeFields: ['slug'],
        extractField: (document, fieldName) => {
            if (['title', 'description', 'author', 'tags'].includes(fieldName)) {
                return document.metadata[fieldName];
            }
            return document[fieldName];
        },
    });
    mini_search.addAll(posts);

    let is_timing_out = false;
    let last_time_out: NodeJS.Timeout;
    const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (is_timing_out) {
            clearTimeout(last_time_out);
        }

        if (event.target.value === '' || event.target.value.length <= 3) {
            setDisplayedPosts(posts);
            return;
        }

        is_timing_out = true;
        last_time_out = setTimeout(() => {
            let results = mini_search.search(event.target.value);
            setDisplayedPosts(
                posts.filter((post) => results.some((result) => result.slug === post.slug))
            );
            is_timing_out = false;
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
