import { GetStaticPaths, GetStaticProps } from 'next';

export default function Post({ title }: { title: string }): JSX.Element {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [{ params: { slug: 'post-1' } }, { params: { slug: 'post-2' } }];

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            title: `${context.params.slug}`,
        },
    };
};
