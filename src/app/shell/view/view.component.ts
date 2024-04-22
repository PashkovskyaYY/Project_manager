import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgIf, NgSwitch } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../ui/sidebar/sidebar.component';
import { ToolbarComponent } from '../ui/toolbar/toolbar.component';
import { TableComponent } from '../store/table/table.component';
import { CreatedProject, Project } from '../store/projects.model';
import { ProjectService } from '../store/project.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  standalone: true,
  imports: [
    SidebarComponent,
    ToolbarComponent,
    TableComponent,
    NgIf,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NgSwitch,
  ],
})
export class ViewComponent implements OnInit {
  projects: Project[] = [];
  selected?: Project;
  toolbarState:
    | 'default'
    | 'tableProject'
    | 'createProject'
    | 'editProject'
    | 'other' = 'default';
  createdProject?: CreatedProject;

  constructor(
    private projectService: ProjectService,
    private oidcSecurityService: OidcSecurityService,
  ) {}

  selectProject(project: Project): void {
    this.selected = project;
    this.toolbarState = 'tableProject';
    console.log('selectProject ' + this.toolbarState);
  }

  logout() {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => {});
  }

  // @HostListener('click', ['$event'])
  // onDocumentClick(event: MouseEvent) {
  //   const tableElement = document.getElementById('table');
  //   const toolbarElement = document.getElementById('toolbar');
  //   if (!tableElement?.contains(event.target as Node) || !toolbarElement?.contains(event.target as Node)) {
  //     this.selected = undefined;
  //   }
  // }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects.content;
    });
  }

  setValues(): void {
    this.selected = undefined;
    this.toolbarState = 'default';
  }

  checkHidden(): boolean {
    if (this.toolbarState === 'default' || !this.selected) {
      return false;
    } else {
      return true;
    }
  }

  onCreateProject(newProject: CreatedProject) {
    this.createdProject = newProject;
    if (this.createdProject) {
      console.log(this.createdProject);
      this.projectService.addProject(this.createdProject).subscribe(() => {});
    } else {
      console.error('No project created yet');
    }
  }

  addProject() {
    this.toolbarState = 'createProject';
  }

  onDeleteProject({ id }: Project) {
    if (id) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          console.log('next');
          this.projects = this.projects.filter((prj) => prj.id !== id);
        },
        error: () => {
          console.log('err');
          this.projects = this.projects.filter((prj) => prj.id !== id);
        },
        complete: () => {
          this.projects = this.projects.filter((prj) => prj.id !== id);
        },
      });
      this.setValues();
    }
  }

  onUpdateProject(updatedProject: CreatedProject) {}
}
