"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-primary text-primary-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Ready to Build Something Exceptional?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-primary-foreground/80 mb-12"
          >
            Let's discuss your vision and create a solution that drives meaningful business growth.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="#" className="inline-flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] h-14 px-8 w-full sm:w-auto text-base rounded-full shadow-2xl font-medium transition-colors">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="#" className="inline-flex items-center justify-center border border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary h-14 px-8 w-full sm:w-auto text-base rounded-full font-medium transition-colors">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
