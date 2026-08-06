import { useRef } from "react";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ArrowRight,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";


export default function Hero() {

  const heroRef = useRef(null);


  // Track scrolling inside hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: [
      "start start",
      "end start",
    ],
  });


  // Move hero upward during scroll
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "-120px"]
  );


  // Slight zoom-out effect
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.95]
  );


  // Fade hero while leaving section
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.35]
  );


  return (

    <section
      ref={heroRef}
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-6
      pt-40
      md:pt-44
      "
    >

      <motion.div

        style={{
          y,
          scale,
          opacity,
        }}

        initial={{
          opacity:0,
          y:80,
        }}

        animate={{
          opacity:1,
          y:0,
        }}

        transition={{
          duration:1,
          ease:"easeOut",
        }}

        className="
        max-w-6xl
        w-full
        text-center
        "
      >


        {/* Security Badge */}

        <motion.div

          initial={{
            opacity:0,
            y:20,
          }}

          animate={{
            opacity:1,
            y:0,
          }}

          transition={{
            delay:0.2,
            duration:0.5,
          }}

          className="
          inline-flex
          items-center
          gap-2
          px-5
          py-2
          rounded-full
          bg-rose-100
          text-rose-600
          text-sm
          font-medium
          border
          border-rose-200
          "
        >

          <Lock className="size-4"/>

          Secure Identity Protection

        </motion.div>





        {/* Main Heading */}

        <motion.h1

          initial={{
            opacity:0,
            y:40,
          }}

          animate={{
            opacity:1,
            y:0,
          }}

          transition={{
            delay:0.35,
            duration:0.7,
          }}

          className="
          mt-8
          text-5xl
          md:text-7xl
          font-semibold
          tracking-tight
          leading-[1.05]
          text-zinc-950
          "
        >

          Protect Your Digital Identity

          <br />

          With Smarter Password Security

        </motion.h1>





        {/* Description */}

        <motion.p

          initial={{
            opacity:0,
            y:30,
          }}

          animate={{
            opacity:1,
            y:0,
          }}

          transition={{
            delay:0.5,
            duration:0.7,
          }}

          className="
          mt-8
          max-w-3xl
          mx-auto
          text-lg
          md:text-xl
          leading-8
          text-zinc-500
          "
        >

          Generate powerful passwords,
          analyze security strength,
          and build safer online habits
          with intelligent security guidance.

        </motion.p>







        {/* Call To Action */}

        <motion.div

          initial={{
            opacity:0,
            scale:0.8,
          }}

          animate={{
            opacity:1,
            scale:1,
          }}

          transition={{
            delay:0.75,
            duration:0.5,
            type:"spring",
          }}

          className="
          mt-10
          flex
          justify-center
          "
        >

          <Button

            className="
            h-12
            px-10
            rounded-full
            bg-gradient-to-r
            from-orange-400
            to-pink-500
            text-white
            font-semibold
            shadow-[0_15px_35px_rgba(236,72,153,0.3)]
            hover:scale-105
            transition-transform
            "
          >

            Get Started

            <ArrowRight
              className="
              size-4
              ml-2
              "
            />

          </Button>


        </motion.div>



      </motion.div>


    </section>

  );
}