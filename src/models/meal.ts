export default class Meal {
  constructor(
    public id: string,
    public categoryIds: string[],
    public title: string,
    public affordability: string,
    public complexity: string,
    public imageUrl: string,
    public duration: number,
    public ingredients: string[],
    public steps: string[],
    public isGluteenFree: boolean,
    public isVegan: boolean,
    public isVegiterian: boolean,
    public isLactosFree: boolean
  ) {}
}
