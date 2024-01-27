// Using tanstack (react-query) to simplify data fetching and mutations getting a lot of
// functionalities out of the box!
import {
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
} from "@tanstack/react-query";

// Appwrite api functions
import { createUserAccount, signInAccount } from "../appwrite/api";

// Types imports
import { INewUser } from "@/types";

export const useCreateUserAccount = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUserAccount(user),
	});
};

export const useSignInAccount = () => {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) =>
			signInAccount(user),
	});
};
