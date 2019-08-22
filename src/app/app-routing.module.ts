import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { LogoutPageModule } from "./logout/logout.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",canActivate:[AuthGuard],
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "list",canActivate:[AuthGuard],
    loadChildren: () => import("./list/list.module").then(m => m.ListPageModule)
  },
  {
    path:'myplaces',canActivate:[AuthGuard],
    loadChildren: () => import("./myplaces/myplaces.module").then(m => m.MyplacesPageModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "logout",canActivate:[AuthGuard],
    loadChildren: () =>
      import("./logout/logout.module").then(m => LogoutPageModule)
  },
  {
     path: 'favourites',canActivate:[AuthGuard],
     loadChildren: () => import('./favourites/favourites.module').then(m => m.FavouritesPageModule)
   },
  { 
    path: 'toprated',canActivate:[AuthGuard],
    loadChildren :() => import('./toprated/toprated.module').then(m => m.TopratedPageModule)
  },
  { path: 'modal-page', loadChildren: './modal-page/modal-page.module#ModalPagePageModule' },
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
