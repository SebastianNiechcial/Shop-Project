import { Component, Input, Output } from '@angular/core';
import { ProductData } from 'src/app/common/models/ProductData';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
export class AddproductComponent {
  @Input() product?: ProductData | null;
  //ended here
  @Output()
  title = 'low';

  constructor(private translateService: TranslateService) {}
  onShowImage() {}
}
