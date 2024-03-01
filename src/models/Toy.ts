
type Toy = {

  name: string;
  description?: string;
  price: string;

}

type ToyWithCount = Toy & {
  count: number;
}


export { Toy, ToyWithCount };
