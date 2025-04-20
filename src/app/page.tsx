"use client";
import * as React from "react";
import { MdAutorenew, MdAccessTime } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { FaShippingFast } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactElement } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils"; // ใช้เพื่อจัด className (ถ้ามี lib นี้ในโปรเจกต์)
import Image from "next/image";

type highlight = {
  title: string;
  description: string;
  icon: ReactElement;
};
type AllProduct = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  category: string;
};
type Smartphone = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  category: string;
  brand: string;
};

export default function Home() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [allProducts, setAllProducts] = React.useState<AllProduct[]>([]);
  const [smartphone, setSmartphone] = React.useState<Smartphone[]>([]);
  const images = ["/cover1.png", "/cover2.png"];
  // Set API
  const highlights: highlight[] = [
    {
      title: "Fast Delivery",
      description: "Get your data in real-time with our fast delivery system.",
      icon: <FaShippingFast className="text-4xl text-gray-600" />,
    },
    {
      title: "Easy Returns",
      description: "Return within 7 days without any hassle.",
      icon: <MdAutorenew className="text-4xl text-gray-600" />,
    },
    {
      title: "Quick Support",
      description: "Fast and responsive support team.",
      icon: <MdAccessTime className="text-4xl text-gray-600" />,
    },
  ];
  // Sync scroll snap list
  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Autoplay logic
  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollTo((api.selectedScrollSnap() + 1) % count);
    }, 3000); // ทุก 3 วินาที

    return () => clearInterval(interval); // clear เมื่อ component ถูก destroy
  }, [api, count]);

  React.useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {
    fetch("https://dummyjson.com/products/category/smartphones")
      .then((res) => res.json())
      .then((data) => {
        setSmartphone(data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="relative w-full mx-auto rounded-xl overflow-hidden mt-5 px-4">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.map((src, idx) => (
              <CarouselItem key={idx}>
                <div className="relative h-60 sm:h-80 md:h-96 w-full">
                  <Image
                    src={src}
                    alt={`Cover ${idx + 1}`}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                i === current ? "bg-black scale-110" : "bg-gray-400"
              )}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto px-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 border shadow flex flex-col items-center text-center"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-semibold text-base">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 mt-10">
        <h2 className="font-semibold text-xl mb-4">All Products</h2>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full" // full width
        >
          <CarouselContent>
            {allProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5" // responsive card width
              >
                <div className="p-2">
                  <Card className="h-full">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={150}
                        height={150}
                        className="object-cover rounded mb-2"
                      />
                      <Badge variant="outline"> {product.category}</Badge>
                      <p className="font-medium text-base line-clamp-1 m-2">
                        {product.title}
                      </p>
                      <p className="text-sm text-green-600">${product.price}</p>
                      <Link href={`/product/${product.id}`} passHref>
                        <Button className="mt-4 px-6 py-2 rounded-lg transition-all">
                          Detail
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="mx-auto px-4 mt-10">
        <h2 className="font-semibold text-xl mb-4">Smartphone</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full" // full width
        >
          <CarouselContent>
            {smartphone.map((item) => (
              <CarouselItem
                key={item.id}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5" // responsive card width
              >
                <div className="p-2">
                  <Card className="h-full">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={150}
                        height={150}
                        className="object-cover rounded mb-2"
                      />
                      <Badge variant="outline"> {item.category}</Badge>
                      <p className="font-medium text-base line-clamp-1 m-2">
                        {item.title}
                      </p>
                      <p className="text-sm text-green-600">${item.price}</p>
                      <Link href={`/product/${item.id}`} passHref>
                        <Button className="mt-4 px-6 py-2 rounded-lg transition-all">
                          Detail
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
