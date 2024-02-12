import {CommonModule} from '@angular/common';
import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../store/projects.model";
import {DatePipe, NgClass} from "@angular/common";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    CommonModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  animations: [
    trigger('toolbarAnimation', [
      state('open', style({
      })),
      state('closed', style({
        width: 0,
        padding: 0
      })),
      transition('open <=> closed', [
        animate('0.3s')
      ]),
    ])
  ]
})
export class ToolbarComponent implements OnInit {
  @Input() project?: Project;

  @Input()
  @HostBinding('class.is-hidden')
  isHidden = true;

  @Output()
  resetProject = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  reset(): void {
    this.resetProject.emit();
  }
}
