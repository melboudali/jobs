import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

type Data = {
   status: number;
   message: string;
};

type Body = {
   key: string;
};

type dataType = {
   success: boolean;
};

const verifyCaptcha = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   let status = 401;
   let message = "Unauthorized";
   if (req.method === "POST" && process.env.RECAPTCHA_SECRET_KEY) {
      if (!req.body.key) {
         status = 406;
         message = "Unproccesable request, please provide the required fields";
         return res.status(status).json({ status, message });
      }

      const { key }: Body = req.body;

      try {
         const res = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${key}`,
            {
               method: "POST",
            }
         );

         const data: dataType = (await res.json()) as any;

         if (data.success) {
            status = 200;
            message = "success";
         } else {
            status = 406;
            message = "Unproccesable request, Invalid captcha code";
         }
      } catch (error) {
         status = 500;
         message = "Something went wrong";
      }
   }
   return res.status(status).json({ status, message });
};

export default verifyCaptcha;
