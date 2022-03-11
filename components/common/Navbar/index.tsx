import Link from "next/link";
import Logo from "./Logo";
import styles from "./Navbar.module.scss";

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
			<nav className={styles.navbar__nav}>
				<ul>
					{links.map(({ name, href }, idx) => (
						<li key={idx} className={styles.navbar__nav__li}>
							<CustomLink name={name} href={href} last={idx === links.length - 1} />
						</li>
					))}
				</ul>
			</nav>
			<button className={styles.navbar__hamburger} aria-label="menu" onClick={() => console.log("menu clicked")}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2 5L22 5" strokeWidth="3" strokeLinecap="round" />
					<path d="M8 12L22 12" strokeWidth="3" strokeLinecap="round" />
					<path d="M14 19L22 19" strokeWidth="3" strokeLinecap="round" />
				</svg>
			</button>
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
						<path d="M1 1L5 5L1 9" strokeWidth="2" strokeLinecap="round" />
					</svg>
				</>
			) : (
				name
			)}
		</a>
	</Link>
);

export default Navbar;
