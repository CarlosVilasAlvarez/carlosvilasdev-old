import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogPostCard from '../../components/shared/BlogPostCard/BlogPostCard';

import mocked_posts from '../_test_utils/data/blog-posts.json';

describe('BlogPostCard component test', () => {
    const mocked_post = mocked_posts[0];
    const props = {
        slug: mocked_post.slug,
        title: mocked_post.metadata.title,
        description: mocked_post.metadata.description,
        published_date: mocked_post.metadata.published_date,
        card_image: mocked_post.metadata.card_image,
    };

    it('links to the post page', () => {
        const { getByRole } = render(<BlogPostCard {...props} />);
        expect(getByRole('link')).toHaveAttribute('href', `/blog/posts/${mocked_post.slug}`);
    });

    it('has a preview image of the post', () => {
        const { getByRole } = render(<BlogPostCard {...props} />);
        expect(getByRole('img')).toHaveAttribute('src', mocked_post.metadata.card_image);
    });
});
