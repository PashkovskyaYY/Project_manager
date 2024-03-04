import {Component, HostListener} from '@angular/core';
import {SidebarComponent} from "../ui/sidebar/sidebar.component";
import {ToolbarComponent} from "../ui/toolbar/toolbar.component";
import {TableComponent} from "../store/table/table.component";
import {Project} from "../store/projects.model";
import {PROJECTS} from "../store/projects.data";
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

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
    RouterLinkActive
  ]
})
export class ViewComponent{
  projects: Project[] = PROJECTS;
  selected?:Project;

  selectProject(project: Project): void {
    this.selected = project;
  }

  @HostListener('click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const tableElement = document.getElementById('table');
    if (!tableElement?.contains(event.target as Node)) {
      this.selected = undefined;
      console.log(this.selected);
    }
  }
}
