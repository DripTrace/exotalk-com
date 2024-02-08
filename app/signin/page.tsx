import { BuiltInProviderType } from "next-auth/providers/index";
import {
	getProviders,
	signIn,
	getSession,
	getCsrfToken,
	LiteralUnion,
	ClientSafeProvider,
} from "next-auth/react";

import styles from "../styles/Signin.module.css";

type providerType = Promise<Record<
	LiteralUnion<BuiltInProviderType>,
	ClientSafeProvider
> | null>;

function signin(getProviders: providerType) {
	// console.log("getProviders: ", getProviders);
	return (
		<div className={styles.container}>
			{Object.values(getProviders).map((provider) => {
				// console.log("providers: ", provider);

				return (
					<div key={provider.name}>
						<button onClick={() => signIn(provider.id)}>
							Sign in with {provider.name}
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default signin;

// export async function getServerSideProps(context: any) {
// 	return {
// 		props: {
// 			providers: await getProviders(),
// 		},
// 	};
// }

// export async function getServerSideProps(context: any) {
// 	const { req } = context;
// 	const session = await getSession({ req });

// 	if (session) {
// 		return {
// 			redirect: { destination: "/" },
// 		};
// 	}

// 	return {
// 		props: {
// 			providers: await getProviders(),
// 			csrfToken: await getCsrfToken(context),
// 		},
// 	};
// }
