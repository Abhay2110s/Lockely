import {
  AlertTriangle,
  KeyRound,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const features = [
  {
    icon: ShieldCheck,
    title: "Password Strength Checker",
    desc: "Analyze password complexity and identify weaknesses.",
  },
  {
    icon: KeyRound,
    title: "Password Generator",
    desc: "Generate secure random passwords instantly.",
  },
  {
    icon: Lightbulb,
    title: "Security Tips",
    desc: "Learn best practices to protect your accounts.",
  },
  {
    icon: AlertTriangle,
    title: "Breach Awareness",
    desc: "Understand common password attacks.",
  },
];


export default function Features() {
  return (
    <section className="px-6 py-24">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-12"
        >

          <h2
            className="
            text-4xl
            md:text-5xl
            font-semibold
            text-zinc-950
            "
          >
            Powerful Security Features
          </h2>

          <p
            className="
            mt-4
            max-w-2xl
            mx-auto
            text-lg
            text-zinc-500
            "
          >
            Everything you need to create,
            analyze, and protect your digital identity.
          </p>

        </motion.div>


        {/* Feature Cards */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          "
        >

          {features.map(
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
                  rounded-3xl
                  bg-white/80
                  backdrop-blur-xl
                  border-white
                  shadow-[0_20px_50px_rgba(244,114,182,0.12)]
                  p-6
                  "
                >

                  <CardHeader className="p-0">

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
                      mt-5
                      text-xl
                      font-semibold
                      text-zinc-950
                      "
                    >
                      {title}
                    </CardTitle>

                  </CardHeader>


                  <CardContent
                    className="
                    p-0
                    mt-3
                    "
                  >

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