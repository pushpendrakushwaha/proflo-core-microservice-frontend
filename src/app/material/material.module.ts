import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatDialogModule } from '@angular/material';
import { MatSidenavModule, MatListModule } from '@angular/material';
import { MatButtonToggleModule, MatGridListModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';



const Materials = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
];

@NgModule({
  imports: [...Materials, ],
  exports: [...Materials, ]
})

export class MaterialModule { }
