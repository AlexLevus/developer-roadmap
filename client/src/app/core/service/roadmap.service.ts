import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Apollo } from "apollo-angular";
import { Roadmap } from "@data/models/roadmap";
import {
	ADD_ROADMAP_TO_USER,
	CREATE_ROADMAP,
	CREATE_STAGE,
	CREATE_SUBSTAGE,
	DELETE_ROADMAP,
	DELETE_STAGE,
	REMOVE_USER_ROADMAP,
	TOGGLE_STAGE_PROGRESS
} from "@data/graphQL/mutations";
import { Stage } from "@data/models/stage";
import {
	GET_ALL_ROADMAPS,
	GET_ALL_ROADMAPS_INFO,
	GET_ROADMAP,
	GET_USER_ROADMAPS
} from "@data/graphQL/queries";
import {
	CreateRoadmapResponse,
	CreateStageResponse,
	CreateSubstageResponse,
	DeleteRoadmapResponse,
	DeleteStageResponse,
	RoadmapResponse,
	RoadmapsResponse,
	ToggleStageProgressResponse,
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

	createStage(roadmapId: string, text: string) {
		return this.apollo.mutate<CreateStageResponse>({
			mutation: CREATE_STAGE,
			variables: {
				roadmapId,
				text
			},
			refetchQueries: [{ query: GET_ROADMAP, variables: { id: roadmapId } }]
		});
	}

	createSubstage(stage: Stage, roadmapId: string) {
		return this.apollo.mutate<CreateSubstageResponse>({
			mutation: CREATE_SUBSTAGE,
			variables: {
				input: { ...stage, roadmapId }
			}
		});
	}

	toggleStageProgress(
		roadmapId: string,
		stageIds: string[],
		isCompleted: boolean
	) {
		return this.apollo.mutate<ToggleStageProgressResponse>({
			mutation: TOGGLE_STAGE_PROGRESS,
			variables: {
				input: { roadmapId, stageIds, isCompleted }
			}
		});
	}

	deleteStage(stageIds: string[]) {
		return this.apollo.mutate<DeleteStageResponse>({
			mutation: DELETE_STAGE,
			variables: {
				input: { stageIds }
			}
		});
	}

	deleteRoadmap(id: string) {
		return this.apollo.mutate<DeleteRoadmapResponse>({
			mutation: DELETE_ROADMAP,
			variables: {
				id
			},
			refetchQueries: [{ query: GET_ALL_ROADMAPS }]
		});
	}

	getRoadmaps() {
		return this.apollo.watchQuery<RoadmapsResponse>({
			query: GET_ALL_ROADMAPS
		});
	}

	getRoadmapsInfo() {
		return this.apollo.watchQuery<RoadmapsResponse>({
			query: GET_ALL_ROADMAPS_INFO
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
