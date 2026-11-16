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

  completedCount = signal(2);
  totalCount = signal(5);
  remainingTask = computed(() => this.totalCount() - this.completedCount());

  constructor(public taskService: TaskService, private fb: FormBuilder){
      this.taskForm = this.fb.group({
        taskName: ["", [Validators.required, Validators.minLength(5)]],
        taskStatus: [false]
      })
  }
  
  toggleTask(id: number){
    this.taskService.toggleTasks(id);
  }
  
  toggleFilter(){
    this.showCompletedOnly.update((value) => !value )
  }

  onSubmit(){
    console.log("new Task is added", this.taskForm.valid);
    console.log("new Task is added", this.taskForm.value);
    if(this.taskForm.valid){
      this.taskService.addTask(this.taskForm.value.taskName, this.taskForm.value.taskStatus);
    }
    this.taskForm.reset();
  }
}
