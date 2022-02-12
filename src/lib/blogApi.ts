import { readdir, readFile } from 'fs/promises';
import { basename } from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_FOLDER = `${process.cwd()}/src/posts`;

type PostMetadata = {
    title: string;
    description: string;
    published_date: string;
    latest_update: string;
    card_image: string;
    tags: string[];
};

export type Post = {
    slug: string;
    metadata: PostMetadata;
    content: string;
};

export async function getAllSlugs() {
    const filenames = await readdir(BLOG_FOLDER);
    if (filenames.length === 0) {
        throw new Error('No files found');
    }
    const slugs = filenames.map((filename) => basename(filename, '.md'));
    return slugs;
}

export async function getAllPosts(): Promise<Post[]> {
    const slugs = await getAllSlugs();
    const post_promises = slugs.map((slug) => {
        return getPostBySlug(slug);
    });
    const posts = await Promise.all(post_promises);
    return posts;
}

export async function getPostBySlug(slug: string): Promise<Post> {
    const post = await readFile(`${BLOG_FOLDER}/${slug}.md`);
    const { data: metadata, content } = matter(post);
    const html_content = marked.parse(content);
    return {
        slug,
        metadata: metadata as PostMetadata,
        content: html_content,
    };
}
