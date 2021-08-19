import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherforecastsComponent } from './weatherforecasts/weatherforecasts.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WeatherforecastsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'weatherforecasts', component: WeatherforecastsComponent },
    ]),
  ],
})
export class WeatherforecastModule {}
