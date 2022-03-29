import styles from './fulltextsearch.module.scss';

type FullTextSearchProps = {
    onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchInProgress: boolean;
};

export default function FullTextSearch({ onInput, searchInProgress }: FullTextSearchProps) {
    return (
        <input
            className={`${styles.search} ${searchInProgress ? styles.searching : ''}`}
            type="text"
            role="search"
            placeholder="Search"
            size={25}
            onChange={onInput}
        />
    );
}
