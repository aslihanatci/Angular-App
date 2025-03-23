import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CrewService } from '../../services/crew.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-crew-card',
  imports: [CommonModule, MatTabsModule, MatTableModule, TranslateModule],
  templateUrl: './crew-card.component.html',
  styleUrl: './crew-card.component.scss'
})
export class CrewCardComponent {
  @Input() crew: any;

  constructor(private route: ActivatedRoute, private crewService: CrewService) {}

  ngOnInit() {
    const crewId = this.route.snapshot.paramMap.get('id'); 
    if (crewId) {
      this.getCrewDetails(crewId);
    }
  }

  getCrewDetails(crewId: string) {
    this.crewService.getCrewById(+crewId).subscribe(data => {
      this.crew = data; 
    });
  }

  getTotalIncome(): number {
    return this.crew?.daysOnBoard * this.crew?.dailyRate || 0;
  }

}
