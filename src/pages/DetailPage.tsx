import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  prince: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col fap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          className="rounded-md object-cover h-full w-full"
          src={restaurant.imageUrl}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem, index) => (
            <MenuItem menuItem={menuItem} key={index} />
          ))}
        </div>
        <div>
          {/*  <Card>
            <OrderSummary restaurant={restaurant} cartItems={cartItems} />
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
