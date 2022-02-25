import styles from './fulltextsearch.module.scss';

type FullTextSearchProps = {
    onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FullTextSearch({ onInput }: FullTextSearchProps) {
    return (
        <input
            className={styles.search}
            type="text"
            role="search"
            placeholder="Search"
            size={25}
            onInput={onInput}
        />
    );
}
