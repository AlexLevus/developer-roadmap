import { NgModule } from "@angular/core";
import { APOLLO_OPTIONS } from "apollo-angular";
import {
	ApolloClientOptions,
	InMemoryCache,
	makeVar
} from "@apollo/client/core";
import { HttpLink } from "apollo-angular/http";
import { User } from "@data/models/user";
import jwt_decode from "jwt-decode";

const uri = "https://developer-roadmap-production.up.railway.app/graphql";

const getUserInfo = (): User => {
	const token = localStorage.getItem("access");
	if (token) {
		const decodedToken = jwt_decode(token) as User;
		decodedToken.departmentId = String(decodedToken.departmentId);
		decodedToken.positionId = String(decodedToken.positionId);
		decodedToken.orgId = String(decodedToken.orgId);
		decodedToken.id = String(decodedToken.id);
		return decodedToken as User;
	} else {
		return {} as User;
	}
};

export const currentUserVar = makeVar<User>(getUserInfo());

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
