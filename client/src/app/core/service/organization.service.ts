import { Injectable } from "@angular/core";
import { CREATE_ORGANIZATION } from "@data/graphQL/mutations";
import { Apollo } from "apollo-angular";

@Injectable({
	providedIn: "root"
})
export class OrganizationService {
	constructor(private apollo: Apollo) {}

	createOrganization(name: string, directorId: string) {
		return this.apollo.mutate({
			mutation: CREATE_ORGANIZATION,
			variables: {
				name,
				directorId
			}
		});
	}
}
