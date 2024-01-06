import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppConstants } from '@app-constants';
import { Feature, Map, MapBrowserEvent, View } from 'ol';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat, transform } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

@Component({
  selector: 'app-map-preview, app-map-preview[asInput][control]',
  templateUrl: './map-preview.component.html',
  styleUrls: ['./map-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPreviewComponent implements OnInit {

  @Input() latitude = AppConstants.MOSCOW?.latitude;
  @Input() longitude = AppConstants.MOSCOW?.longitude;
  @Input() control: FormControl;
  @Input() asInput = false;

  ngOnInit(): void {
    const marker = new Feature({
      geometry: new Point(fromLonLat([this.longitude, this.latitude])),
    });

    const layer = new VectorLayer({
      source: new VectorSource({
        features: [
          marker
        ]
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          crossOrigin: 'anonymous',
          src: '../../../../../assets/icons/marker.png',
          scale: 0.2
        })
      }),
    });

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        layer
      ],
      view: new View({
        center: fromLonLat([this.longitude, this.latitude]),
        zoom: 13
      }),
    });

    if (this.asInput) {
      map.on('click', (e: MapBrowserEvent<any>) => {
        marker.setGeometry(new Point(e?.coordinate));
        this.control?.setValue(transform(e?.coordinate, 'EPSG:3857', 'EPSG:4326'));
      });
    }
  }
}
