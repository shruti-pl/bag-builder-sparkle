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
  { id: "red-grid", name: "Gridstop Chili", pattern: "grid", color: "#dc2626" },
  { id: "green-diamond", name: "Green Diamond", pattern: "diamond", color: "#16a34a" },
  { id: "brown-leather", name: "Brown Leather", pattern: "leather", color: "#a16207" },
  { id: "blue-wave", name: "Blue Wave", pattern: "wave", color: "#2563eb" },
  { id: "black-mesh", name: "Gridstop Black", pattern: "mesh", color: "#374151" },
];

const strapOptions: StrapType[] = [
  { id: "flat-black", name: "Flat Strap", style: "flat", color: "#1a1a1a", price: 0 },
  { id: "padded-orange", name: "Lite Strap", style: "padded", color: "#ea580c", price: 2100 },
];

const strapColors = [
  { id: "black", name: "Black", color: "#1a1a1a", price: 0 },
  { id: "gray", name: "Gray", color: "#6b7280", price: 1100 },
];

export const BagCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState(fabricOptions[1]); // Start with Gridstop Chili
  const [selectedStrap, setSelectedStrap] = useState(strapOptions[0]);
  const [selectedStrapColor, setSelectedStrapColor] = useState(strapColors[0]);
  const [hoveredFabric, setHoveredFabric] = useState<string | null>(null);

  const basePrice = 8100;
  const totalPrice = basePrice + selectedStrap.price + selectedStrapColor.price;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-gradient-warm hover:shadow-medium transition-all duration-300 text-lg px-8 py-6 rounded-xl">
          <Palette className="mr-2 h-5 w-5" />
          Build Your Own Sling Bag
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-7xl h-[90vh] p-0 bg-white border-0 rounded-none overflow-hidden">
        <div className="flex h-full relative">
          {/* Left Panel - Customization Options */}
          <div className="w-96 bg-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6">
              <h2 className="text-3xl font-bold text-black">
                Let's build your Sling
              </h2>
            </div>

            {/* Content - Scrollable with invisible scrollbar */}
            <div className="flex-1 p-6 overflow-y-auto scrollbar-hide space-y-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Bag Fabric Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-black">Bag Fabric</h3>
                  <div className="text-sm text-gray-500">{selectedFabric.name}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {fabricOptions.map((fabric) => (
                    <div key={fabric.id} className="relative">
                      <Card
                        className={`
                          aspect-square cursor-pointer transition-all duration-200 p-2 hover:shadow-lg border-2
                          ${selectedFabric.id === fabric.id ? "border-black" : "border-gray-200"}
                        `}
                        onClick={() => setSelectedFabric(fabric)}
                        {/* onMouseEnter={() => setHoveredFabric(fabric.id)} */}
                        {/* onMouseLeave={() => setHoveredFabric(null)} */}
                      >
                        <div
                          className="w-full h-full rounded-lg"
                          style={{
                            backgroundColor: fabric.color,
                            backgroundImage: getPatternBackground(fabric.pattern, fabric.color)
                          }}
                        />
                      </Card>
                      {hoveredFabric === fabric.id && (
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                          {fabric.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Strap Style Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-black">Strap Style</h3>
                  <div className="text-sm text-gray-500">{selectedStrap.name}</div>
                </div>
                
                <div className="flex gap-4">
                  {strapOptions.map((strap) => (
                    <div key={strap.id} className="relative">
                      <Card
                        className={`
                          w-20 h-20 cursor-pointer transition-all duration-200 p-3 hover:shadow-lg border-2 rounded-full
                          ${selectedStrap.id === strap.id ? "border-black" : "border-gray-200"}
                        `}
                        onClick={() => setSelectedStrap(strap)}
                      >
                        <div
                          className={`
                            w-full rounded-full
                            ${strap.style === "padded" ? "h-6 border-2 border-white" : "h-4"}
                          `}
                          style={{ backgroundColor: strap.color }}
                        />
                      </Card>
                      {strap.price > 0 && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          +₹{strap.price.toLocaleString()}.00
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Strap Colour Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-black">Strap Colour</h3>
                  <div className="text-sm text-gray-500">Lite Strap - {selectedStrapColor.name}</div>
                </div>
                
                <div className="flex gap-4">
                  {strapColors.map((color) => (
                    <div key={color.id} className="relative">
                      <Card
                        className={`
                          w-16 h-16 cursor-pointer transition-all duration-200 p-2 hover:shadow-lg border-2 rounded-full
                          ${selectedStrapColor.id === color.id ? "border-black" : "border-gray-200"}
                        `}
                        onClick={() => setSelectedStrapColor(color)}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{ backgroundColor: color.color }}
                        />
                      </Card>
                      {color.price > 0 && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          +₹{color.price.toLocaleString()}.00
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Price and Bag Preview */}
          <div className="flex-1 bg-gray-50 flex flex-col relative">
            {/* Top Bar with Price and Actions */}
            <div className="absolute top-6 right-6 flex items-center gap-4 z-10">
              <div className="text-2xl font-bold text-black">₹{totalPrice.toLocaleString()}.00</div>
              <Button variant="ghost" size="sm" className="p-2">
                <ZoomOut className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Download className="h-5 w-5" />
              </Button>
            </div>

            {/* Bag Preview */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="relative w-96 h-96">
                <div
                  className="absolute inset-0 rounded-3xl shadow-lg transition-all duration-500"
                  style={{ 
                    backgroundColor: selectedFabric.color,
                    backgroundImage: getPatternBackground(selectedFabric.pattern, selectedFabric.color)
                  }}
                >
                  {/* Bag details */}
                  <div className="absolute inset-4 border border-white/20 rounded-2xl"></div>
                  <div className="absolute top-8 left-8 w-8 h-8 bg-orange-500 rounded-full opacity-80"></div>
                </div>

                {/* Strap */}
                <div
                  className={`
                    absolute -top-8 left-1/2 transform -translate-x-1/2 w-80 rounded-full shadow-md transition-all duration-500
                    ${selectedStrap.style === "padded" ? "h-20" : "h-12"}
                  `}
                  style={{ backgroundColor: selectedStrapColor.color }}
                >
                  {selectedStrap.style === "padded" && (
                    <div className="absolute inset-2 border border-white/30 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="p-8 flex justify-center">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-lg rounded-xl font-semibold"
                onClick={() => {
                  setIsOpen(false);
                  // Add to cart logic would go here
                }}
              >
                Add to cart
              </Button>
            </div>
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