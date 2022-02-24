import styles from './select.module.scss';

type SelectProps = {
    categories: string[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({ categories, onChange }: SelectProps) {
    return (
        <select name="post_categories" className={styles.select} onChange={onChange}>
            <option key="all" value="all">
                All
            </option>
            {categories.map((category) => {
                return (
                    <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                );
            })}
        </select>
    );
}
