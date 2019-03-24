import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent, resolve:{users:MemberListResolver}},
            {path: 'members/:id', component: MemberDetailComponent, resolve:{user: MemberDetailResolver}},
            {path: 'messages', component: MessagesComponent},
            {path: 'list', component: ListComponent}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
