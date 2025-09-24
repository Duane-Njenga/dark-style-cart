import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart(product, product.sizes[0]); // Default to first size
  };

  return (
    <Card className="group bg-gradient-card border-border hover:shadow-glow transition-all duration-300 hover:scale-105 overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-4 left-4 bg-accent/90 text-accent-foreground">
          {product.category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          <div className="flex gap-1">
            {product.sizes.map((size) => (
              <Badge key={size} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
          </div>
        </div>
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:shadow-glow"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};