"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  "Tailored Solutions",
  "Scalable Architecture",
  "Dedicated Team",
  "Modern Technology Stack",
  "Security First",
  "Long-Term Support",
  "Fast Delivery",
  "Transparent Communication",
];

export function WhyUs() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 -skew-x-12 translate-x-1/4 -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Why Choose <span className="text-primary">Denami Labs</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We don't just write code; we build strategic partnerships. Our team of expert engineers and AI specialists work closely with you to deliver solutions that drive real business value, ensuring your technology becomes your competitive advantage.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="text-primary h-6 w-6 shrink-0" />
                  <span className="font-medium text-foreground">{reason}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-border"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 mix-blend-overlay z-10"></div>
            {/* Abstract tech pattern background instead of image to maintain sleek look */}
            <div className="absolute inset-0 bg-card bg-grid-white/[0.05] flex items-center justify-center p-8">
               <div className="w-full h-full border border-primary/20 rounded-2xl relative overflow-hidden flex flex-col gap-4 p-6">
                  <div className="w-3/4 h-8 bg-secondary rounded animate-pulse"></div>
                  <div className="w-1/2 h-6 bg-secondary/50 rounded animate-pulse delay-75"></div>
                  <div className="w-full flex-1 bg-primary/5 rounded-xl border border-primary/10 mt-4 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
