import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { AddroomComponent } from './addroom/addroom.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

import { HomeComponent } from './auth/home';
import { AuthGuard } from './auth/_helpers';

const accountModule = () => import('./auth/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./auth/users/users.module').then(x => x.UsersModule);


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },

  { path: 'messagerie', component: MessagerieComponent },
  { path: 'roomlist', component: RoomlistComponent },
  { path: 'addroom', component: AddroomComponent },
  { path: 'chatroom/:roomname', component: ChatroomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  MessagerieComponent
];
