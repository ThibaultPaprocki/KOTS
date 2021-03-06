import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Event } from "../model/event.model";
import { environment } from "../../../environments/environment";
import { EventRequest } from "../model/event.request";
import { UserParticipation } from "../model/user-participation.model";
import { ValidationRun } from "../model/players.validation.model";

export interface ChallengeRankingModel {
  id: any;
  username: string;
}
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UserRun } from "../model/user-run.model";

@Injectable({
  providedIn: "root",
})
export class EventService {
  public readonly tournamentsChange$ = new BehaviorSubject<string>("init");

  public readonly challengesChange$ = new BehaviorSubject<string>("init");

  constructor(private httpClient: HttpClient) {}

  createTournament(request: EventRequest) {
    return this.httpClient
      .post(environment.url + "tournament/create", request)
      .pipe(
        tap(() => {
          console.log("tournament created");
          this.tournamentsChange$.next("created");
        })
      );
  }

  createChallenge(request: EventRequest) {
    return this.httpClient
      .post(environment.url + "challenge/create", request)
      .pipe(
        tap(() => {
          console.log("challenge created");
          this.challengesChange$.next("created");
        })
      );
  }

  getTournaments() {
    return this.httpClient.get<Event[]>(environment.url + "tournament/get");
  }

  getChallenges() {
    return this.httpClient.get<Event[]>(environment.url + "challenge/get");
  }

  getChallengeRankings(
    challengeId: number
  ): Observable<ChallengeRankingModel[]> {
    return this.httpClient.get<ChallengeRankingModel[]>(
      environment.url + `challenge/${challengeId}/rankings`
    );
  }

  createParticipationTournament(request: UserParticipation) {
    return this.httpClient.post(
      environment.url + "participate/tournament",
      request
    );
  }

  createParticipationChallenge(request: UserParticipation) {
    return this.httpClient.post(
      environment.url + "participate/challenge",
      request
    );
  }

  getParticipationsTournament(idTournament: number): Observable<UserRun[]> {
    return this.httpClient.get<UserRun[]>(
      `${environment.url}participate/tournament/get/${idTournament}`
    );
  }

  getParticipationsChallenge(idChallenge: number): Observable<UserRun[]> {
    return this.httpClient.get<UserRun[]>(
      `${environment.url}participate/challenge/get/${idChallenge}`
    );
  }

  validateParticipationTournament(request: ValidationRun) {
    return this.httpClient.put(
      environment.url + "participate/tournament/validate",
      request
    );
  }

  validateParticipationChallenge(request: ValidationRun) {
    return this.httpClient.put(
      environment.url + "participate/challenge/validate",
      request
    );
  }

  getStateParticipationTournament(request: ValidationRun) {
    return this.httpClient.get<string>(
      `
      ${environment.url}participate/tournament/state/get/${request.idRun}/${request.idEvent}`
    );
  }

  getStateParticipationChallenge(request: ValidationRun) {
    return this.httpClient.get<string>(
      `
      ${environment.url}participate/challenge/state/get/${request.idRun}/${request.idEvent}`
    );
  }
}
