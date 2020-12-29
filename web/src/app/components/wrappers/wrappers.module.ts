import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InputWrapperComponent } from './input-wrapper/input-wrapper.component';
import { SelectWrapperComponent } from './select-wrapper/select-wrapper.component';

@NgModule({
    declarations: [InputWrapperComponent, SelectWrapperComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MatSelectModule, MatInputModule],
    exports: [InputWrapperComponent, SelectWrapperComponent],
})
export class WrappersModule {}
