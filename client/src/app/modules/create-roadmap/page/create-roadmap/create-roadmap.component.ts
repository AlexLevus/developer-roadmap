import { Component, OnInit } from "@angular/core";
import { Stage } from "@data/models/stage";
import { Roadmap } from "@data/models/roadmap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RoadmapService } from "@app/service/roadmap.service";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";
import { currentUserVar } from "../../../../graphql.module";

@Component({
	selector: "app-create-roadmap",
	templateUrl: "./create-roadmap.component.html",
	styleUrls: ["./create-roadmap.component.scss"]
})
export class CreateRoadmapComponent implements OnInit {
	submitted = false;
	loading = true;

	roadmapForm = new FormGroup({
		name: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required]),
		companyAccess: new FormControl(false, [Validators.required]),
		public: new FormControl(false, [Validators.required])
	});

	constructor(
		private roadmapService: RoadmapService,
		private router: Router,
		private dialogRef: MatDialogRef<CreateRoadmapComponent>
	) {}

	ngOnInit(): void {}

	createRoadmap() {
		if (this.roadmapForm.invalid) {
			this.roadmapForm.markAllAsTouched();
			return;
		}

		const { name, description } = this.roadmapForm.value;

		const roadmap: Pick<Roadmap, "name" | "description"> = {
			name,
			description
		};

		this.roadmapService
			.createRoadmap(roadmap, currentUserVar().id)
			.subscribe(({ data }) => {
				this.roadmapForm.reset();
				this.dialogRef.close();
				this.router.navigate(["/roadmap", data?.createRoadmap.id]);
			})
			.add(() => (this.submitted = false));
	}

	saveStage(stage: Stage) {
		this.roadmapService
			.createStage(stage)
			.subscribe()
			.add(() => (this.submitted = false));
	}
}
