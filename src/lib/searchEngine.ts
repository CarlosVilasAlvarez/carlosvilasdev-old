import { Post } from './blogApi';
import MiniSearch, { SearchResult } from 'minisearch';

interface IPostsSearchEngine<T> {
    indexAll(docs: T[]): Promise<void>;
    search(query: string): Promise<unknown[]>;
}

export class PostsSearchEngineInMemory implements IPostsSearchEngine<Post> {
    private engine: MiniSearch;

    constructor() {
        this.engine = new MiniSearch({
            idField: 'slug',
            fields: ['title', 'description', 'author', 'tags', 'content'],
            storeFields: ['slug'],
            extractField: (document, fieldName) => {
                if (['title', 'description', 'author', 'tags'].includes(fieldName)) {
                    return document.metadata[fieldName];
                }
                return document[fieldName];
            },
        });
    }

    async indexAll(posts: Post[]): Promise<void> {
        this.engine.addAll(posts);
    }

    async search(query: string): Promise<SearchResult[]> {
        const slugs = this.engine.search(query);
        return Promise.resolve(slugs);
    }
}
