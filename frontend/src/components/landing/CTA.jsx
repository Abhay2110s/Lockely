import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";


export default function CTA() {
  return (
    <section className="px-6 py-24">

      <div className="max-w-6xl mx-auto relative">


        {/* Background Glow */}

        <motion.div
          animate={{
            scale:[1,1.2,1],
            opacity:[0.4,0.7,0.4],
          }}
          transition={{
            duration:4,
            repeat:Infinity,
            ease:"easeInOut",
          }}
          className="
          absolute
          inset-0
          rounded-[40px]
          bg-pink-200/40
          blur-3xl
          "
        />



        {/* CTA Card */}

        <motion.div

          initial={{
            opacity:0,
            y:80,
            scale:0.9,
          }}

          whileInView={{
            opacity:1,
            y:0,
            scale:1,
          }}

          viewport={{
            once:false,
            amount:0.3,
          }}

          transition={{
            duration:0.7,
            type:"spring",
            stiffness:80,
          }}

          className="
          relative
          rounded-[36px]
          bg-gradient-to-r
          from-rose-50
          via-pink-50
          to-orange-50
          border
          border-rose-100
          shadow-[0_25px_70px_rgba(244,114,182,0.15)]
          p-12
          flex
          flex-col
          items-center
          text-center
          "

        >


          {/* Floating Icon */}

          <motion.div

            animate={{
              y:[0,-12,0],
              rotate:[0,5,-5,0],
            }}

            transition={{
              duration:4,
              repeat:Infinity,
              ease:"easeInOut",
            }}

            className="
            size-16
            rounded-3xl
            bg-white
            shadow-lg
            flex
            items-center
            justify-center
            text-rose-600
            "
          >

            <ShieldCheck className="size-8"/>

          </motion.div>





          <motion.h2

            initial={{
              opacity:0,
              y:30,
            }}

            whileInView={{
              opacity:1,
              y:0,
            }}

            viewport={{
              once:false,
            }}

            transition={{
              delay:0.2,
            }}

            className="
            mt-8
            text-4xl
            md:text-5xl
            font-semibold
            tracking-tight
            text-zinc-950
            "

          >

            Ready to improve your password security?

          </motion.h2>





          <p

            className="
            mt-5
            max-w-xl
            text-lg
            leading-8
            text-zinc-500
            "

          >

            Start protecting your accounts today with stronger
            passwords and smarter security practices.

          </p>






          {/* Animated Button */}

          <motion.div

            whileHover={{
              scale:1.08,
            }}

            whileTap={{
              scale:0.95,
            }}

            className="mt-8"

          >

            <Button

              className="
              rounded-full
              bg-gradient-to-r
              from-orange-400
              to-pink-500
              text-white
              font-semibold
              px-8
              h-12
              shadow-[0_15px_35px_rgba(236,72,153,0.35)]
              "

            >

              Create Account

              <ArrowRight className="size-4 ml-2"/>

            </Button>


          </motion.div>



        </motion.div>


      </div>

    </section>
  );
}