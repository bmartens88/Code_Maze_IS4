import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { WeatherForecast } from 'src/app/_interfaces/weatherForecast.model';

@Component({
  selector: 'app-weatherforecasts',
  templateUrl: './weatherforecasts.component.html',
  styleUrls: ['./weatherforecasts.component.css'],
})
export class WeatherforecastsComponent implements OnInit {
  public weatherForecasts: WeatherForecast[] = [];

  constructor(private repository: RepositoryService) {}

  ngOnInit(): void {
    this.getWeatherForecasts();
  }

  public getWeatherForecasts = () => {
    const apiAddress: string = 'weatherforecast';
    this.repository
      .getData(apiAddress)
      .subscribe((res) => (this.weatherForecasts = res as WeatherForecast[]));
  };
}
