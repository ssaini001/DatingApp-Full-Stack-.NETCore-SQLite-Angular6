import { AuthGuard } from './_guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

export const appRoutes: Routes =[
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
            {path: 'messages', component: MessagesComponent},
            {path: 'list', component: ListComponent}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
