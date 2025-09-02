import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Palette, Settings, Download, ZoomOut } from "lucide-react";

type FabricType = {
  id: string;
  name: string;
  pattern: string;
  color: string;
};

type StrapType = {
  id: string;
  name: string;
  style: string;
  color: string;
  price: number;
};

const fabricOptions: FabricType[] = [
  { id: "black-carbon", name: "Black Carbon", pattern: "carbon-fiber", color: "#1a1a1a" },
  { id: "red-grid", name: "Red Grid", pattern: "grid", color: "#dc2626" },
  { id: "green-diamond", name: "Green Diamond", pattern: "diamond", color: "#16a34a" },
  { id: "brown-leather", name: "Brown Leather", pattern: "leather", color: "#a16207" },
  { id: "blue-wave", name: "Blue Wave", pattern: "wave", color: "#2563eb" },
  { id: "black-mesh", name: "Black Mesh", pattern: "mesh", color: "#374151" },
];

const strapOptions: StrapType[] = [
  { id: "flat-black", name: "Flat Strap", style: "flat", color: "#1a1a1a", price: 0 },
  { id: "padded-orange", name: "Padded Strap", style: "padded", color: "#ea580c", price: 1100 },
];

export const BagCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState(fabricOptions[0]);
  const [selectedStrap, setSelectedStrap] = useState(strapOptions[0]);
  const [currentStep, setCurrentStep] = useState<"fabric" | "strap">("fabric");
  const [hoveredArea, setHoveredArea] = useState<"bag" | "strap" | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const basePrice = 8100;
  const totalPrice = basePrice + selectedStrap.price;

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const handleAreaHover = (area: "bag" | "strap") => {
    setHoveredArea(area);
    
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    const timeout = setTimeout(() => {
      setHoveredArea(null);
    }, 5000);
    
    setHoverTimeout(timeout);
  };

  const handleAreaLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setHoveredArea(null);
  };

  const handleAreaClick = (area: "bag" | "strap") => {
    setCurrentStep(area === "bag" ? "fabric" : "strap");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-gradient-warm hover:shadow-medium transition-all duration-300 text-lg px-8 py-6 rounded-xl">
          <Palette className="mr-2 h-5 w-5" />
          Build Your Own Sling Bag
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-6xl h-[90vh] p-0 bg-gradient-surface border-0 rounded-2xl overflow-hidden">
        <div className="flex h-full">
          {/* Left Panel - Customization Options */}
          <div className="w-96 bg-card border-r border-border flex flex-col overflow-hidden">
            {/* Reference Image */}
            <div className="p-4 border-b border-border">
              <img 
                src="/lovable-uploads/d5c367b1-bbc9-40b0-9cdf-bf2bca499f35.png" 
                alt="Sling bag reference" 
                className="w-full h-32 object-contain rounded-lg bg-muted"
              />
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Bag Fabric Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Bag Fabric</h3>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  {selectedFabric.name}
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {fabricOptions.map((fabric) => (
                    <Card
                      key={fabric.id}
                      className={`
                        aspect-square cursor-pointer transition-all duration-200 p-2 hover:shadow-medium
                        ${selectedFabric.id === fabric.id ? "ring-2 ring-primary" : ""}
                      `}
                      onClick={() => setSelectedFabric(fabric)}
                    >
                      <div
                        className="w-full h-full rounded-lg"
                        style={{
                          backgroundColor: fabric.color,
                          backgroundImage: getPatternBackground(fabric.pattern, fabric.color)
                        }}
                      />
                    </Card>
                  ))}
                </div>
              </div>

              {/* Strap Style Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Strap Style</h3>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  {selectedStrap.name} - {selectedStrap.color}
                </div>
                
                <div className="space-y-3">
                  {strapOptions.map((strap) => (
                    <Card
                      key={strap.id}
                      className={`
                        cursor-pointer transition-all duration-200 p-4 hover:shadow-medium
                        ${selectedStrap.id === strap.id ? "ring-2 ring-primary" : ""}
                      `}
                      onClick={() => setSelectedStrap(strap)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            w-16 rounded-full
                            ${strap.style === "padded" ? "h-6" : "h-4"}
                          `}
                          style={{ backgroundColor: strap.color }}
                        />
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{strap.name}</div>
                          {strap.price > 0 && (
                            <div className="text-sm text-fabric-hover">
                              +₹{strap.price.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Strap Colour</h4>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-bag-strap border-2 border-white shadow-sm cursor-pointer" />
                    <div className="w-8 h-8 rounded-full bg-primary border-2 border-white shadow-sm cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Header and Actions */}
          <div className="flex-1 bg-gradient-surface flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Let's build your Sling
              </h2>
              <div className="text-3xl font-bold text-foreground mb-2">
                ₹{totalPrice.toLocaleString()}
              </div>
              {selectedStrap.price > 0 && (
                <div className="text-sm text-muted-foreground">
                  +₹{selectedStrap.price.toLocaleString()} for strap
                </div>
              )}
            </div>

            <div className="flex gap-4 mb-8">
              <Button 
                variant="outline" 
                size="lg"
                className="flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="flex items-center gap-2"
              >
                <ZoomOut className="h-5 w-5" />
                Zoom Out
              </Button>
            </div>

            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg rounded-xl shadow-medium"
              onClick={() => {
                setIsOpen(false);
                // Add to cart logic would go here
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function getPatternBackground(pattern: string, baseColor: string): string {
  switch (pattern) {
    case "carbon-fiber":
      return `
        radial-gradient(circle at 25% 25%, ${baseColor}33 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, ${baseColor}33 2px, transparent 2px)
      `;
    case "grid":
      return `
        linear-gradient(${baseColor}33 1px, transparent 1px),
        linear-gradient(90deg, ${baseColor}33 1px, transparent 1px)
      `;
    case "diamond":
      return `
        conic-gradient(from 45deg at 50% 50%, ${baseColor}33 90deg, transparent 90deg)
      `;
    case "leather":
      return `
        radial-gradient(circle at 20% 20%, ${baseColor}22 1px, transparent 1px),
        radial-gradient(circle at 80% 80%, ${baseColor}22 1px, transparent 1px)
      `;
    case "wave":
      return `
        repeating-linear-gradient(45deg, ${baseColor}33, ${baseColor}33 2px, transparent 2px, transparent 8px)
      `;
    case "mesh":
      return `
        repeating-linear-gradient(0deg, ${baseColor}33, ${baseColor}33 1px, transparent 1px, transparent 4px),
        repeating-linear-gradient(90deg, ${baseColor}33, ${baseColor}33 1px, transparent 1px, transparent 4px)
      `;
    default:
      return "none";
  }
}