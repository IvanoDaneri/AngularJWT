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
import { CompanyService } from '../services/company.service';
import { ICompany } from "../company"


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [AgGridAngular], // Add Angular Data Grid Component
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

  private gridApi!: GridApi<ICompany>;
  companyService: CompanyService = inject(CompanyService);

  // Column Definitions: Defines the columns to be displayed.
  public columnDefs: ColDef[] = [
    { field: "id", maxWidth: 50 },
    { field: "name", minWidth: 100 },
    { field: "code", maxWidth: 120 },
    { field: "address", minWidth: 150 },
    { field: "type", maxWidth: 100 },
    { field: "insertDate", maxWidth: 180 },
    { field: "lastUpdate", maxWidth: 180 },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  public rowSelection: "single" | "multiple" = "multiple";
  public rowData!: ICompany[];
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
  
  onGridReady(params: GridReadyEvent<ICompany>) {
    this.gridApi = params.api;

    this.companyService.getCompanies()
    .subscribe((companies) => (this.rowData = companies));
  }  
}
