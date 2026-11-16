import { Routes } from '@angular/router';
import { TasksPage } from './tasks-page/tasks-page';
import { AboutPage } from './about-page/about-page';

export const routes: Routes = [
    {path: '', component: TasksPage},
    {path: 'tasks', component: TasksPage},
    {path: 'about', component: AboutPage}
];
