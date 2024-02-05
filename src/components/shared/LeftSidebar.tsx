// React imports
import { useEffect } from "react";

// React rotuer dom imports
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

// Context
import { useUserContext } from "@/context/AuthContext";

// Mutations and queries
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

// Constants import
import { sidebarLinks } from "@/constants";

// Types imports
import { INavLink } from "@/types";

// Shadcn components
import { Button } from "@/components/ui/button";

const LeftSidebar = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const { user } = useUserContext();

	useEffect(() => {
		if (isSuccess) navigate(0);
	}, [isSuccess]);

	return (
		<nav className="leftsidebar">
			<div className="flex flex-col gap-11">
				<Link to="/" className="flex gap-3 items-center">
					<img
						src="/assets/images/logo.svg"
						alt="logo"
						width={170}
						height={36}
					/>
				</Link>

				<Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
					<img
						src={user.imageUrl || "assets/icons/profile-placeholder.svg"}
						alt="profile"
						className="h-14 w-14 rounded-full"
					/>
					<div className="flex flex-col">
						<p className="body-bold">{user.name}</p>
						<p className="small-regular text-light-3">{user.username}</p>
					</div>
				</Link>

				<ul className="flex flex-col gap-6">
					{sidebarLinks.map((link: INavLink) => {
						const isActive = pathname === link.route;

						return (
							<li
								key={link.label}
								className={`leftsidebar-link group ${
									isActive && "bg-primary-500"
								}`}
							>
								<NavLink
									to={link.route}
									className="flex gap-4 items-center p-4"
								>
									<img
										src={link.imgURL}
										alt={link.label}
										className={`group-hover:invert-white ${
											isActive && "invert-white"
										}`}
									/>
									{link.label}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="flex items-center">
				<Button
					variant="ghost"
					className="shad_button_ghost"
					onClick={() => signOut()}
				>
					<img src="/assets/icons/logout.svg" alt="logout" />
				</Button>
				<p className="small-medium lg:base-medium">Logout</p>
			</div>
		</nav>
	);
};

export default LeftSidebar;
