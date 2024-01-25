// Zod imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// React router dom imports
import { Link, useNavigate } from "react-router-dom";

// React hook form imports
import { useForm } from "react-hook-form";

// Context
import { useUserContext } from "@/context/AuthContext";

// Validation imports
import { SignupValidation } from "@/lib/validation";

// Tanstack hooks imports
import {
	useCreateUserAccount,
	useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";

// Shadcn components
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Components
import Loader from "@/components/shared/Loader";

const SignupForm = () => {
	// Toast intit
	const { toast } = useToast();

	// Context
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

	const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
		useCreateUserAccount();

	const { mutateAsync: signInAccount, isPending: isSigningInUser } =
		useSignInAccount();

	const navigate = useNavigate();

	// 1. Define your form.
	const form = useForm<z.infer<typeof SignupValidation>>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof SignupValidation>) {
		// Create the user
		const newUser = await createUserAccount(values);

		if (!newUser) {
			return toast({
				title: "Sign up failed. Please try again.",
			});
		}

		// If everything went well we create a session
		const session = await signInAccount({
			email: values.email,
			password: values.password,
		});

		if (!session) {
			return toast({ title: "Sign in failed. Please try again." });
		}

		// If we have a session we need to store it in our react context ALWAYS
		const isLoggedIn = await checkAuthUser();

		if (isLoggedIn) {
			form.reset();
			navigate("/");
		} else {
			return toast({ title: "Sign in failed. Please try again." });
		}
	}

	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col">
				<img src="/assets/images/logo.svg" alt="logo" />

				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
					Create a new account
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2">
					To use Snapgram, please enter your account details
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5 w-full mt-4"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input type="text" className="shad-input" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input type="text" className="shad-input" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" className="shad-input" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" className="shad-input" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="shad-button_primary">
						{isCreatingAccount || isSigningInUser || isUserLoading ? (
							<div className="flex-center gap-2">
								<Loader />
								Loading...
							</div>
						) : (
							"Sign up"
						)}
					</Button>
					<p className="text-small-regular text-light-2 text-center mt-2">
						Already have an account?
						<Link
							to="/sign-in"
							className="text-primary-500 text-small-semibold ml-1"
						>
							Log in
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignupForm;
