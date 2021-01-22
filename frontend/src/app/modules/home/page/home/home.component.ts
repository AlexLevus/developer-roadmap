import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Roadmap, Stage, StageNode } from "@data/schema/roadmap";
import { RoadmapService } from "@app/service/roadmap.service";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
	treeControl = new NestedTreeControl<StageNode>(node => node.children);
	dataSource = new MatTreeNestedDataSource<StageNode>();
	stages: Stage[] = [];
	roadmaps: Roadmap[] = [];
	submitted = false;
	loading = true;
	displayedColumns: string[] = ["name", "description"];
	displayedColumnsStages: string[] = ["content", "completed"];

	selectedValue = "";

	roadmapForm = new FormGroup({
		name: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});

	stageForm = new FormGroup({
		name: new FormControl(null, [Validators.required]),
		roadmapId: new FormControl(null, [Validators.required])
	});

	constructor(private roadmapService: RoadmapService) {}

	hasChild = (_: number, node: StageNode) =>
		!!node.children && node.children.length > 0;

	ngOnInit(): void {
		this.roadmapService
			.getRoadmaps()
			.valueChanges.subscribe(({ data, loading }) => {
				this.roadmaps = data.roadmaps;
				this.dataSource.data = this.arrangeIntoTree(this.roadmaps);
				console.log(this.roadmaps);
				this.loading = loading;
			});
	}

	findWhere(array: StageNode[], key: string, value: string): StageNode | null {
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

	private arrangeIntoTree(roadmaps: Roadmap[]): StageNode[] {
		const stages: Stage[] = [];
		roadmaps.forEach(map => map.stages.forEach(stage => stages.push(stage)));

		const tree: StageNode[] = [];

		stages.forEach(stage => {
			const paths: any[] = [[...stage.path.split(".")]];
			paths.forEach((path: string[]) => {
				let currentLevel = tree;
				path.forEach((part: string) => {
					const existingPath = this.findWhere(currentLevel, "path", part);

					if (existingPath?.children) {
						currentLevel = existingPath.children;
					} else {
						const newPart = {
							name: stage.name,
							path: stage.path,
							roadmaoId: stage.roadmapId,
							children: []
						};

						currentLevel.push(newPart);
						currentLevel = newPart.children;
					}
				});
			});
		});

		return tree;
	}

	createRoadmap() {
		if (this.roadmapForm.invalid) {
			this.roadmapForm.markAllAsTouched();
			return;
		}

		const { name, description } = this.roadmapForm.value;

		const roadmap: Partial<Roadmap> = {
			name,
			description
		};

		this.roadmapService.createRoadmap(roadmap).subscribe(
			({ data }) => {
				this.roadmapForm.reset();
				this.submitted = false;

				// @ts-ignore
				this.roadmaps = [...this.roadmaps, data.createRoadmap];
			},
			() => {
				this.submitted = false;
			}
		);
	}

	createStage() {
		if (this.stageForm.invalid) {
			this.stageForm.markAllAsTouched();
			return;
		}

		const { name, roadmapId } = this.stageForm.value;
		const roadmap = this.roadmaps.filter(map => map.id === roadmapId)[0];
		const newId = String(roadmap.stages?.length + 1) ?? "1";

		const stage: Stage = {
			name,
			path: "",
			newId,
			roadmapId
		};

		console.log(stage);

		this.roadmapService.createStage(stage).subscribe(
			() => {
				this.stageForm.reset();
				this.submitted = false;
			},
			() => {
				this.submitted = false;
			}
		);
	}

	getRecord(roadmap: Roadmap) {
		console.log(roadmap);
		this.roadmapService
			.getRoadmapById(roadmap.id)
			.valueChanges.subscribe(({ data, loading }) => {
				const { roadmapById } = data;
				this.stages = roadmapById.stages;
				console.log(this.stages);
			});
	}
}
