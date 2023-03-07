import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ImageDialogData {
  image?: string;
}
@Component({
  selector: 'app-imagedialog',
  templateUrl: './imagedialog.component.html',
  styleUrls: ['./imagedialog.component.scss'],
})
export class ImagedialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ImagedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageDialogData
  ) {}
}
