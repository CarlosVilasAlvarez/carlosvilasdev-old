import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostPage, { getStaticProps, getStaticPaths } from '../../pages/blog/posts/[slug]';
import * as blogApi from '../../lib/blogApi';

import { lorem_ipsum_html } from '../_test_utils/data/lorem-ipsum.json';
import mocked_posts from '../_test_utils/data/blog-posts.json';
const mocked_slugs = ['test-1', 'test-2'];

describe('PostPage page test', () => {
    it('renders post title and content as a html string', () => {
        const { container } = render(<PostPage title="Testing post" content={lorem_ipsum_html} />);
        expect(screen.getByText('Testing post')).toBeInTheDocument();
        expect(container).toContainHTML(lorem_ipsum_html);
    });

    it('getStaticPaths returns as many paths as different posts', async () => {
        jest.spyOn(blogApi, 'getAllSlugs').mockImplementationOnce(() =>
            Promise.resolve(mocked_slugs)
        );

        await expect(getStaticPaths(null)).resolves.toEqual({
            fallback: false,
            paths: [{ params: { slug: mocked_slugs[0] } }, { params: { slug: mocked_slugs[1] } }],
        });
    });

    it('getStaticProps returns post title and content', async () => {
        const mocked_post = mocked_posts[0];
        jest.spyOn(blogApi, 'getPostBySlug').mockImplementationOnce(() =>
            Promise.resolve(mocked_posts[0])
        );

        await expect(getStaticProps({ params: { slug: mocked_post.slug } })).resolves.toEqual({
            props: {
                title: mocked_post.metadata.title,
                content: mocked_post.content,
            },
        });
    });
});
