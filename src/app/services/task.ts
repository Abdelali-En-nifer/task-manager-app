import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = [
    {id: 1, name: 'Task 1', done: false},
    {id: 2, name: 'Task 2', done: true},
    {id: 3, name: 'Task 3', done: true}
  ];

  toggleTasks(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if(task){
      task.done = !task.done
    }
  }

  addTask(name: string, done: boolean){
    const newTask = {
      id: this.tasks.length + 1,
      name: name, // oder einfach -> name,
      done: done // oder -> done
    };
    this.tasks.push(newTask);
  }

}
