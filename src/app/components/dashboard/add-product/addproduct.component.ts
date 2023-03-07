import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductData } from 'src/app/common/models/ProductData';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SessionStorageService } from 'src/app/common/services/sessionStorageService';
import { MatDialog } from '@angular/material/dialog';
import { ProductRestService } from 'src/app/common/services/productRestService';
import { LanguageService } from 'src/app/common/services/LanguageService';
import {
  ImagedialogComponent,
  ImageDialogData,
} from 'src/app/common/imagedialog/imagedialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
export class AddproductComponent implements OnInit {
  @Input() product?: ProductData | null;
  @Output() isClosedForm: EventEmitter<boolean> = new EventEmitter();
  form!: FormGroup;
  tagsList: Array<string> = [];
  files!: { name: string; result: string };
  currentFlag!: string;

  constructor(
    private sesionStorageService: SessionStorageService,
    private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private productRestService: ProductRestService,
    private languageService: LanguageService,
    private _snackBar: MatSnackBar
  ) {
    this.currentFlag = this.languageService.currentFlag;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      producer: ['', Validators.required],
      description: ['', Validators.required],
      img: ['', Validators.required],
      tags: ['', Validators.required],
      price: ['', Validators.required],
      name: ['', Validators.required],
    });
    this.productRestService
      .getTags()
      .subscribe((tag) => (this.tagsList = tag as Array<string>));
  }
  processFile(event: any) {
    this.files = { name: '', result: '' };
    if (event.target.files && event.target.files[0]) {
      this.files.name = event.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.files.result = (reader.result as string).split(';base64,')[1];
      };
      this.form.get('img')?.setValue(this.files.name);
    }
  }

  onShowImage(): void {
    this.dialog.open(ImagedialogComponent, {
      data: { image: this.product?.img },
    });
  }
  addProduct() {
    let rawValue = this.form.getRawValue() as ProductData;
    rawValue.img = [this.files];
    rawValue.userId = this.sesionStorageService.getItem('currentUser')?.id;

    if (this.product) {
      delete rawValue.img;
    }
    (this.product
      ? this.productRestService.editProduct(rawValue, this.product.id as number)
      : this.productRestService.addProduct(rawValue)
    ).subscribe((result) => {
      if (result === 'Added' || result === 'Updated') {
        this.isClosedForm.emit(true);
        const message: string = this.translateService.instant(
          result === 'Added' ? 'ADD_PRODUCT.SUCCESS' : 'ADD_PRODUCT.UPDATE'
        );
        this._snackBar.open(message, undefined, {
          duration: 2000,
        });
      }
    });
  }
  changeLanguage(language: string): void {
    this.languageService.ChangeLanguage(language);
    this.currentFlag = this.languageService.currentFlag;
  }
}
