import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Componen
/* Core Grid CSS */
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import 'ag-grid-community/styles/ag-theme-quartz.css';
import "../../styles.css";
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  createGrid,
} from 'ag-grid-community';
/*import { ClientSideRowModelModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule]);*/
import { EmployeeService } from '../services/employee.service';
import { IEmployee } from "../employee"


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [AgGridAngular], // Add Angular Data Grid Component
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  private gridApi!: GridApi<IEmployee>;
  employeeService: EmployeeService = inject(EmployeeService);

  // Column Definitions: Defines the columns to be displayed.
  public columnDefs: ColDef[] = [
    { field: "id", maxWidth: 50 },
    { field: "name", maxWidth: 120 },
    { field: "surname", maxWidth: 130 },
    { field: "birthday", maxWidth: 180 },
    { field: "fiscalCode", maxWidth: 180 },
    { field: "role", maxWidth: 120 },
    { field: "companyName", minWidth: 120, maxWidth: 150 },
    { field: "companyCode", maxWidth: 140 },
    { field: "insertDate", maxWidth: 200 },
    { field: "lastUpdate", maxWidth: 200 },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  public rowSelection: "single" | "multiple" = "multiple";
  public rowData!: IEmployee[];
  public themeClass: string =
    "ag-theme-quartz";
  
  constructor(private http: HttpClient) {}

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    var maxToShow = 5;
    selectedRows.forEach(function (selectedRow, index) {
      if (index >= maxToShow) {
        return;
      }
      if (index > 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.name;
    });
    if (selectedRows.length > maxToShow) {
      var othersCount = selectedRows.length - maxToShow;
      selectedRowsString +=
        " and " + othersCount + " other" + (othersCount !== 1 ? "s" : "");
    }
    (document.querySelector("#selectedRows") as any).innerHTML =
      selectedRowsString;
  }
  
  onGridReady(params: GridReadyEvent<IEmployee>) {
    this.gridApi = params.api;

    this.employeeService.getEmployees()
    .subscribe((employees) => (this.rowData = employees));
  }  

}
