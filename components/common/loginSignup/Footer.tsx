import Link from "next/link";
import styles from "./Footer.module.scss";

interface Props {
	question: string;
	suggestion: string;
	to: "/login" | "/signup";
}

const Footer = ({ question, suggestion, to }: Props) => {
	const links = [
		{ name: "home", to: "/home" },
		{ name: "about", to: "/about" },
		{ name: "contact us", to: "/contact-us" },
		{ name: "terms of use", to: "/terms-of-use" }
	];

	return (
		<footer className={styles.root}>
			<div className={styles.redirection}>
				<p>
					{question}?
					<Link href={to}>
						<a aria-label="create an account">{suggestion}.</a>
					</Link>
				</p>
			</div>
			<div className={styles.links}>
				{links.map(({ name, to }, idx) => (
					<Link key={idx} href={to}>
						<a>{name}</a>
					</Link>
				))}
			</div>
		</footer>
	);
};

export default Footer;
