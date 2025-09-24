import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { CartSidebar } from "@/components/CartSidebar";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

// Import product images
import hoodieImage from "@/assets/hoodie-black.jpg";
import tshirtImage from "@/assets/tshirt-black.jpg";
import jeansImage from "@/assets/jeans-black.jpg";
import sneakersImage from "@/assets/sneakers-black.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
}

interface CartItem extends Product {
  size: string;
  quantity: number;
}

const products: Product[] = [
  {
    id: "1",
    name: "Essential Black Hoodie",
    price: 89,
    image: hoodieImage,
    category: "Hoodies",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "2",
    name: "Premium Black Tee",
    price: 45,
    image: tshirtImage,
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "3",
    name: "Designer Black Jeans",
    price: 129,
    image: jeansImage,
    category: "Denim",
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    id: "4",
    name: "Stealth Sneakers",
    price: 159,
    image: sneakersImage,
    category: "Footwear",
    sizes: ["7", "8", "9", "10", "11", "12"]
  }
];

export const Home = () => {
  const { cartItems, addToCart, updateQuantity, removeItem, cartItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent animate-fade-in">
              NOIR COLLECTION
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up">
              Minimalist elegance meets contemporary streetwear
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:shadow-glow"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span>4.9/5 from 2,000+ reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Items</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Carefully curated pieces that define modern minimalism. Each item is designed 
              to be timeless, versatile, and effortlessly stylish.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={addToCart}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free worldwide shipping on orders over $100
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-muted-foreground">
                Crafted from the finest materials with attention to detail
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">30-Day Returns</h3>
              <p className="text-muted-foreground">
                Easy returns within 30 days of purchase
              </p>
            </div>
          </div>
        </div>
      </section>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
};