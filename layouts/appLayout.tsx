interface Props {
	children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => <main style={{ backgroundColor: "red" }}>{children}</main>;

export default AppLayout;
