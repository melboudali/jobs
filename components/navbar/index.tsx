import Link from "next/link";
import styles from "./index.module.scss";
import variables from "../../styles/variables.module.scss";
import Logo from "./logo";

interface Props {
	name: string;
	href: string;
	last: boolean;
}

const Navbar = () => {
	const links = [
		{ name: "how it works", href: "/how-it-works" },
		{ name: "pricing", href: "/pricing" },
		{ name: "blog", href: "/blog" },
		{ name: "about", href: "/about" },
		{ name: "support", href: "/support" },
		{ name: "contact", href: "/contact" },
		{ name: "Start Free", href: "/login" }
	];

	return (
		<div className={styles.navbar}>
			<Logo />
			<nav className={styles.navber__nav}>
				<ul>
					{links.map(({ name, href }, idx) => (
						<li key={idx} className={styles.navber__nav__li}>
							<CustomLink name={name} href={href} last={idx === links.length - 1} />
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

const CustomLink = ({ name, href, last }: Props) => (
	<Link href={href}>
		<a>
			{last ? (
				<>
					<span>{name}</span>
					<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1L5 5L1 9" stroke={variables.colorWhite} strokeWidth="2" strokeLinecap="round" />
					</svg>
				</>
			) : (
				name
			)}
		</a>
	</Link>
);

export default Navbar;
