import type { ReactElement } from "react";
import type { MyNextPage } from "next";
import AppLayout from "@layouts/AppLayout";

const App: MyNextPage = () => {
   return (
      <div>
         <h1>This is a private route</h1>
         <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolore minima fugit quis obcaecati ut vitae cum
            adipisci. Illum perferendis dolores nemo ad, alias dolorem veniam repellat molestias similique accusantium non
            nesciunt autem cum consequatur ex quo rerum esse aspernatur quisquam quia. Libero, dolores? Ipsa quidem doloremque
            dolorem quod molestias delectus mollitia qui deserunt ratione totam architecto quibusdam sint distinctio ea magnam,
            rem magni consectetur quos obcaecati? Reprehenderit, sunt! Corporis maxime libero molestias voluptatum labore quia
            eaque nisi voluptas sit, perspiciatis accusantium optio deleniti doloribus minus. Cum unde molestiae amet ducimus
            distinctio deleniti maiores officia vel neque hic? Aspernatur, nostrum?
         </p>
      </div>
   );
};

App.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default App;
