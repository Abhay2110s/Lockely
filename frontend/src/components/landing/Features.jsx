import {
  AlertTriangle,
  KeyRound,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";


const features = [
  {
    icon: KeyRound,
    title: "Password Generator",
    desc: "Create strong and unique passwords instantly.",
    position:
      "left-0 top-20",
  },
  {
    icon: ShieldCheck,
    title: "Strength Analyzer",
    desc: "Check password security with intelligent analysis.",
    position:
      "right-0 top-20",
  },
  {
    icon: Lightbulb,
    title: "Security Guidance",
    desc: "Learn better practices to protect your accounts.",
    position:
      "left-12 bottom-12",
  },
  {
    icon: AlertTriangle,
    title: "Breach Awareness",
    desc: "Understand threats and avoid common attacks.",
    position:
      "right-12 bottom-12",
  },
];


export default function Features() {


  return (

    <section
      id="features"
      className="
      relative
      px-6
      py-28
      overflow-hidden
      "
    >


      <div
        className="
        max-w-6xl
        mx-auto
        "
      >



        {/* Heading */}

        <motion.div

          initial={{
            opacity:0,
            y:40,
          }}

          whileInView={{
            opacity:1,
            y:0,
          }}

          viewport={{
            once:false,
            amount:0.3,
          }}

          transition={{
            duration:0.7,
          }}

          className="
          text-center
          max-w-2xl
          mx-auto
          "
        >

          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-rose-100
            text-[#ff2056]
            px-4
            py-2
            text-sm
            font-medium
            "
          >

            <ShieldCheck className="size-4"/>

            Security Features

          </div>



          <h2
            className="
            mt-6
            text-4xl
            md:text-5xl
            font-semibold
            tracking-tight
            text-zinc-950
            "
          >

            Everything protecting your identity

          </h2>



          <p
            className="
            mt-4
            text-lg
            text-zinc-500
            leading-8
            "
          >

            Powerful tools designed to create,
            analyze and improve your password security.

          </p>


        </motion.div>







        {/* Orbit Area */}


        <div
          className="
          relative
          mt-24
          h-[550px]
          "
        >



          {/* Outer Orbit */}


          <motion.div

            animate={{
              rotate:360,
            }}

            transition={{
              duration:35,
              repeat:Infinity,
              ease:"linear",
            }}

            className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[420px]
            h-[420px]
            rounded-full
            border
            border-pink-200
            "

          />





          {/* Glow */}


          <div

            className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-72
            h-72
            rounded-full
            bg-pink-200/40
            blur-[100px]
            "

          />







          {/* Center Shield */}


          <motion.div

            initial={{
              scale:0,
              opacity:0,
            }}

            whileInView={{
              scale:1,
              opacity:1,
            }}

            viewport={{
              once:false,
            }}

            transition={{
              duration:0.8,
            }}

            animate={{
              y:[0,-15,0],
            }}

            className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-48
            h-48
            rounded-full
            bg-gradient-to-br
            from-orange-400
            to-pink-500
            flex
            items-center
            justify-center
            shadow-[0_0_100px_rgba(244,114,182,0.5)]
            "

          >

            <ShieldCheck
              className="
              size-24
              text-white
              "
            />

          </motion.div>









          {/* Feature Nodes */}


          {
            features.map(
              (
                item,
                index
              )=>{


              const Icon=item.icon;


              return (

                <motion.div

                  key={item.title}


                  initial={{
                    opacity:0,
                    scale:0.5,
                  }}


                  whileInView={{
                    opacity:1,
                    scale:1,
                  }}


                  viewport={{
                    once:false,
                    amount:0.3,
                  }}


                  transition={{
                    duration:0.6,
                    delay:index*0.15,
                  }}


                  whileHover={{
                    scale:1.08,
                  }}


                  animate={{
                    y:[
                      0,
                      index%2===0?-12:12,
                      0,
                    ],
                  }}


                  className={`
                  absolute
                  ${item.position}
                  w-56
                  rounded-3xl
                  bg-white/90
                  backdrop-blur-xl
                  border
                  border-zinc-200
                  p-5
                  shadow-[0_20px_40px_rgba(244,114,182,0.12)]
                  `}
                >



                  <div
                    className="
                    size-11
                    rounded-2xl
                    bg-rose-100
                    text-[#ff2056]
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <Icon className="size-5"/>

                  </div>



                  <h3
                    className="
                    mt-4
                    font-semibold
                    text-zinc-950
                    "
                  >

                    {item.title}

                  </h3>



                  <p
                    className="
                    mt-2
                    text-sm
                    leading-6
                    text-zinc-500
                    "
                  >

                    {item.desc}

                  </p>



                </motion.div>

              );

            })
          }



        </div>


      </div>


    </section>

  );
}