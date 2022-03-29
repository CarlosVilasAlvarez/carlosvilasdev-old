import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FullTextSearch from '../../components/shared/FullTextSearch/FullTextSearch';

describe('FullTextSearch', () => {
    it('has different style when a search is in progress', () => {
        const { rerender } = render(
            <FullTextSearch onInput={jest.fn()} searchInProgress={false} />
        );
        const element = screen.getByRole('search');
        expect(element).not.toHaveClass('searching');

        rerender(<FullTextSearch onInput={jest.fn()} searchInProgress={true} />);
        expect(element).toHaveClass('searching');
    });

    it('triggers handler execution when we start typing', () => {
        const mockFn = jest.fn();

        render(<FullTextSearch onInput={mockFn} searchInProgress={false} />);
        const element = screen.getByRole('search');
        fireEvent.change(element, { target: { value: 'test' } });

        expect(mockFn).toBeCalledTimes(1);
    });
});
