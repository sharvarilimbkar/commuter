
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'SearchProvider'
})

@Injectable()
export class SearchProvider implements PipeTransform {
 transform(value: any, input: string) {
        if (input) {
          console.log("value ==> "+value);
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                return el.toLowerCase().indexOf(input) > -1;
            })
        }
        return value;
    }
}