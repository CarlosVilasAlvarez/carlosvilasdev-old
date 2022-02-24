import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '../../components/shared/Select/Select';

describe('Select component test', () => {
    const categories = ['all', 'test1', 'test2'];
    const onChange = jest.fn();

    it('displays the first category by default', () => {
        render(<Select categories={categories} onChange={onChange} />);
        expect(screen.getByDisplayValue(categories[0], { exact: false })).toBeInTheDocument();
    });

    it('all the options are correctly displayed and we can select them', () => {
        render(<Select categories={categories} onChange={onChange} />);
        const element = screen.getByDisplayValue(categories[0], { exact: false });

        categories.forEach((category) => {
            fireEvent.change(element, { target: { value: category } });
            expect(screen.getByDisplayValue(category, { exact: false })).toBeInTheDocument();
        });
    });
});
