import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";

import { Dog } from "./dogs";
import dogsJson from "./dogs.json";

enum sfsdf {
  dogLimit = "dogLimit",
}

@Resolver(Dog)
export class DogsResolver {
  @Query(() => Dog, { nullable: true })
  dog(@Arg("name", () => String) name: string): Dog | undefined {
    const dog = dogsJson.find((dog) => dog.name === name);
    if (dog === undefined) {
      // throw new Error("Dog not found");
      return dogsJson[0];
    }
    return dog;
  }

  @Query(() => [Dog])
  dogs(@Arg("dogLimit", () => Int) dogLimit: number): Dog[] {
    return dogsJson.slice(0, dogLimit);
  }

  @Mutation(() => [Dog])
  delDog(@Arg("ind", () => Number) ind: number): Dog[] | undefined {
    dogsJson.splice(ind, 1);
    return dogsJson;
  }
}
