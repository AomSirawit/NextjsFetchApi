import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { use } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  brand: string;
};

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  if (!res.ok) return notFound();
  const product: Product = await res.json();

  return (
    <div className="mx-auto px-4 py-10 text-center border rounded-lg shadow-md max-w-2xl space-y-4">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={500}
        height={300}
        className="object-cover rounded mb-6 items-center mx-auto"
      />
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <p className="mb-2">Brand: {product.brand}</p>
      <Badge variant="outline"> {product.category}</Badge>
      <p className="text-lg text-green-600 font-semibold mb-4">${product.price}</p>
      <p className="px-10">{product.description}</p>
    </div>
  );
}
