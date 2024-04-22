import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

import {Project} from "../projects.model";
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() projects: Project[] = [];
  @Output() projectClicked = new EventEmitter<Project>();

  onProjectClick(project:Project) {
    this.projectClicked.emit(project);
  }

}
