import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap
} from 'rxjs/operators';


@Component({
  selector: 'ppal-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  constructor(private data: DataService) { }

  rowData: Array<any> = [];
  renderData: Array<any> = [];
  ngOnInit() {
    this.data.getRestaurantsFromServer().subscribe((data: Array<any>) => {
      this.rowData = data;
      this.renderData = data;
      this.setupTypeAheadEvent();
    });
  }

  setupTypeAheadEvent() {
    fromEvent(document.getElementById('search-bar'), 'keyup')
      .pipe(
        debounceTime(500),
        map((e: any) => e.target.value),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.filterRestaurants(value);
      });
  }

  filterRestaurants(event) {
    this.renderData = this.rowData.filter(e => {
      if (e['restaurantName'].includes(event)) return e;
    });
  }

  sortModified(event) {
    let selectedValue = event.target.value;
    this.renderData.sort(function (a, b) {
      return b[selectedValue] - a[selectedValue];
    });
  }

}
