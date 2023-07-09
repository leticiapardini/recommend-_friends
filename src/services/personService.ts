import { groupByAndCount, isCPFValid } from "../utils";

export class Person {
  name: string;
  cpf: number;
  friends: Person[];

  constructor(name: string, cpf: string) {
    if (!isCPFValid(cpf)) {
      throw new Error("Invalid Cpf");
    }
    this.cpf = parseInt(cpf);
    this.name = name;
    this.friends = [];
  }

  public addFriends(person: Person): void {
    this.friends.push(person);
  }

  public getRecommendations(): Number[] {
    let allFriends: Person[] = [];

    this.friends.forEach((f) => allFriends.push(...f.friends));

    allFriends = allFriends.filter((p) => p.cpf != this.cpf);

    this.friends.forEach(() => {
      allFriends = allFriends.filter((p) => p.cpf != this.cpf);
    });

    let groupedFriends = Object.entries(groupByAndCount(allFriends, "cpf"));

    groupedFriends.sort((prev: any, act: any) => {
      return act[1] > prev[1] ? 1 : act[1] < prev[1] ? -1 : 0;
    });

    const returnList: Number[] = [];
    groupedFriends.forEach((f) => {
      returnList.push(parseInt(f[0]));
    });

    return returnList;
  }
}
