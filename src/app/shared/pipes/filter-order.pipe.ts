import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter'
})
export class FilterOrderPipe implements PipeTransform {

  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {
    return items.filter(item => {
      const notMatchingField = Object.keys(filter)
        .find(key => item[key] !== filter[key]);

      return !notMatchingField;
    });
  }

}
