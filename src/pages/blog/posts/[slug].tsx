import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllSlugs, getPostBySlug } from '../../../lib/blogApi';

export default function PostPage({
    title,
    content,
}: {
    title: string;
    content: string;
}): JSX.Element {
    return (
        <div>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
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
