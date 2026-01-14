import { FileText, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Trip {
  id: string;
  filename: string;
  timestamp: string;
  total: number;
}

interface RecentTripsProps {
  trips: Trip[];
}

export function RecentTrips({ trips }: RecentTripsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        Recent Trips
      </h3>
      
      <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
        <AnimatePresence mode="popLayout">
          {trips.length === 0 ? (
            <p className="text-sm text-muted-foreground/60 text-center py-4">
              No recent trips
            </p>
          ) : (
            trips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono text-foreground truncate">
                    {trip.filename}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {trip.timestamp}
                  </p>
                </div>
                <span className="text-sm font-mono text-primary font-medium">
                  {trip.total.toFixed(2)} KMD
                </span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export type { Trip };
