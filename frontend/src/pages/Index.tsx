import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Car, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationSelect } from "@/components/LocationSelect";
import { TransportModeSelector, TransportMode } from "@/components/TransportModeSelector";
import { PromoCodeInput } from "@/components/PromoCodeInput";
import { Receipt, ReceiptData } from "@/components/Receipt";
import { RecentTrips, Trip } from "@/components/RecentTrips";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = "http://localhost:5000/api";

const Index = () => {
  const { toast } = useToast();
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [transportMode, setTransportMode] = useState<TransportMode>("car");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [recentTrips, setRecentTrips] = useState<Trip[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // LINK 1: Validate Promo with Python Backend [cite: 5, 6]
  const handleValidatePromo = useCallback(async (code: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/validate-promo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      
      const data = await response.json();
      
      if (data.valid) {
        setPromoDiscount(data.discount);
        return true;
      }
      setPromoDiscount(0);
      return false;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Could not reach the promo validation server.",
      });
      return false;
    }
  }, [toast]);

  // LINK 2: Generate Receipt & Calculate Fare with Python Backend 
  const generateReceipt = useCallback(async () => {
    if (!startLocation || !destination) return;

    setIsGenerating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: startLocation,
          to: destination,
          mode: transportMode,
          promoCode: promoCode,
        }),
      });

      if (!response.ok) throw new Error("Backend calculation failed");

      const data = await response.json();

      // Update UI with real data from Python logic 
      setReceipt(data);

      const newTrip: Trip = {
        id: `${Date.now()}`,
        filename: data.filename,
        timestamp: new Date().toLocaleTimeString(),
        total: data.totalFinal,
      };

      setRecentTrips((prev) => [newTrip, ...prev.slice(0, 4)]);
      
      toast({
        title: "Success",
        description: `Receipt ${data.filename} generated successfully.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "The transport engine encountered an error.",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [startLocation, destination, transportMode, promoCode, toast]);

  const canGenerate = startLocation && destination && startLocation !== destination;

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Car className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient-gold">DROPME</h1>
            <p className="text-sm text-muted-foreground">Kingdom of Miranda Cab Services</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="dashboard-card space-y-6"
        >
          <div className="flex items-center gap-2 pb-4 border-b border-border">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Trip Configuration</h2>
          </div>

          <LocationSelect
            label="Start Location"
            value={startLocation}
            onChange={setStartLocation}
            placeholder="Select pickup point"
          />

          <LocationSelect
            label="Destination"
            value={destination}
            onChange={setDestination}
            placeholder="Select drop-off point"
          />

          {startLocation && destination && startLocation === destination && (
            <p className="text-sm text-destructive">
              Start location and destination cannot be the same
            </p>
          )}

          <TransportModeSelector value={transportMode} onChange={setTransportMode} />

          <PromoCodeInput
            value={promoCode}
            onChange={setPromoCode}
            onValidate={handleValidatePromo}
            discount={promoDiscount}
          />

          <Button
            onClick={generateReceipt}
            disabled={!canGenerate || isGenerating}
            className="w-full h-14 text-lg font-semibold shadow-glow hover:shadow-[0_0_30px_hsl(43_74%_49%/0.3)] transition-all duration-300"
            size="lg"
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
            ) : (
              <FileText className="h-5 w-5 mr-2" />
            )}
            {isGenerating ? "Connecting to Engine..." : "Generate Receipt"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="dashboard-card space-y-6"
        >
          <div className="flex items-center gap-2 pb-4 border-b border-border">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Receipt & Billing</h2>
          </div>

          <Receipt data={receipt} />

          <div className="pt-4 border-t border-border">
            <RecentTrips trips={recentTrips} />
          </div>
        </motion.div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2026 DROPME - Kingdom of Miranda Transportation Authority</p>
      </footer>
    </div>
  );
};

export default Index;