import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Features from "./Features";
import Security from "./Security";
import FAQ from "./FAQ";
import CTA from "./CTA";


export default function LandingScroll() {

  const containerRef = useRef(null);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [
      "start start",
      "end end"
    ],
  });


  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-300%"]
  );


  return (
    <div
      ref={containerRef}
      className="h-[400vh]"
    >

      <div
        className="
        sticky
        top-0
        h-screen
        overflow-hidden
        "
      >

        <motion.div
          style={{ x }}
          className="
          flex
          h-full
          "
        >

          <div className="w-screen shrink-0 flex items-center justify-center">
            <Features />
          </div>


          <div className="w-screen shrink-0 flex items-center justify-center">
            <Security />
          </div>


          <div className="w-screen shrink-0 flex items-center justify-center">
            <FAQ />
          </div>


          <div className="w-screen shrink-0 flex items-center justify-center">
            <CTA />
          </div>


        </motion.div>

      </div>

    </div>
  );
}