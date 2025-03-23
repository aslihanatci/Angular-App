import { Injectable } from '@angular/core';
import { Certificate } from '../models/certificate';
import { CertificateTypeService } from './certificate-type.service';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  constructor(private certificateTypeService: CertificateTypeService) { }

  // Sertifika için sertifika türü adını alır
  enrichCertificatesWithTypeNames(certificates: Certificate[]): Observable<Certificate[]> {
    return this.certificateTypeService.getCertificateTypes().pipe(
      map(types => {
        return certificates.map(cert => {
          const type = types.find(t => t.id === cert.certificateTypeId);
          return {
            ...cert,
            certificateTypeName: type ? type.name : 'Unknown'
          };
        });
      })
    );
  }
}
