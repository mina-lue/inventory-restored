import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
  standalone: true
})
export class PaginatePipe implements PipeTransform {
  transform<T>(items: T[] | null | undefined, pageIndex = 1, pageSize = 20): T[] {
    if (!items?.length) {
      return [];
    }

    const start = Math.max(0, (pageIndex - 1) * pageSize);
    return items.slice(start, start + pageSize);
  }
}
