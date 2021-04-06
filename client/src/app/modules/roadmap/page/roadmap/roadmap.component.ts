import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RoadmapService } from "@app/service/roadmap.service";
import { BehaviorSubject } from "rxjs";
import { TreeNode } from "@data/models/treeNode";
import { Stage } from "@data/models/stage";
import { Roadmap } from "@data/models/roadmap";

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

	ngOnInit(): void {
		const { roadmapId } = this.route.snapshot.params;
		this.roadmapService
			.getRoadmap(roadmapId)
			.valueChanges.subscribe(({ data, loading }) => {
				const { roadmap } = data;
				this.roadmap = roadmap;
				this.treeData$.next(
					this.arrangeIntoTree(roadmap.stages, ["roadmapId"])
				);
				this.loading = loading;
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

	saveStage(stage: Stage) {
		this.roadmapService
			.createStage(stage)
			.subscribe()
			.add(() => (this.submitted = false));
	}
}
