import { Person } from "./personService";

export class Database {
  database: Person[];

  constructor() {
    this.database = [];
  }

  public findByCpf(cpf: number): Person | undefined {
    return this.database.find((person) => person.cpf === cpf);
  }

  public isUserInDatabase(cpf: number): Boolean {
    return !!this.findByCpf(cpf);
  }

  public addPerson(person: Person): Boolean {
    if (this.isUserInDatabase(person.cpf) || !person.name || !person.cpf) {
      return false;
    }
    this.database.push(person);
    return true;
  }

  public clearDatabase(): void {
    this.database = [];
  }
}
