import { Component, Input, OnInit } from '@angular/core';
import { Place } from '@core/domain/place.model';

@Component({
  selector: 'app-place-viewer',
  templateUrl: './place-viewer.component.html',
  styleUrls: ['./place-viewer.component.scss']
})
export class PlaceViewerComponent implements OnInit {

  @Input() place: Place;

  constructor() {}

  ngOnInit(): void {
  }
}
