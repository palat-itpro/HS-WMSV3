import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-themechanger',
  templateUrl: './themechanger.component.html',
  styleUrls: ['./themechanger.component.css'],
})
export class ThemechangerComponent implements OnInit {
  themeColor = 'light-theme';

  constructor() {}

  ngOnInit() {}
}
