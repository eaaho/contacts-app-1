import {Injectable} from '@angular/core';
import {Contact} from "../contact";
import {ContactStore} from "./contact-store";
import * as _ from "lodash";
import {Observable} from "rxjs";

@Injectable()
export class ContactLocalStorageService implements ContactStore {

  private localStorageKey = 'ca-contacts';

  constructor() {
    this.initializeLocalStorage();
  }

  public saveContact(contact: Contact) {
    let contacts = this.readLocalStorageContacts();
    if (!contact.id) {
      let lastSaved = <Contact>_.maxBy(contacts, 'id');
      contact.id = lastSaved ? lastSaved.id + 1 : 1;
      contacts.push(contact);
    } else {
      contacts = _.map(contacts, function (c: Contact) {
        return c.id == contact.id ? contact : c;
      });
    }
    this.writeLocalStorageContacts(contacts);
    return Observable.from([]);
  }

  public loadContacts() {
    let contacts: Contact[] = this.readLocalStorageContacts();
    return Observable.from(contacts);
  }

  public deleteContact(contact: Contact) {
    let contacts = this.readLocalStorageContacts();
    _.remove(contacts, function (c: Contact) {
      return _.isEqual(contact.id, c.id);
    });
    this.writeLocalStorageContacts(contacts);
    return Observable.from([]);
  }

  private initializeLocalStorage() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  private readLocalStorageContacts() {
    let data = localStorage.getItem(this.localStorageKey);
    return JSON.parse(data);
  }

  private writeLocalStorageContacts(contacts) {
    contacts = JSON.stringify(contacts);
    localStorage.setItem(this.localStorageKey, contacts);
  }

}
