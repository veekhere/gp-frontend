import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location, LocationJsonModel } from '@core/domain/location.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LocaleService } from './locale.service';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class LocationService {

  constructor(private http: HttpClient) {}

  /**
   * Поиск адреса по широте и долготе.
   */
  getAddressByCoordinates(lat: number, lon: number): Observable<Location> {
    const applicationLanguage = LocaleService.language$.value;
    return this.http.get<LocationJsonModel>(`http://nominatim.openstreetmap.org/reverse?format=json&accept-language=${applicationLanguage}&lat=${lat}&lon=${lon}`)
      .pipe(
        map((result) => Location.fromJson(result as any)),
      );
  }

  /**
   * Поиск адресов по подстроке.
   */
  searchAddress(searchString: string) {
    const applicationLanguage = LocaleService.language$.value;
    return this.http.get<LocationJsonModel[]>(`https://api.locationiq.com/v1/autocomplete?key=${environment.locationIqKey}&countrycodes=ru&dedupe=1&accept-language=${applicationLanguage}&q=${searchString}`)
      .pipe(
        catchError(() => of([])),
        map((result) => result?.map((res) => Location.fromJson(res))),
      );
  }
}
