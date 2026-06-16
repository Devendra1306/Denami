"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discovery", desc: "Understanding your vision, goals, and technical requirements." },
  { num: "02", title: "Strategy & Planning", desc: "Architecting the solution and defining the project roadmap." },
  { num: "03", title: "Design", desc: "Creating intuitive UI/UX and system architectures." },
  { num: "04", title: "Development", desc: "Writing clean, scalable, and secure code." },
  { num: "05", title: "Testing", desc: "Rigorous QA to ensure performance and reliability." },
  { num: "06", title: "Deployment", desc: "Smooth rollout to production environments." },
  { num: "07", title: "Ongoing Support", desc: "Continuous monitoring, maintenance, and updates." },
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Our Proven Process
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            A systematic approach ensuring delivery of high-quality software on time and within budget.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center relative group"
              >
                <div className="w-16 h-16 rounded-full bg-card border-2 border-border group-hover:border-primary group-hover:bg-primary/5 flex items-center justify-center mb-6 shadow-lg transition-all duration-300 relative z-10">
                  <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{step.num}</span>
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm uppercase tracking-wider">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed md:max-w-[120px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
