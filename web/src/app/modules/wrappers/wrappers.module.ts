import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CheckboxWrapperComponent } from '../../components/wrappers/checkbox-wrapper/checkbox-wrapper.component';
import { InputWrapperComponent } from '../../components/wrappers/input-wrapper/input-wrapper.component';
import { SelectWrapperComponent } from '../../components/wrappers/select-wrapper/select-wrapper.component';

@NgModule({
    declarations: [InputWrapperComponent, SelectWrapperComponent, CheckboxWrapperComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MatSelectModule, MatInputModule, MatCheckboxModule],
    exports: [InputWrapperComponent, SelectWrapperComponent, CheckboxWrapperComponent],
})
export class WrappersModule {}
