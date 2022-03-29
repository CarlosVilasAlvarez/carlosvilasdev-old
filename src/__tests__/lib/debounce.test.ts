import debounce from '../../lib/debounce';
jest.useFakeTimers();

describe('Debounce lib', () => {
    const mock_fn = jest.fn();

    it('execution of the debounced function runs just once', () => {
        const debouncedFn = debounce(mock_fn, 1000);

        for (let i = 0; i < 100; i++) {
            debouncedFn();
        }

        // Fast forward timers to trigger debouncedFn
        jest.runAllTimers();

        expect(mock_fn).toBeCalledTimes(1);
    });
});
