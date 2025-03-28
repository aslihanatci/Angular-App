import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Crew } from '../models/crew';
import { Certificate } from '../models/certificate';

@Injectable({
  providedIn: 'root'
})
export class CrewService {
  private nextId = 6;
  
  private crewSubject = new BehaviorSubject<Crew[]>([
    {
      id: 1,
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      nationality: 'Türkiye',
      title: 'Kaptan',
      daysOnBoard: 120,
      dailyRate: 150,
      currency: 'USD',
      certificates: [
        { id: 1, certificateTypeName: 'Kaptan Lisansı', issueDate: new Date('2020-01-15'), expiryDate: new Date('2025-01-15') },
        { id: 2, certificateTypeName: 'İlk Yardım Sertifikası', issueDate: new Date('2021-03-20'), expiryDate: new Date('2026-03-20') }
      ]
    },
    {
      id: 2,
      firstName: 'Mehmet',
      lastName: 'Demir',
      nationality: 'Türkiye',
      title: 'Baş Mühendis',
      daysOnBoard: 90,
      dailyRate: 130,
      currency: 'USD',
      certificates: [
        { id: 3, certificateTypeName: 'Mühendislik Lisansı', issueDate: new Date('2019-05-10'), expiryDate: new Date('2024-05-10') }
      ]
    },
    {
      id: 3,
      firstName: 'Elena',
      lastName: 'Petrova',
      nationality: 'Rusya',
      title: 'Deniz Subayı',
      daysOnBoard: 75,
      dailyRate: 120,
      currency: 'EUR',
      certificates: [
        { id: 4, certificateTypeName: 'Denizcilik Sertifikası', issueDate: new Date('2022-02-05'), expiryDate: new Date('2027-02-05') },
        { id: 5, certificateTypeName: 'Güvenlik Eğitimi', issueDate: new Date('2022-04-15'), expiryDate: new Date('2027-04-15') }
      ]
    },
    {
      id: 4,
      firstName: 'John',
      lastName: 'Smith',
      nationality: 'ABD',
      title: 'Güverte Zabiti',
      daysOnBoard: 60,
      dailyRate: 100,
      currency: 'USD',
      certificates: [
        { id: 6, certificateTypeName: 'Güverte Zabiti Lisansı', issueDate: new Date('2021-08-20'), expiryDate: new Date('2026-08-20') }
      ]
    },
    {
      id: 5,
      firstName: 'Maria',
      lastName: 'Gonzalez',
      nationality: 'İspanya',
      title: 'Makinist',
      daysOnBoard: 45,
      dailyRate: 110,
      currency: 'EUR',
      certificates: [
        { id: 7, certificateTypeName: 'Makine Operatörü Lisansı', issueDate: new Date('2020-11-30'), expiryDate: new Date('2025-11-30') },
        { id: 8, certificateTypeName: 'Teknik Bakım Sertifikası', issueDate: new Date('2021-05-25'), expiryDate: new Date('2026-05-25') }
      ]
    }
  ]);
  
  crews$ = this.crewSubject.asObservable();

  constructor() { }

  getCrew(): Observable<Crew[]> {
    return this.crews$;
  }

  getCrewById(id: number): Observable<Crew | undefined> {
    const crew = this.crewSubject.value.find(c => c.id === id);
    return of(crew);
  }

  addCrew(crew: Crew): void {
    const crews = this.crewSubject.value;
    crew.id = this.nextId++;
    if (!crew.certificates) {
      crew.certificates = [];
    }
    this.crewSubject.next([...crews, crew]);
  }

  updateCrew(crew: Crew): void {
    const crews = this.crewSubject.value;
    const index = crews.findIndex(c => c.id === crew.id);
    if (index !== -1) {
      crews[index] = { ...crews[index], ...crew };
      this.crewSubject.next([...crews]);
    }
  }

  deleteCrew(id: number): void {
    const crews = this.crewSubject.value;
    this.crewSubject.next(crews.filter(c => c.id !== id));
  }

  calculateTotalIncome(crew: Crew): number {
    return crew.daysOnBoard * crew.dailyRate;
  }


}
