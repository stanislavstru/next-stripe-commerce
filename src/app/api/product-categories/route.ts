import { getProductsCategories } from "@/common/actions/product-categories";

export async function GET() {
  const response = await getProductsCategories();

  return Response.json(response?.response ?? [], {
    status: response.statusCode,
  });
}
