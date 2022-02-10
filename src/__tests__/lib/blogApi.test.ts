import * as fsPromises from 'fs/promises';
import * as blogApi from '../../../src/lib/blogApi';
import matter from 'gray-matter';

jest.mock('fs/promises');
const readdir = fsPromises.readdir as jest.Mock;
const readFile = fsPromises.readFile as jest.Mock;

jest.mock('gray-matter');

describe('getAllSlugs', () => {
    test('should return the slugs after reading the filenames', async () => {
        readdir.mockReturnValueOnce(['test-1.md', 'test-2.md']);
        await expect(blogApi.getAllSlugs()).resolves.toEqual(['test-1', 'test-2']);
    });

    test('should throw an error in case there are no files', async () => {
        readdir.mockReturnValueOnce([]);
        await expect(blogApi.getAllSlugs()).rejects.toThrowError();
    });
});

describe('getPostBySlug', () => {
    test('should return a post object with all its data', async () => {
        readFile.mockReturnValueOnce({});
        (matter as unknown as jest.Mock).mockReturnValueOnce({
            data: { title: 'test-post' },
            content: 'test-post',
        });

        const expected_result_obj = {
            content: '<p>test-post</p>\n',
            metadata: {
                title: 'test-post',
            },
            slug: 'test',
        };

        await expect(blogApi.getPostBySlug('test')).resolves.toEqual(expected_result_obj);
    });
});

describe('getAllPosts', () => {
    test('should return an array of posts', async () => {
        readdir.mockReturnValueOnce(['test.md']);
        readFile.mockReturnValueOnce({});
        (matter as unknown as jest.Mock).mockReturnValueOnce({
            data: { title: 'test-post' },
            content: 'test-post',
        });
        const expected_post = {
            content: '<p>test-post</p>\n',
            metadata: {
                title: 'test-post',
            },
            slug: 'test',
        };

        await expect(blogApi.getAllPosts()).resolves.toEqual([expected_post]);
    });
});
