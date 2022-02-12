import { GetStaticProps } from 'next';
import BlogPostCard from '../../components/shared/BlogPostCard/BlogPostCard';
import { getAllPosts, Post } from '../../lib/blogApi';

type BlogHomeProps = {
    posts: Post[];
};

function BlogHome({ posts }: BlogHomeProps): JSX.Element {
    return (
        <div>
            <h1>Blog Home</h1>
            {posts.map((post) => {
                return (
                    <BlogPostCard
                        key={post.slug}
                        slug={post.slug}
                        title={post.metadata.title}
                        description={post.metadata.description}
                        card_image={post.metadata.card_image}
                        published_date={post.metadata.published_date}
                    />
                );
            })}
        </div>
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
