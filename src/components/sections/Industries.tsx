"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, Home, BookOpen, ShoppingCart, Truck, Rocket, Briefcase } from "lucide-react";

const industries = [
  { name: "Healthcare", icon: Building2 },
  { name: "Finance", icon: Landmark },
  { name: "Real Estate", icon: Home },
  { name: "Education", icon: BookOpen },
  { name: "E-Commerce", icon: ShoppingCart },
  { name: "Logistics", icon: Truck },
  { name: "Startups", icon: Rocket },
  { name: "Professional Services", icon: Briefcase },
];

export function Industries() {
  return (
    <section className="py-24 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Industries We Transform
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {industries.map((industry, index) => (
            <div key={index} className="flex items-center gap-3 px-6 py-4 bg-card border border-border rounded-full shadow-sm hover:border-primary hover:shadow-md transition-all cursor-default">
              <industry.icon size={20} className="text-primary" />
              <span className="font-semibold text-foreground">{industry.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
