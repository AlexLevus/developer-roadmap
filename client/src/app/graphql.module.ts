import { NgModule } from "@angular/core";
import { APOLLO_OPTIONS } from "apollo-angular";
import {
	ApolloClientOptions,
	InMemoryCache,
	makeVar
} from "@apollo/client/core";
import { HttpLink } from "apollo-angular/http";
import { User } from "@data/models/user";

const uri = "http://localhost:3000/graphql";

// Create the initial value

// Create the todos var and initialize it with the initial value
export const currentUserVar = makeVar<User>(
	JSON.parse(localStorage.getItem("user")!)
);

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
	const cache = new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					currentUser: {
						read() {
							console.log("currentUser");
							return currentUserVar();
						}
					}
				}
			}
		}
	});

	return {
		link: httpLink.create({ uri }),
		cache
	};
}

@NgModule({
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
			deps: [HttpLink]
		}
	]
})
export class GraphQLModule {}
