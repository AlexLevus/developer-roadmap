import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Apollo } from "apollo-angular";
import { Roadmap } from "@data/models/roadmap";
import { CREATE_ROADMAP, CREATE_STAGE } from "@data/graphQL/mutations";
import { Stage } from "@data/models/stage";
import { GET_ALL_ROADMAPS, GET_ROADMAP } from "@data/graphQL/queries";
import {
	CreateRoadmapResponse,
	CreateStageResponse,
	RoadmapResponse,
	RoadmapsResponse
} from "@data/graphQL/types";

@Injectable({ providedIn: "root" })
export class RoadmapService {
	public error$: Subject<string> = new Subject<string>();

	constructor(private apollo: Apollo) {}

	createRoadmap(roadmap: Partial<Roadmap>) {
		return this.apollo.mutate<CreateRoadmapResponse>({
			mutation: CREATE_ROADMAP,
			variables: {
				input: roadmap
			}
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
}
