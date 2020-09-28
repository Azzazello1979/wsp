import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ng material module imports ...
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';

// Module for angular material modules imports
const MATMODULES = [
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatBadgeModule,
];

@NgModule({
  imports: [CommonModule, [...MATMODULES]],
  exports: [...MATMODULES],
})
export class MaterialModule {}
