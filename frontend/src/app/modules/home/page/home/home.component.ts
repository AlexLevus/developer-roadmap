import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Roadmap, Stage } from "@app/data/schema/roadmap";
import { RoadmapService } from "@app/service/roadmap.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
	roadmaps: Roadmap[] = [];
	submitted = false;
	loading = true;
	displayedColumns: string[] = ["position", "name", "description"];

	roadmapForm = new FormGroup({
		name: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});

	stageForm = new FormGroup({
		name: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});

	constructor(private roadmapService: RoadmapService) {}

	ngOnInit(): void {
		this.roadmapService
			.getRoadmaps()
			.valueChanges.subscribe(({ data, loading }) => {
				this.roadmaps = data.roadmaps;
				this.loading = loading;
			});
	}

	createRoadmap() {
		if (this.roadmapForm.invalid) {
			this.roadmapForm.markAllAsTouched();
			return;
		}

		const { name, description } = this.roadmapForm.value;

		console.log(name, description);

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

		const { name, description } = this.stageForm.value;

		console.log(name, description);

		const stage: Stage = {
			name,
			description
		};

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
		this.roadmapService
			.getRoadmapById(roadmap.id)
			.valueChanges.subscribe(({ data, loading }) => {
				const { roadmapById } = data;
				console.log(roadmapById);
			});
	}
}
