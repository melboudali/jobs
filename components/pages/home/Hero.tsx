import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.scss";

const Hero = () => (
   <section className={styles.root}>
      <div className={styles.hero}>
         <h1 className={styles.hero__title}>We&apos;re here to make hiring a little easier. Let&apos;s give it a try.</h1>
         <Link href="/">
            <a className={styles.hero__link}>post a job for free</a>
         </Link>
      </div>
      <Image src="/hero.jpg" alt="hero image" layout="fill" objectFit="cover" quality={100} priority />
   </section>
);

export default Hero;
