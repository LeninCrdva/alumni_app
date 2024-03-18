import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Injectable({
    providedIn: 'root',
})
export class DataTablesService {

    dtoptions: DataTables.Settings = {};

    constructor() { }

    setupDtOptions(columnTitles: string[], searchPlaceholder: string) {
        return {
            pagingType: 'full_numbers',
            searching: true,
            lengthChange: true,
            columns: [...columnTitles.map(title => ({ title })), { title: 'Acciones' }],
            language: {
                search: 'Buscar:',
                searchPlaceholder,
                info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
                infoEmpty: 'Mostrando 0 a 0 de 0 registros',
                paginate: {
                    first: 'Primera',
                    last: 'Última',
                    next: 'Siguiente',
                    previous: 'Anterior',
                },
                lengthMenu: 'Mostrar _MENU_ registros por página',
                zeroRecords: 'No se encontraron registros coincidentes',
            },
            lengthMenu: [10, 25, 50],
        };
    }

    rerender(dtElement: DataTableDirective | undefined, dtTrigger: Subject<any>): void {
        dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            dtTrigger.next(null);
        });
    }

    omitirPropsConId(dataArray: any[]): any[] {
        return dataArray.map(obj => {
            const newObj: { [key: string]: any } = {};
            Object.keys(obj).forEach(key => {
                if (!key.startsWith('id')) {
                    newObj[key] = obj[key];
                }
            });
            return newObj;
        });
    }

    public generarJSON(tableList: any, name: string): void {
        const dataSinIds = this.omitirPropsConId(tableList);
        const dataStr = JSON.stringify(dataSinIds, null, 4);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', name + '_Backup.json');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Limpieza de la referencia al objeto Blob
    }
}
