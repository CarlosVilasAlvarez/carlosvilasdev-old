import { PostsSearchEngineInMemory } from '../../lib/searchEngine';
import mocked_posts from '../_test_utils/data/blog-posts.json';

describe('PostSearchEngineInMemory', () => {
    const engine = new PostsSearchEngineInMemory();
    const mocked_posts_slugs = mocked_posts.map((post) => post.slug);

    it('should index all the posts and find them', async () => {
        engine.indexAll(mocked_posts);
        const results = await engine.search('test');
        for (const result of results) {
            expect(mocked_posts_slugs.includes(result.id)).toBe(true);
        }
    });
});
