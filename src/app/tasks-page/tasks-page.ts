import { Component, computed, signal } from '@angular/core';
import { TaskService } from '../services/task';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
selector: 'app-tasks-page',
  imports: [ReactiveFormsModule],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage {
  taskForm: FormGroup
  showCompletedOnly = signal(false);

  constructor(public taskService: TaskService, private fb: FormBuilder){
      this.taskForm = this.fb.group({
        taskName: ["", [Validators.required]],
        taskStatus: [false]
      })
  }
  
  get completedCount(): number {
    return this.taskService.tasks.filter(task => task.done).length;
  }

  toggleTask(id: number){
    this.taskService.toggleTasks(id);
  }
  
  toggleFilter(){
    this.showCompletedOnly.update((value) => !value )
  }

  onSubmit(){

    const name = String(this.taskForm.value.taskName ?? '').trim();
    const done = this.taskForm.value.taskStatus === true;

    if (!name) {
      this.taskForm.controls['taskName'].setErrors({ required: true });
      return;
    }

    this.taskService.addTask(name, done);
    
    this.taskForm.reset(
      {
        taskName: '',
        taskStatus: false
      }
    );
  }
}
