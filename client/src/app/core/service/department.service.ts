import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Apollo } from "apollo-angular";
import { GET_ORGANIZATION_DEPARTMENTS } from "@data/graphQL/queries";
import { GetOrganizationDepartmentsResponse } from "@data/graphQL/types";
import { CREATE_DEPARTMENT } from "@data/graphQL/mutations";

@Injectable({ providedIn: "root" })
export class DepartmentService {
	public error$: Subject<string> = new Subject<string>();

	constructor(private apollo: Apollo) {}

	getOrganizationDepartments(orgId: string) {
		return this.apollo.watchQuery<GetOrganizationDepartmentsResponse>({
			query: GET_ORGANIZATION_DEPARTMENTS,
			variables: {
				orgId
			}
		});
	}

	createDepartment(name: string, description: string, orgId: string) {
		return this.apollo.mutate({
			mutation: CREATE_DEPARTMENT,
			variables: {
				name,
				description,
				orgId
			},
			refetchQueries: [
				{ query: GET_ORGANIZATION_DEPARTMENTS, variables: { orgId } }
			]
		});
	}
}
