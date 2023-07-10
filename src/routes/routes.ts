import { Request, Response, Router } from "express";
import { Database } from "../services/databaseService";
import { Person } from "../services/personService";

export const routes = Router();
export const database = new Database();

routes.post("/person", async (request: Request, response: Response) => {
  try {
    const { name, cpf } = request.body;
    const person = new Person(name, cpf);
    const addPerson = database.addPerson(person);
    if (addPerson) {
      return response.status(200).json({ message: "Success! Person created" });
    }
    return response
      .status(400)
      .json({
        message: "Person already exists or some field was not informed",
      });
  } catch (error: any) {
    response.status(400).json({ message: error.message });
  }
});

routes.get("/person/:CPF", async (request: Request, response: Response) => {
  const { CPF } = request.params;
  const person = database.findByCpf(Number(CPF));
  if (person !== undefined) {
    const { name, cpf } = person;
    return response.status(200).json({ name, cpf });
  }
  return response.status(404).json({ message: "User not exists" });
});

routes.delete("/clean", async (request: Request, response: Response) => {
  database.clearDatabase();
  return response.json({ message: [] });
});

routes.post("/relationship", async (request: Request, response: Response) => {
  const { cpf1, cpf2 } = request.body;
  const person1 = database.findByCpf(Number(cpf1));
  const person2 = database.findByCpf(Number(cpf2));
  if (person1 === undefined || person2 === undefined) {
    return response
      .status(404)
      .json({ message: "At least one Person was not found in database" });
  }
  person1.addFriends(person2);
  person2.addFriends(person1);
  return response
    .status(200)
    .json({ message: "Success, relationship created" });
});

routes.get(
  "/recommendations/:CPF",
  async (request: Request, response: Response) => {
    const { CPF } = request.params;
    const person = database.findByCpf(Number(CPF));
    if (person === undefined) {
      return response
        .status(404)
        .json({ message: "Person was not found in database" });
    }
    const relations = person.getRecommendations();
    response.status(200).json(relations);
  }
);
