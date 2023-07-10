import { Database } from "../services/databaseService";
import { Person } from "../services/personService";

describe("test /person , /clean, /relationship and /recommendations", () => {
  let database: Database;

  beforeEach(() => {
    database = new Database();
  });

  test("Create a person in the database", () => {
    const person = new Person("Joao", "12345678910");
    const result = database.addPerson(person);
    expect(result).toBe(true);
    expect(database.database).toHaveLength(1);
  });

  test("Create two persons with the same cpf must be an error", () => {
    const person = new Person("pessoa 1", "12345678910");
    const person2 = new Person("pessoa 1", "12345678910");
     database.addPerson(person);
    const result = database.addPerson(person2);
    expect(result).toBe(false);
  });

  test("CPF must be 11 digits long ", () => {
    try {
      const person = new Person("Pessoa 1 ", "123456789");
      database.addPerson(person);
    } catch (error: any) {
      expect(error.message).toBe("Invalid Cpf");
    }
  });

  test("CPF must have only numbers", () => {
    try {
      const person = new Person("Pessoa 1 ", "12345csdemn");
      database.addPerson(person);
    } catch (error: any) {
      expect(error.message).toBe("Invalid Cpf");
    }
  });

  test("Clear database, should leave the database without any records", () => {
    const person = new Person("Pessoa", "12345678910");
    database.addPerson(person);
    expect(database.database).toHaveLength(1);
    database.clearDatabase();
    expect(database.database).toHaveLength(0);
  });

  test("After insertion in the database, search for cpf should return the person", () => {
    const person = new Person("Pessoa 1 ", "12345678910");
    database.addPerson(person);
    const result = database.findByCpf(12345678910);
    expect(result).toBe(person);
  });

  test("Fetching user that doesn't exist in the database, it should return undefined", () => {
    const result = database.findByCpf(12345678910);
    expect(result).toBe(undefined);
  });

  test("Creating two people and making the relationship between them, you have to add the person's data in friends", () => {
    const person = new Person("Pessoa 1 ", "12345678910");
    const person2 = new Person("Pessoa 2 ", "12345678911");
    database.addPerson(person);
    database.addPerson(person2);
    person.addFriends(person2);
    person2.addFriends(person);
    expect(person.friends).toHaveLength(1);
    expect(person2.friends).toHaveLength(1);
  });

  test("Creating two people and making the relationship between them, but sending a cpf smaller than expected", () => {
    try {
      const person = new Person("Pessoa 1 ", "12345678910");
      const person2 = new Person("Pessoa 2 ", "123456781");
      database.addPerson(person);
      person.addFriends(person2);
      person2.addFriends(person);
    } catch (error: any) {
      expect(error.message).toBe("Invalid Cpf");
    }
  });

  test("Creating 5 people and the relationships between them, the function should return a list of CPFs of all the friends of the friends of the informed user who are not his friends", () => {
    const A = new Person("A ", "12345678910");
    const B = new Person("B ", "12345678911");
    const C = new Person("C ", "12345678912");
    const D = new Person("D ", "12345678913");
    const E = new Person("E ", "12345678914");
    database.addPerson(A);
    database.addPerson(B);
    database.addPerson(C);
    database.addPerson(D);
    database.addPerson(E);
    A.addFriends(B);
    A.addFriends(C);
    B.addFriends(D);
    C.addFriends(D);
    C.addFriends(E);

    const result = A.getRecommendations();
    expect(result).toHaveLength(2);
    expect(result).toContain(D.cpf);
    expect(result).toContain(E.cpf);
  });

  test("Creating 3 people and the relationships between them, the function must return an empty list, because there will be no friend of friend", () => {
    const A = new Person("A ", "12345678910");
    const B = new Person("B ", "12345678911");
    const C = new Person("C ", "12345678912");

    database.addPerson(A);
    database.addPerson(B);
    database.addPerson(C);

    A.addFriends(B);
    A.addFriends(C);

    const result = A.getRecommendations();
    expect(result).toHaveLength(0);
  });

  test("Creating three people one with invalid cpf and the relationships between them, the function should return invalid cpf error", () => {
    try {
      const A = new Person("A ", "12345678910");
      const B = new Person("B ", "12345678911");
      const C = new Person("C ", "12345678912");

      database.addPerson(A);
      database.addPerson(B);
      database.addPerson(C);

      A.addFriends(B);
      A.addFriends(C);

      A.getRecommendations();
    } catch (error: any) {
      expect(error.message).toBe("Invalid Cpf");
    }
  });
});
