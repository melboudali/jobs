/** the flexThis take one array and returns three arrays for masonry layout.
 *
 * (testimonials[]) => testimonials[][]
 */
export const flexThis = <T extends { id: number }>(arr: T[]): T[][] => {
   const res: T[][] = [];
   let subRes: T[] = [];
   for (let i = 0; i < arr.length; i++) {
      subRes.push(arr[i]);
      if (arr[i].id % 3 === 0 || i === arr.length - 1) {
         res.push(subRes);
         subRes = [];
      }
   }

   return res;
};
