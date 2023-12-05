import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FilterPipe } from './filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HeadersComponent } from './components/headers/headers.component';
import { FooterComponent } from '../../../Submodules/template/src/app/component/footer/footer.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterPipe,
    HeadersComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
