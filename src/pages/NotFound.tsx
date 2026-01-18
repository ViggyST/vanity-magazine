import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * 404 Not Found page
 * Clean, minimal Kino-style design
 */
const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        className="max-w-2xl w-full text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-display-xl text-foreground/10">
            404
          </h1>
        </motion.div>

        {/* Content */}
        <div className="space-y-4">
          <motion.h2
            className="text-display-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Page Not Found
          </motion.h2>
          
          <motion.p
            className="text-body-lg text-muted-foreground max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            This page doesn't exist.
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            asChild
            variant="outline"
            className="gap-2"
          >
            <Link to="/">
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default NotFound;