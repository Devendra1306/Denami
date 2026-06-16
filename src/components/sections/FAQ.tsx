"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer comprehensive custom software development, AI solutions, AI voice agents, SaaS platform development, web and mobile applications, business automation, and cloud infrastructure setup."
  },
  {
    question: "Can you build custom software?",
    answer: "Yes, our core expertise is building tailored enterprise software solutions designed specifically to address your unique business challenges and scale seamlessly."
  },
  {
    question: "Do you provide AI solutions?",
    answer: "Absolutely. We specialize in integrating cutting-edge AI technologies, including custom LLMs, machine learning models, and intelligent voice agents into existing or new platforms."
  },
  {
    question: "Can you integrate with existing systems?",
    answer: "Yes, we have extensive experience building custom APIs and webhooks to ensure our solutions integrate flawlessly with your existing legacy systems or third-party SaaS tools."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "We offer comprehensive ongoing support and maintenance packages. This ensures your software remains secure, updated, and optimized long after the initial deployment."
  }
];

export function FAQ() {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to know about working with Denami Labs.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
