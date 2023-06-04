import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelByCodePipe'
})
export class GetLabelByCodePipe implements PipeTransform {
  transform(code: any, array: any): any {
    const item = array?.find(element => element.code === code);

    if (item !== undefined && item.label) {
      return item.label;
    } else {
      return '';
    }
  }
}
