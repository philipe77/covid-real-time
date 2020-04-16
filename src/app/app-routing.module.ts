import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { InfoComponent } from './layout/home-page/info/info.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component:InfoComponent
      },
      { path: 'sobre', loadChildren: () => import('./layout/home-page/sobre/sobre.module').then(m => m.SobreModule) },
      { path: 'ref', loadChildren: () => import('./layout/home-page/ref/ref.module').then(m => m.RefModule) },
    ]
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
