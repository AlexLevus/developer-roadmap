import { Component, OnInit } from "@angular/core";
import { Stage } from "@data/models/stage";
import { Roadmap } from "@data/models/roadmap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RoadmapService } from "@app/service/roadmap.service";

@Component({
	selector: "app-create-roadmap",
	templateUrl: "./create-roadmap.component.html",
	styleUrls: ["./create-roadmap.component.scss"]
})
export class CreateRoadmapComponent implements OnInit {
	roadmaps: Roadmap[] = [];
	submitted = false;
	loading = true;

	roadmapForm = new FormGroup({
		name: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});

	constructor(private roadmapService: RoadmapService) {}

	ngOnInit(): void {}

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
				if (data) {
					this.roadmaps = [...this.roadmaps, data.createRoadmap];
				}
			},
			() => {
				this.submitted = false;
			}
		);
	}

	saveStage(stage: Stage) {
		this.roadmapService.createStage(stage).subscribe(
			() => {
				this.submitted = false;
			},
			() => {
				this.submitted = false;
			}
		);
	}
}
