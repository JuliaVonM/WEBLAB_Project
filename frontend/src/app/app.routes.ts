import {Routes} from '@angular/router';
import {TechnologyViewerComponent} from './technology-viewer/technology-viewer.component';
import {TechnologyAdminComponent} from './technology-admin/technology-admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/viewer', pathMatch: 'full' },
  { path: 'viewer', component: TechnologyViewerComponent },
  { path: 'admin', component: TechnologyAdminComponent },
];
