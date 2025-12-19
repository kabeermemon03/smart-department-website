import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./components/pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'faculty', loadComponent: () => import('./components/pages/faculty/faculty.component').then(m => m.FacultyComponent) },
  { path: 'academics', loadComponent: () => import('./components/pages/academics/academics.component').then(m => m.AcademicsComponent) },
  { path: 'results', loadComponent: () => import('./components/pages/results/results.component').then(m => m.ResultsComponent) },
  { path: 'notices', loadComponent: () => import('./components/pages/notices/notices.component').then(m => m.NoticesComponent) },
  { path: 'contact', loadComponent: () => import('./components/pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'developers', loadComponent: () => import('./components/pages/developers/developers.component').then(m => m.DevelopersComponent) },
  { path: 'admin', loadComponent: () => import('./components/pages/admin/admin.component').then(m => m.AdminComponent) },
  { path: '**', redirectTo: '' }
];