import {
  ShieldCheck,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";


const productLinks = [
  {
    name: "Features",
    link: "#features",
  },
  {
    name: "Security",
    link: "#security",
  },
  {
    name: "FAQ",
    link: "#faq",
  },
];


const connectLinks = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/abhay-singh-btech",
    icon: FaLinkedin,
  },
  {
    name: "Email",
    link: "mailto:abhaysingh14922@gmail.com",
    icon: Mail,
  },
];


export default function Footer() {
  return (
    <footer className="px-6 pb-8 pt-12">

      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
        }}
        className="
        max-w-6xl
        mx-auto
        rounded-[36px]
        bg-white/70
        backdrop-blur-xl
        border
        border-white
        shadow-[0_20px_60px_rgba(244,114,182,0.15)]
        p-10
        "
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">


          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                size-12
                rounded-2xl
                bg-gradient-to-br
                from-orange-400
                to-pink-500
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                "
              >
                <ShieldCheck className="size-6" />
              </div>


              <h2 className="text-xl font-bold text-zinc-950">
                PassGuidance
              </h2>

            </div>


            <p
              className="
              mt-5
              max-w-sm
              text-sm
              leading-6
              text-zinc-500
              "
            >
              Smart password security tools designed to
              protect your digital identity and improve
              online safety.
            </p>

          </div>



          {/* Product */}

          <div>

            <h3 className="font-semibold text-zinc-950 mb-5">
              Product
            </h3>


            <ul className="space-y-3">

              {productLinks.map((item) => (

                <li key={item.name}>

                  <a
                    href={item.link}
                    className="
                    text-sm
                    text-zinc-500
                    hover:text-pink-500
                    transition
                    "
                  >
                    {item.name}
                  </a>

                </li>

              ))}

            </ul>

          </div>



          {/* Connect */}

          <div>

            <h3 className="font-semibold text-zinc-950 mb-5">
              Connect
            </h3>


            <div className="space-y-3">

              {connectLinks.map(
                ({
                  name,
                  link,
                  icon: Icon,
                }) => (

                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-rose-50
                  px-4
                  py-3
                  text-sm
                  text-zinc-600
                  hover:bg-rose-100
                  transition
                  "
                >

                  <div className="flex items-center gap-3">

                    <Icon
                      className="
                      size-5
                      text-[#ff2056]
                      "
                    />

                    {name}

                  </div>


                  <ArrowUpRight
                    className="
                    size-4
                    opacity-0
                    group-hover:opacity-100
                    transition
                    "
                  />

                </a>

              ))}

            </div>

          </div>


        </div>



        {/* Bottom */}

        <div
          className="
          mt-10
          pt-6
          border-t
          border-zinc-200
          flex
          flex-col
          md:flex-row
          justify-between
          gap-3
          text-sm
          text-zinc-500
          "
        >

          <span>
            © {new Date().getFullYear()} PassGuidance. All rights reserved.
          </span>


          <span>
            Built with security in mind 🔒
          </span>


        </div>


      </motion.div>

    </footer>
  );
}