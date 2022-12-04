import { Component, Inject, OnInit } from "@angular/core";
import { Roadmap } from "@data/models/roadmap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RoadmapService } from "@app/service/roadmap.service";
import { MatDialogRef } from "@angular/material/dialog";
import { currentUserVar } from "../../../../graphql.module";
import { TuiNotification, TuiNotificationsService } from "@taiga-ui/core";

@Component({
	selector: "app-create-roadmap",
	templateUrl: "./create-roadmap.component.html",
	styleUrls: ["./create-roadmap.component.scss"]
})
export class CreateRoadmapComponent implements OnInit {
	submitted = false;
	loading = false;

	roadmapForm = new FormGroup({
		name: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required]),
		companyAccess: new FormControl(false, [Validators.required]),
		public: new FormControl(false, [Validators.required])
	});

	constructor(
		private roadmapService: RoadmapService,
		private dialogRef: MatDialogRef<CreateRoadmapComponent>,
		@Inject(TuiNotificationsService)
		private readonly notificationsService: TuiNotificationsService
	) {}

	ngOnInit(): void {}

	createRoadmap() {
		if (this.roadmapForm.invalid) {
			this.roadmapForm.markAllAsTouched();
			return;
		}

		this.loading = true;

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

				this.notificationsService
					.show("План развития успешно создан!", {
						status: TuiNotification.Success
					})
					.subscribe();
			})
			.add(() => {
				this.submitted = false;
				this.loading = false;
			});
	}

	/*	saveStage(stage: Stage) {
		this.roadmapService
			.createSubstage(stage)
			.subscribe()
			.add(() => {
				this.submitted = false;
				this.loading = false;
			});
	}*/
}
