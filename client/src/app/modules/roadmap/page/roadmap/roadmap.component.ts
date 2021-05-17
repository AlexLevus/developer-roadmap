import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RoadmapService } from "@app/service/roadmap.service";
import { BehaviorSubject } from "rxjs";
import { TreeNode } from "@data/models/treeNode";
import { Stage } from "@data/models/stage";
import { Roadmap } from "@data/models/roadmap";
import { currentUserVar } from "../../../../graphql.module";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
	selector: "app-roadmap",
	templateUrl: "./roadmap.component.html",
	styleUrls: ["./roadmap.component.scss"]
})
export class RoadmapComponent implements OnInit {
	constructor(
		private roadmapService: RoadmapService,
		private route: ActivatedRoute
	) {}

	treeData$: BehaviorSubject<TreeNode[]> = new BehaviorSubject<TreeNode[]>([]);
	submitted = false;
	loading = true;
	roadmap!: Roadmap;
	isViewMode = false;
	canUserEdit = false;

	readonly stageForm = new FormGroup({
		stageText: new FormControl(null)
	});

	ngOnInit(): void {
		this.loadRoadmaps();
	}

	private loadRoadmaps() {
		const { roadmapId } = this.route.snapshot.params;
		this.roadmapService
			.getRoadmap(roadmapId)
			.valueChanges.subscribe(({ data, loading }) => {
				const { roadmap } = data;
				this.roadmap = roadmap;
				this.canUserEdit = this.roadmap.author.id === currentUserVar().id;
				this.treeData$.next(
					this.arrangeIntoTree(roadmap.stages, [
						"id",
						"roadmapId",
						"isCompleted"
					])
				);
				this.loading = loading;
			});

		this.roadmapService
			.getUserRoadmaps(currentUserVar().id)
			.valueChanges.subscribe(({ data }) => {
				const userRoadmapsIds = data.userRoadmaps.reduce(
					(acc: string[], cur) => [...acc, cur?.id],
					[]
				);

				this.isViewMode = !userRoadmapsIds.includes(roadmapId);
			});
	}

	private arrangeIntoTree(nodes: any[], optionalProps: string[]): TreeNode[] {
		const tree: any[] = [];
		nodes
			.slice()
			.sort((a, b) => a.path.localeCompare(b.path))
			.forEach((node) => {
				const paths: any[] = [[...node.path.split(".")]];
				paths.forEach((path: string[]) => {
					let currentLevel = tree;
					path.forEach((part: string) => {
						const existingPath = this.findWhere(currentLevel, "path", part);

						if (existingPath?.children) {
							currentLevel = existingPath.children;
						} else {
							const props = optionalProps.reduce((obj, prop) => {
								return {
									...obj,
									[prop]: node[prop]
								};
							}, {});
							const newPart = {
								name: node.name,
								path: node.path,
								children: [],
								...props
							};
							currentLevel.push(newPart);
							currentLevel = newPart.children;
						}
					});
				});
			});

		return tree;
	}

	private findWhere(
		array: TreeNode[],
		key: string,
		value: string
	): TreeNode | null {
		let t = 0;
		while (
			t < array.length &&
			array[t][key][array[t][key].length - 1] !== value
		) {
			t++;
		}
		if (t < array.length) {
			return array[t];
		}

		return null;
	}

	createSubstage(stage: Stage) {
		this.roadmapService.createSubstage(stage, this.roadmap.id).subscribe();
	}

	createStage() {
		const text = this.stageForm.value.stageText;
		this.roadmapService.createStage(this.roadmap.id, text).subscribe();
	}

	toggleStageProgress(stages: { id: string[]; isCompleted: boolean }) {
		this.roadmapService
			.toggleStageProgress(this.roadmap.id, stages.id, stages.isCompleted)
			.subscribe();
	}
}
