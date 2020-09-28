import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagerieComponent } from './messagerie/messagerie.component';


const routes: Routes = [
  { path: 'messagerie', component: MessagerieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  MessagerieComponent
];
