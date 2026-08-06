import {
  LockKeyhole,
  Zap,
  GraduationCap,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const securityBenefits = [
  {
    icon: LockKeyhole,
    title: "Zero Password Storage",
    desc: "Your passwords stay private. We never store or save your sensitive credentials.",
  },
  {
    icon: Zap,
    title: "Real-time Analysis",
    desc: "Get instant feedback about password strength and possible improvements.",
  },
  {
    icon: GraduationCap,
    title: "Security Education",
    desc: "Learn how attackers work and build better security habits.",
  },
];


export default function SecuritySection() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-rose-100
            text-rose-600
            px-4
            py-2
            text-sm
            font-medium
            "
          >
            <LockKeyhole className="size-4" />
            Security First
          </div>

          <h2
            className="
            mt-5
            text-4xl
            md:text-5xl
            font-semibold
            tracking-tight
            text-zinc-950
            "
          >
            Built around your privacy
          </h2>

          <p
            className="
            mt-4
            text-lg
            leading-8
            text-zinc-500
            "
          >
            PassGuidance helps you create stronger passwords while
            keeping your security and privacy as the priority.
          </p>
        </motion.div>


        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          "
        >
          {securityBenefits.map(
            ({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{
                  opacity: 0,
                  y: 80,
                  scale: 0.85,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.25,
                }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 90,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
              >
                <Card
                  className="
                  h-full
                  rounded-[28px]
                  bg-white/80
                  backdrop-blur-xl
                  border-white
                  shadow-[0_20px_50px_rgba(244,114,182,0.12)]
                  p-6
                  "
                >
                  <CardHeader className="p-0 gap-4">

                    <div
                      className="
                      size-12
                      rounded-2xl
                      bg-gradient-to-br
                      from-orange-200
                      to-pink-200
                      text-rose-600
                      flex
                      items-center
                      justify-center
                      "
                    >
                      <Icon className="size-6" />
                    </div>

                    <CardTitle
                      className="
                      text-xl
                      font-semibold
                      text-zinc-950
                      "
                    >
                      {title}
                    </CardTitle>

                  </CardHeader>

                  <CardContent className="p-0 mt-3">
                    <p
                      className="
                      text-zinc-500
                      leading-7
                      "
                    >
                      {desc}
                    </p>
                  </CardContent>

                </Card>
              </motion.div>
            )
          )}
        </div>

      </div>
    </section>
  );
}