import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../pages/index';

describe('HomePage page test', () => {
    it('renders and has a link to the blog page', () => {
        render(<HomePage />);
        const blog_link = screen.getByRole('link', { name: 'Blog' });
        expect(blog_link).toHaveAttribute('href', '/blog');
    });
});
