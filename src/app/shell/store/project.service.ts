import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';

import { CreatedProject, ProjectBatch } from './projects.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  protected _URL: string = 'http://localhost:8081';
  constructor(private _http: HttpClient) {}

  getAllProjects(): Observable<ProjectBatch> {
    return this._http.get<ProjectBatch>(`/api/projects`);
  }

  getProjectById(id: string): Observable<ProjectBatch> | undefined {
    return this._http.get<ProjectBatch>(`/api/projects/{projectId}`);
  }

  addProject(project: CreatedProject): Observable<ProjectBatch> {
    return this._http.post<ProjectBatch>(`/api/projects`, project);
  }

  updateProject(project: CreatedProject): Observable<ProjectBatch> {
    return this._http.put<ProjectBatch>(`/api/projects/${project.id}`, project);
  }

  deleteProject(id: string): Observable<ProjectBatch | null> {
    console.log('DELETE');

    return this._http.delete<ProjectBatch>(`/api/projects/${id}`);
    // .pipe(catchError(() => of(null)));
  }
}
