import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ColumnComponent } from './components/column/column.component';
import { MainComponent } from './components/main/main.component';
import { StoryComponent } from './components/story/story.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpService } from "./services/http.service";
import Reducers from './redux/store';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import Effects from "./redux/effects";
import {MatTooltipModule} from "@angular/material/tooltip";
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ColumnComponent,
    MainComponent,
    StoryComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    StoreModule.forRoot(Reducers, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot(Effects),
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatTooltipModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule{
  constructor() { }
}
