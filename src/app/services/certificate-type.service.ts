import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CertificateType } from '../models/certificate-type';

@Injectable({
  providedIn: 'root'
})
export class CertificateTypeService {
  private nextId = 4;
  
  private certificateTypesSubject = new BehaviorSubject<CertificateType[]>([
    { id: 1, name: 'Safety', description: 'Basic safety training certificate' },
    { id: 2, name: 'Navigation', description: 'Navigation proficiency certificate' },
    { id: 3, name: 'Technical', description: 'Technical operations certificate' }
  ]);
  
  certificateTypes$ = this.certificateTypesSubject.asObservable();

  constructor() { }

  getCertificateTypes(): Observable<CertificateType[]> {
    return this.certificateTypes$;
  }

  getCertificateTypeById(id: number): Observable<CertificateType | undefined> {
    const certificateType = this.certificateTypesSubject.value.find(ct => ct.id === id);
    return of(certificateType);
  }

  addCertificateType(certificateType: CertificateType): Observable<CertificateType> {
    const certificateTypes = this.certificateTypesSubject.value;
    certificateType.id = this.nextId++;
    const updatedList = [...certificateTypes, certificateType]; 
    this.certificateTypesSubject.next(updatedList); 
    return of(certificateType); 
  }

  updateCertificateType(certificateType: CertificateType): Observable<CertificateType | null> {
    const certificateTypes = this.certificateTypesSubject.value;
    const index = certificateTypes.findIndex(ct => ct.id === certificateType.id);
    if (index !== -1) {
      certificateTypes[index] = { ...certificateTypes[index], ...certificateType };
      this.certificateTypesSubject.next([...certificateTypes]);
      return of(certificateTypes[index]);
    }
    return of(null);
  }

  deleteCertificateType(id: number): Observable<boolean> {
    const certificateTypes = this.certificateTypesSubject.value;
    const filteredList = certificateTypes.filter(ct => ct.id !== id);
    const isDeleted = filteredList.length !== certificateTypes.length; 
    this.certificateTypesSubject.next(filteredList); 
    return of(isDeleted); 
  }
}
