import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogHome from '../../pages/blog/index';
import * as blogApi from '../../lib/blogApi';
import { getStaticProps } from '../../pages/blog/index';

import mocked_posts from '../.test_utils/data/blog-posts.json';

jest.mock('../../components/shared/BlogPostCard/BlogPostCard', () => () => <div>Blog Post</div>);

describe('HomePage page test', () => {
    it('getStaticProps returns an array of posts', async () => {
        jest.spyOn(blogApi, 'getAllPosts').mockImplementationOnce(() =>
            Promise.resolve(mocked_posts)
        );

        expect(getStaticProps(null)).resolves.toEqual({
            props: {
                posts: mocked_posts,
            },
        });
    });

    it('renders the blog posts', () => {
        render(<BlogHome posts={mocked_posts} />);
        expect(screen.getAllByText('Blog Post')).toHaveLength(mocked_posts.length);
    });
});
