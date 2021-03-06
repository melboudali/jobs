import Image from "next/image";
import cls from "classnames";
import data from "@data/callouts.json";
import styles from "./Callouts.module.scss";
import Link from "next/link";

interface Props {
   image: string;
   title: string;
   description: string;
   buttonText: string;
   right: boolean;
}

const Callouts = () => {
   return (
      <>
         {data.map(({ id, image, title, description, buttonText, right }) => (
            <Callout key={id} image={image} title={title} description={description} buttonText={buttonText} right={right} />
         ))}
      </>
   );
};

const Callout = ({ image, title, description, buttonText, right }: Props) => {
   const callout__image = cls(styles.callout__image, {
      [styles["callout__image--right"]]: right,
   });

   const callout__details = cls(styles.callout__details, {
      [styles["callout__details--right"]]: right,
   });

   return (
      <div className={styles.root}>
         <div className={callout__image}>
            <Image
               src={image}
               alt="callout image"
               layout="fill"
               objectFit="cover"
               quality={100}
               className={styles.callout__image__img}
               priority
            />
         </div>
         <div className={callout__details}>
            <div className={styles.callout__details__wrapper}>
               <h2>{title}</h2>
               <p>{description}</p>
               <Link href="/login">
                  <a>{buttonText}</a>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Callouts;
