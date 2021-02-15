import { Injectable } from '@angular/core';
import { RoadmapResponse, UserResponse } from "@data/graphQL/types";
import { GET_ROADMAP } from "@data/graphQL/queries";
import { Apollo } from "apollo-angular";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) {}

  getUserById(id: string) {
    return this.apollo.watchQuery<UserResponse>({
      query: GET_ROADMAP,
      variables: {
        id
      }
    });
  }
}
