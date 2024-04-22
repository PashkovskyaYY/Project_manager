import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

import { CreatedProject } from '../../../store/projects.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-adding-project',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './adding-project.component.html',
  styleUrl: './adding-project.component.scss',
})
export class AddingProjectComponent implements OnInit {
  @Output() createdProject = new EventEmitter<CreatedProject>();
  name = new FormControl('', Validators.required);
  description = new FormControl('');
  projectForm: FormGroup = new FormGroup({});
  @Input()
  toolbarState: string = '';

  ngOnInit() {
    this.projectForm = new FormGroup({
      id: new FormControl(uuidv4(), Validators.required),
      name: this.name,
      description: this.description,
    });
  }

  reset() {}

  onSubmit() {
    this.createdProject.emit(this.projectForm.value);
  }
}
