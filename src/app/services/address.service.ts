import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://18.207.153.86:3000/tienda/v1';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getUserAddresses(userId: string) {
    return this.http.get<any>(`${this.apiUrl}/myAddresses/${userId}`,{ withCredentials: true } );
  }

  getAddressById(addressId: string) {
    return this.http.get<any>(`${this.apiUrl}/myAddress/${addressId}`,{ withCredentials: true } );
  }
  addAddress(userId:string,address: Address) {
    return this.http.post(`${this.apiUrl}/newAddress/${userId}`, address,{ withCredentials: true });
  }

  editAddress(addressId: string, address: Address) {
    return this.http.patch(`${this.apiUrl}/updatemyAddres/${addressId}`, address,{ withCredentials: true });
  }
  deleteAddress(userId:string,addressId: string) {
    return this.http.delete(`${this.apiUrl}/deletemyAddress/${userId}/${addressId}`,{ withCredentials: true });
  }
  updateAddress(id:string, data:any){
    return this.http.patch(`${this.apiUrl}/updatemyAddres/${id}`,data,{ withCredentials: true })
  }
}
