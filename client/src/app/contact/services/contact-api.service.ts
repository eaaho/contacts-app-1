import {Injectable} from '@angular/core';
import {ContactStore} from "./contact-store";
import {Contact} from "../contact";
import {environment} from '../../../environments/environment';
import {HttpService} from "../../utils/http.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ContactApiService implements ContactStore {

  private url: string = environment.endpointUrl + '/contacts';

  constructor(private http: HttpService) {
  }

  findContacts() {
    return this.http
      .get(this.url)
      .map(function (response) {
        return response.json() as Contact[];
      });
  }

  findContactById(id): Observable<Contact> {
    return this.http
      .get(this.url)
      .map(function (response) {
        return response.json() as Contact;
      });
  }

  saveContact(contact: Contact) {
    return contact.id ? this.updateContact(contact) : this.createContact(contact);
  }

  createContact(contact: Contact) {
    return this.http.post(this.url, contact);
  }

  updateContact(contact: Contact) {
    return this.http.put(this.url + '/' + contact.id, contact);
  }

  deleteContact(contact: Contact) {
    return this.http.delete(this.url + '/' + contact.id);
  }
}
