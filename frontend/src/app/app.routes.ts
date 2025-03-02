import {Routes} from '@angular/router';
import {TechnologyViewerComponent} from './technology-viewer/technology-viewer.component';
import {TechnologyAdminComponent} from './technology-admin/technology-admin.component';
import {LoginComponent} from './login/login.component';
import {AdminGuard} from './admin-guard.guard';
import {ViewerGuard} from './viewer-guard.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'viewer', component: TechnologyViewerComponent, canActivate: [ViewerGuard] },
  { path: 'admin', component: TechnologyAdminComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
