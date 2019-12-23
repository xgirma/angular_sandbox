import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor() { }

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmSource = new Subject<string>();

  // Observable string stream
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmSource.asObservable();

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  confirmMission(astronaut: string) {
    this.missionConfirmSource.next(astronaut);
  }
}
