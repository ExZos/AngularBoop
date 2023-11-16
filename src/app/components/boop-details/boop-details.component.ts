import { Component, Input } from '@angular/core';

import Boop from 'src/app/models/boop';

@Component({
  selector: 'boop-details',
  templateUrl: './boop-details.component.html',
  styleUrls: ['./boop-details.component.css']
})
export class BoopDetailsComponent {
  @Input() boop!: Boop;
}
