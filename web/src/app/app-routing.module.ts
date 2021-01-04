import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainAppRoutingModule } from './modules/main-app/main-app-routing.module';

@NgModule({
    imports: [MainAppRoutingModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
