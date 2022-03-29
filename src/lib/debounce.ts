export default function debounce(func: Function, wait: number): (...args: any[]) => any {
    let timeout: NodeJS.Timeout;
    return (...args: any[]): any => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
}
