declare type ClientCartItem = {
  productId: string;
  quantity: number;
};

declare type ClientCartInfo = {
  cart: {
    id: ProductsEntity["id"];
    title: ProductsEntity["title"];
    price: ProductsEntity["price"];
    quantity: ProductsEntity["quantity"];
    is_active: boolean;
  }[];
  totalPrice: string;
  totalWeight: {
    weight: string;
    massUnit: string;
  };
  totalDimensions: {
    width: string;
    height: string;
    length: string;
    distanceUnit: string;
  };
};
