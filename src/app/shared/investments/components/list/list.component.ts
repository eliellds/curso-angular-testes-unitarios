import { Component, OnInit } from '@angular/core';

//Model
import { Investment } from '../../model/investment';

//Service
import { ListInvestmentsService } from '../../services/list-investments.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public investments!: Array<Investment>;

  constructor(
    private listInvestmentsService: ListInvestmentsService
  ) { }

  ngOnInit(): void {
    this.listInvestmentsService.list().subscribe({
      next: (res) => this.investments = res
    });
  }

}
