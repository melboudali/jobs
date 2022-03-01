import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { cwd } from "process";
import { URL } from "url";

export const postsDirectory = join(cwd(), "posts");

// export const getSortedPostsData: () => { id: string; date?: number }[] = () => {
// 	const fileNames = fs.readdirSync(postsDirectory);
// 	const allPostsData: any = fileNames.map(fileName => {
// 		// const id = fileName.replace(/\.md$/, "");
// 		const id = fileName;

// 		// Read markdown file as string
// 		const fullPath = join(postsDirectory, fileName, "index.md");
// 		const fileContents = fs.readFileSync(fullPath, "utf8");

// 		// Use gray-matter to parse the post metadata section
// 		const matterResult = matter(fileContents);

// 		// Combine the data with the id
// 		return {
// 			id,
// 			...matterResult.data
// 		};
// 	});
// 	// Sort posts by date
// 	return allPostsData.sort(({ date: a }, { date: b }) => {
// 		if (a! < b!) {
// 			return 1;
// 		} else if (a! > b!) {
// 			return -1;
// 		} else {
// 			return 0;
// 		}
// 	});
// };

export const getAllPostIds = () => {
	const fileNames = fs.readdirSync(postsDirectory);
	return fileNames.map(fileName => ({
		params: {
			slug: fileName.replace(/\.md$/, "")
		}
	}));
};

export async function getPostData(slug: string) {
	const fullPath = join(postsDirectory, `${slug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);
	// Use remark to convert markdown into HTML string
	const processedContent = await remark().use(html).process(matterResult.content);
	const contentHtml = processedContent.toString();

	// Combine the data with the id and contentHtml
	return {
		slug,
		contentHtml,
		...matterResult.data
	};
}
