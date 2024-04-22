import { CommonModule, DatePipe, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { CreatedProject, Project } from '../../store/projects.model';
import { AddingProjectComponent } from '../form/adding-project/adding-project.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [DatePipe, NgClass, CommonModule, AddingProjectComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  animations: [
    trigger('toolbarAnimation', [
      state('open', style({})),
      state(
        'closed',
        style({
          width: 0,
          padding: 0,
        }),
      ),
      transition('open <=> closed', [animate('0.3s')]),
    ]),
  ],
})
export class ToolbarComponent {
  @Input() project?: Project;
  @Output() projectDelete = new EventEmitter<Project>();

  @Input()
  @HostBinding('class.is-hidden')
  isHidden = true;

  @Input()
  state: string = '';

  @Output()
  resetProject = new EventEmitter<void>();

  @Output()
  createdProject = new EventEmitter<CreatedProject>();

  reset(): void {
    this.resetProject.emit();
  }

  onProjectCreated(newProject: CreatedProject) {
    this.createdProject.emit(newProject); // Передаем данные в "дедушку" ViewComponent
  }

  editProject() {
    this.state = 'editProject';
  }

  deleteProject() {
    this.projectDelete.emit(this.project);
  }
}
