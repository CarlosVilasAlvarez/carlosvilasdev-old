import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogHome, { getStaticProps } from '../../pages/blog/index';
import * as blogApi from '../../lib/blogApi';

import mocked_posts from '../_test_utils/data/blog-posts.json';

jest.mock('../../components/shared/BlogPostCard/BlogPostCard', () => () => <div>Blog Post</div>);
jest.mock('../../components/shared/Select/Select', () => () => (
    <select>
        <option value="test">test</option>
    </select>
));
jest.mock('../../components/shared/FullTextSearch/FullTextSearch', () => () => (
    <input type="text" role="search"></input>
));

describe('HomePage page test', () => {
    it('getStaticProps returns an array of posts', async () => {
        jest.spyOn(blogApi, 'getAllPosts').mockImplementationOnce(() =>
            Promise.resolve(mocked_posts)
        );

        await expect(getStaticProps(null)).resolves.toEqual({
            props: {
                posts: mocked_posts,
            },
        });
    });

    it('renders the blog posts and a select and search inputs', () => {
        render(<BlogHome posts={mocked_posts} />);
        expect(screen.getAllByText('Blog Post')).toHaveLength(mocked_posts.length);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('search')).toBeInTheDocument();
    });
});
