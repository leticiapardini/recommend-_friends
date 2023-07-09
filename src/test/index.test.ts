import { Database } from "../services/databaseService";
import { Person } from "../services/personService";

describe("test /person", () => {
  let database: Database;

  beforeEach(() => {
    database = new Database();
  });

  test("Create New Person", () => {
    const person = new Person("Joao", "12345678910");
    const result = database.addPerson(person);
    expect(result).toBe(true);
    expect(database.database).toHaveLength(1);
  });

  test("Create two persons with the same cpf must be an error", () => {
    const person = new Person("pessoa 1", "12345678910");
    const person2 = new Person("pessoa 1", "12345678910");
    const addPerson = database.addPerson(person);
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

  test("Limpar database, deve deixar a base de dados sem nenhum registro", () => {
    const person = new Person("Pessoa", "12345678910");
    database.addPerson(person);
    expect(database.database).toHaveLength(1);
    database.clearDatabase();
    expect(database.database).toHaveLength(0);
  });

  test("apos a inserção no database, busca por cpf deverá retornar a pessoa ", () => {
    const person = new Person("Pessoa 1 ", "12345678910");
    database.addPerson(person);
    const result = database.findByCpf(12345678910);
    expect(result).toBe(person);
  });

  test("buscando usuário que não existe no database, ele deve retornar undefined ", () => {
    const result = database.findByCpf(12345678910);
    expect(result).toBe(undefined);
  });

  test("criando duas pessoas e fazendo o relacionamento entre elas, tem que adicionar os dados da pessoa em friends", () => {
    const person = new Person("Pessoa 1 ", "12345678910");
    const person2 = new Person("Pessoa 2 ", "12345678911");
    database.addPerson(person);
    database.addPerson(person2);
    person.addFriends(person2);
    person2.addFriends(person);
    expect(person.friends).toHaveLength(1);
    expect(person2.friends).toHaveLength(1);
  });

  test("criando duas pessoas e fazendo o relacionamento entre elas, mas enviando um cpf menor do que o experado ", () => {
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

  test("criando 5 pessoas e os relacionamentos entre elas, a função deve retornar uma lista de CPFs de todos os amigos dos amigos do usuário informado que não são seus amigos  ", () => {
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

  test("criando 3 pessoas e os relacionamentos entre elas, a função deve retornar uma lista vazia, pq não terá amigo de amigo", () => {
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

  test("criando três pessoas uma com cpf invalido e os relacionamentos entre elas, a função deve retornar erro de cpf invalido ", () => {
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
