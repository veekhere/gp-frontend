import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Rating } from '@core/domain/rating.model';
import { RatingService } from '@core/services/entity/rating.service';
import { LocationService } from '@core/services/location.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, first } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindPageComponent implements OnInit {

  c = new FormControl();

  readonly ratings$ = new BehaviorSubject<Rating[]>([]);

  constructor(
    private readonly s: LocationService,
    private readonly ratingService: RatingService,
  ) {}

  ngOnInit(): void {

  }

  click(): void {
    this.ratingService.search()
      .pipe(first())
      .subscribe((result) => this.ratings$.next(result));
  }
}
