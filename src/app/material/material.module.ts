import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// Module for angular material modules imports
const MATMODULES = [MatIconModule];

@NgModule({
  imports: [CommonModule, [...MATMODULES]],
  exports: [...MATMODULES],
})
export class MaterialModule {}
