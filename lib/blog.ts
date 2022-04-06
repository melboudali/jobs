import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { cwd } from "process";
import { Posts } from "@globalTypes";

export const postsDirectory = join(cwd(), "posts");

export const getSortedPostsData = () => {
   const fileNames = fs.readdirSync(postsDirectory);
   const allPostsData: Posts = fileNames.map(fileName => {
      const id = fileName.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(join(postsDirectory, fileName), "utf8");
      const matterResult = matter(fileContents);

      return {
         id,
         title: matterResult.data.title,
         cover: matterResult.data.cover,
         seo_description: matterResult.data.seo_description,
         summary: matterResult.data.summary,
         contentHtml: "",
         date: matterResult.data.date,
      };
   });

   return allPostsData.sort(({ date: nDate }, { date: oDate }) => {
      if (nDate < oDate) {
         return 1;
      } else if (nDate > oDate) {
         return -1;
      } else {
         return 0;
      }
   });
};

export const getAllPostIds = () => {
   const fileNames = fs.readdirSync(postsDirectory);
   return fileNames.map(fileName => ({
      params: {
         slug: fileName.replace(/\.md$/, ""),
      },
   }));
};

export async function getPostData(slug: string) {
   const fileContents = fs.readFileSync(join(postsDirectory, `${slug}.md`), "utf8");
   const matterResult = matter(fileContents);
   const contentHtml = (await remark().use(html).process(matterResult.content)).toString();
   return {
      slug,
      contentHtml,
      ...matterResult.data,
   };
}
