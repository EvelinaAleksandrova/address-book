import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameByIdPipe'
})
export class GetNameByIdPipe implements PipeTransform {
  transform(id: any, array: any): any {
    const item = array?.find(element => element.id === id);

    if (item !== undefined && item.name) {
      return item.name;
    } else {
      return '';
    }
  }
}
