import { AngularFirestore } from '@angular/fire/firestore';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {
  ShipmenttableDataSource,
  ShipmenttableItem,
} from './shipmenttable-datasource';
import { MatTableDataSource } from '@angular/material/table';
// import { shipmentData as shipmentDatamModel } from './demo';

@Component({
  selector: 'app-shipmenttable',
  templateUrl: './shipmenttable.component.html',
  styleUrls: ['./shipmenttable.component.css'],
})
export class ShipmenttableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ShipmenttableItem>;
  dataSource: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['SHIPMENT', 'CONT'];
  subTableColumns = ['SKU', 'QTY', 'TON'];

  constructor(private afs: AngularFirestore) {
    this.dataSource = new MatTableDataSource();
  }

  totalCont(i: number) {
    return this.dataSource[i].containerList.length;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.afs
      .collection('lae_shipment')
      .valueChanges()
      .subscribe((res: any) => {
        this.dataSource = res;
      });
  }
  // data = shipmentDatamModel;
  ngOnInit() {
    // this.afs
    //   .collection('lae_shipment')
    //   .doc(this.data.shipmentNumber)
    //   .set(this.data);
  }
}
