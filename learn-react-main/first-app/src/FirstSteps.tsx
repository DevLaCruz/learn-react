import { ItemCounter } from "./shopping-cart/ItemCounter";

interface ItemInCart {
  productName: string;
  quantity: number;
}

const itemsInCart: ItemInCart[] = [
  { productName: "Nintendo", quantity: 2 },
  { productName: "Mario", quantity: 4 },
];

export const FirstSteps = () => {
  return (
    <>
      <h1>Shopping Cart</h1>
      {itemsInCart.map(({ productName, quantity }) => (
        <ItemCounter key={productName} name={productName} quantity={quantity} />
      ))}
    </>
  );
};
