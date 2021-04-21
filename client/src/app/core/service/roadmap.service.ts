import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Apollo } from "apollo-angular";
import { Roadmap } from "@data/models/roadmap";
import {
	ADD_ROADMAP_TO_USER,
	CREATE_ROADMAP,
	CREATE_STAGE,
	REMOVE_USER_ROADMAP
} from "@data/graphQL/mutations";
import { Stage } from "@data/models/stage";
import {
	GET_ALL_ROADMAPS,
	GET_ROADMAP,
	GET_USER_ROADMAPS
} from "@data/graphQL/queries";
import {
	CreateRoadmapResponse,
	CreateStageResponse,
	RoadmapResponse,
	RoadmapsResponse,
	UserRoadmapsResponse
} from "@data/graphQL/types";

@Injectable({ providedIn: "root" })
export class RoadmapService {
	public error$: Subject<string> = new Subject<string>();

	constructor(private apollo: Apollo) {}

	createRoadmap(
		roadmap: Pick<Roadmap, "name" | "description">,
		authorId: string
	) {
		return this.apollo.mutate<CreateRoadmapResponse>({
			mutation: CREATE_ROADMAP,
			variables: {
				name: roadmap.name,
				description: roadmap.description,
				authorId
			},
			refetchQueries: [{ query: GET_ALL_ROADMAPS }]
		});
	}

	createStage(stage: Stage) {
		return this.apollo.mutate<CreateStageResponse>({
			mutation: CREATE_STAGE,
			variables: {
				input: stage
			}
		});
	}

	getRoadmaps() {
		return this.apollo.watchQuery<RoadmapsResponse>({
			query: GET_ALL_ROADMAPS
		});
	}

	getRoadmap(id: string) {
		return this.apollo.watchQuery<RoadmapResponse>({
			query: GET_ROADMAP,
			variables: {
				id
			}
		});
	}

	getUserRoadmaps(userId: string) {
		return this.apollo.watchQuery<UserRoadmapsResponse>({
			query: GET_USER_ROADMAPS,
			variables: {
				userId
			}
		});
	}

	addRoadmapToUser(roadmapId: string, userId: string) {
		return this.apollo.mutate<boolean>({
			mutation: ADD_ROADMAP_TO_USER,
			variables: {
				roadmapId,
				userId
			},
			refetchQueries: [{ query: GET_USER_ROADMAPS, variables: { userId } }]
		});
	}

	removeRoadmapFromUser(roadmapId: string, userId: string) {
		return this.apollo.mutate<boolean>({
			mutation: REMOVE_USER_ROADMAP,
			variables: {
				roadmapId,
				userId
			},
			refetchQueries: [{ query: GET_USER_ROADMAPS, variables: { userId } }]
		});
	}
}
