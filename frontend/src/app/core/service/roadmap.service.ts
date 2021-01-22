import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Roadmap, Stage } from "@data/schema/roadmap";

const createRoadmap = gql`
	mutation createRoadmap($input: CreateRoadmapInput!) {
		createRoadmap(input: $input) {
			id
			name
			description
		}
	}
`;

const createStage = gql`
	mutation createStage($input: CreateStageInput!) {
		createStage(input: $input) {
			name
			path
			roadmapId
		}
	}
`;

const GET_ALL_ROADMAPS = gql`
	{
		roadmaps {
			id
			name
			description
			stages {
				id
				name
				path
				roadmapId
			}
		}
	}
`;

const GET_ROADMAP = gql`
	query roadmapById($id: String!) {
		roadmapById(id: $id) {
			id
			name
			description
			stages {
				name
			}
		}
	}
`;

type Response = {
	roadmaps: Roadmap[];
};

type RoadmapByIdResponse = {
	roadmapById: {
		id: string;
		description: string;
		stages: Stage[];
	};
};

@Injectable({ providedIn: "root" })
export class RoadmapService {
	public error$: Subject<string> = new Subject<string>();

	constructor(private apollo: Apollo) {}

	createRoadmap(roadmap: Partial<Roadmap>) {
		return this.apollo.mutate({
			mutation: createRoadmap,
			variables: {
				input: roadmap
			}
		});
	}

	createStage(stage: Stage) {
		return this.apollo.mutate<Response>({
			mutation: createStage,
			variables: {
				input: stage
			}
		});
	}

	getRoadmaps() {
		return this.apollo.watchQuery<Response>({
			query: GET_ALL_ROADMAPS
		});
	}

	getRoadmapById(id: string) {
		return this.apollo.watchQuery<RoadmapByIdResponse>({
			query: GET_ROADMAP,
			variables: {
				id
			}
		});
	}
}
