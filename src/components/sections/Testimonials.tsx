"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CTO",
    company: "HealthTech Innovations",
    review: "Denami Labs entirely transformed our legacy data systems. Their AI-driven approach reduced our processing time by 80%. True enterprise professionals.",
    initials: "SJ"
  },
  {
    name: "Marcus Chen",
    role: "Founder & CEO",
    company: "Nexus SaaS",
    review: "The custom software they delivered was flawless. Their communication was transparent throughout the process, and the final product exceeded all expectations.",
    initials: "MC"
  },
  {
    name: "Elena Rodriguez",
    role: "VP of Operations",
    company: "Global Logistics Inc",
    review: "Implementing their AI voice agent saved us over a million dollars in the first year. Denami Labs is our go-to technology partner moving forward.",
    initials: "ER"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Client Success Stories
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full bg-card border-border hover:border-primary/30 transition-colors relative">
                <Quote className="absolute top-6 right-6 text-primary/10 w-12 h-12" />
                <CardContent className="pt-8 px-6 pb-6 flex flex-col h-full">
                  <p className="text-muted-foreground leading-relaxed flex-1 relative z-10 mb-8 italic">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="h-12 w-12 border border-border">
                      <AvatarImage src="" alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
