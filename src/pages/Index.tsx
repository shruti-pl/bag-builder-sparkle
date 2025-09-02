import { BagCustomizer } from "@/components/BagCustomizer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-fabric-hover border-fabric-hover">
            <Sparkles className="mr-2 h-4 w-4" />
            Premium Customization Experience
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Build Your Own
            <span className="bg-gradient-warm bg-clip-text text-transparent block">
              Sling Bag
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Design your perfect sling bag with our interactive customizer. Choose from premium fabrics, 
            strap styles, and colors to create something uniquely yours.
          </p>
          
          <BagCustomizer />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="p-8 text-center hover:shadow-medium transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Interactive Preview</h3>
            <p className="text-muted-foreground">
              See your changes in real-time with our interactive 3D bag preview. 
              Hover and click different parts to customize.
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-medium transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Premium Materials</h3>
            <p className="text-muted-foreground">
              Choose from a curated selection of high-quality fabrics and materials 
              for your perfect bag.
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-medium transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Made to Order</h3>
            <p className="text-muted-foreground">
              Each bag is crafted specifically for you with attention to detail 
              and premium craftsmanship.
            </p>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-block p-1 bg-gradient-warm rounded-2xl">
            <div className="bg-background px-8 py-6 rounded-xl">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Ready to create your perfect bag?
              </h2>
              <p className="text-muted-foreground mb-4">
                Join thousands of happy customers who've designed their dream bags
              </p>
              <BagCustomizer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
