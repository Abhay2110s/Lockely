import {
  ShieldCheck,
  Lock,
  Sparkles,
  EyeOff,
} from "lucide-react";

import { motion } from "framer-motion";


const values = [
  {
    icon: Lock,
    title: "Privacy First",
    desc: "Your passwords are analyzed securely without storing sensitive information.",
  },
  {
    icon: ShieldCheck,
    title: "Security Focused",
    desc: "We help users build stronger password habits and improve digital safety.",
  },
  {
    icon: EyeOff,
    title: "No Unnecessary Data",
    desc: "We believe security starts by minimizing the data we collect.",
  },
  {
    icon: Sparkles,
    title: "Simple Experience",
    desc: "Complex security concepts are simplified for everyone.",
  },
];


export default function About() {

  return (
    <main
      className="
      min-h-screen
      bg-[#fff7fa]
      text-zinc-950
      px-6
      py-32
      "
    >

      {/* Hero Section */}

      <section
        className="
        max-w-6xl
        mx-auto
        text-center
        "
      >

        <motion.div
          initial={{
            opacity:0,
            y:50,
          }}

          whileInView={{
            opacity:1,
            y:0,
          }}

          viewport={{
            once:false,
          }}

          transition={{
            duration:0.7,
          }}
        >

          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-rose-100
            text-rose-600
            px-5
            py-2
            text-sm
            font-medium
            "
          >

            <ShieldCheck className="size-4"/>

            About PassGuidance

          </div>



          <h1
            className="
            mt-8
            text-5xl
            md:text-7xl
            font-semibold
            tracking-tight
            "
          >

            Making Password Security
            <br/>
            Simple & Reliable

          </h1>



          <p
            className="
            mt-6
            max-w-3xl
            mx-auto
            text-lg
            md:text-xl
            text-zinc-500
            leading-8
            "
          >

            PassGuidance helps users create stronger passwords,
            understand security risks, and build safer digital
            habits without complexity.

          </p>


        </motion.div>


      </section>







      {/* Mission */}

      <section
        className="
        max-w-6xl
        mx-auto
        mt-24
        "
      >

        <motion.div

          initial={{
            opacity:0,
            scale:0.9,
          }}

          whileInView={{
            opacity:1,
            scale:1,
          }}

          viewport={{
            once:false,
          }}

          transition={{
            duration:0.7,
          }}

          className="
          rounded-[36px]
          bg-white/80
          backdrop-blur-xl
          border
          border-white
          shadow-[0_20px_50px_rgba(244,114,182,0.12)]
          p-10
          text-center
          "

        >

          <h2
            className="
            text-3xl
            md:text-4xl
            font-semibold
            "
          >
            Our Mission
          </h2>


          <p
            className="
            mt-5
            text-zinc-500
            text-lg
            leading-8
            max-w-3xl
            mx-auto
            "
          >

            Our mission is to make digital security accessible
            by helping people understand password protection
            and take control of their online identity.

          </p>


        </motion.div>


      </section>








      {/* Values */}

      <section
        className="
        max-w-6xl
        mx-auto
        mt-24
        "
      >

        <h2
          className="
          text-center
          text-4xl
          font-semibold
          mb-12
          "
        >
          What We Believe In
        </h2>



        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          "
        >

          {values.map(
            ({icon:Icon,title,desc},index)=>(

            <motion.div

              key={title}

              initial={{
                opacity:0,
                y:60,
              }}

              whileInView={{
                opacity:1,
                y:0,
              }}

              viewport={{
                once:false,
              }}

              transition={{
                delay:index*0.15,
                duration:0.6,
              }}

              whileHover={{
                y:-8,
              }}

              className="
              rounded-3xl
              bg-white/80
              backdrop-blur-xl
              border
              border-white
              p-6
              shadow-[0_20px_40px_rgba(244,114,182,0.1)]
              "

            >

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

                <Icon className="size-6"/>

              </div>


              <h3
                className="
                mt-5
                text-xl
                font-semibold
                "
              >
                {title}
              </h3>


              <p
                className="
                mt-3
                text-zinc-500
                leading-7
                "
              >
                {desc}
              </p>


            </motion.div>

          ))}

        </div>


      </section>


    </main>
  );
}