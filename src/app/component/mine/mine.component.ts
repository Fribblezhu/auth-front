import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mine',
  styleUrls: ['./mine.component.less'],
  templateUrl: './mine.component.html'
})
export class MineComponent implements OnInit {
  public iconUrl = '';
  ngOnInit(): void {
    // todo get the iconUrl form system
  }
}
