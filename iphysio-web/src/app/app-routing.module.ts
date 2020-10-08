import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { AddroomComponent } from './addroom/addroom.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { ChatroomComponent } from './chatroom/chatroom.component';


const routes: Routes = [
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
