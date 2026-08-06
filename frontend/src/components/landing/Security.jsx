import {
  ShieldCheck,
  LockKeyhole,
  EyeOff,
  Database,
  CheckCircle,
} from "lucide-react";

import { motion } from "framer-motion";


const securityPoints = [
{
  icon: EyeOff,
  title: "Secure Password Handling",
  desc: "Password analysis is designed with security-focused practices to protect your information.",
},
  {
    icon: Database,
    title: "Minimal Data Collection",
    desc: "Only required information is processed for better security.",
  },
  {
    icon: LockKeyhole,
    title: "Secure Processing",
    desc: "Security-focused practices protect your information.",
  },
];


export default function Security() {


  return (

    <section
      id="security"
      className="
      px-6
      py-28
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
            px-4
            py-2
            rounded-full
            bg-rose-100
            text-[#ff2056]
            text-sm
            font-medium
            "
          >

            <ShieldCheck className="size-4"/>

            Security Architecture

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

            Built for privacy and protection

          </h2>



          <p
            className="
            mt-4
            text-lg
            leading-8
            text-zinc-500
            "
          >

            PassGuidance focuses on improving
            password security while keeping your
            sensitive information private.

          </p>


        </motion.div>







        {/* Main Security Dashboard */}


        <div
          className="
          mt-20
          grid
          md:grid-cols-2
          gap-12
          items-center
          "
        >





          {/* Security Scanner */}


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
              amount:0.3,
            }}

            transition={{
              duration:0.7,
            }}

            className="
            relative
            overflow-hidden
            rounded-[40px]
            bg-white/80
            backdrop-blur-xl
            border
            border-zinc-200
            shadow-[0_20px_60px_rgba(244,114,182,0.12)]
            p-10
            "
          >



            {/* Scanner Animation */}

            <motion.div

              animate={{
                y:[
                  -120,
                  260,
                ],
              }}

              transition={{
                duration:3,
                repeat:Infinity,
                ease:"linear",
              }}

              className="
              absolute
              left-0
              right-0
              h-1
              bg-gradient-to-r
              from-transparent
              via-pink-500
              to-transparent
              opacity-60
              "

            />






            <div
              className="
              flex
              justify-center
              "
            >


              <motion.div

                animate={{
                  scale:[
                    1,
                    1.08,
                    1,
                  ],
                }}

                transition={{
                  duration:3,
                  repeat:Infinity,
                }}

                className="
                size-32
                rounded-full
                bg-gradient-to-br
                from-orange-400
                to-pink-500
                flex
                items-center
                justify-center
                shadow-[0_0_80px_rgba(244,114,182,0.5)]
                "
              >

                <ShieldCheck
                  className="
                  size-16
                  text-white
                  "
                />

              </motion.div>


            </div>







            <div
              className="
              text-center
              mt-8
              "
            >

              <h3
                className="
                text-5xl
                font-bold
                text-zinc-950
                "
              >

                98%

              </h3>


              <p
                className="
                mt-2
                text-zinc-500
                "
              >

                Security Confidence Score

              </p>


            </div>






            {/* Progress */}

            <div
              className="
              mt-8
              h-3
              rounded-full
              bg-rose-100
              overflow-hidden
              "
            >

              <motion.div

                initial={{
                  width:0,
                }}

                whileInView={{
                  width:"98%",
                }}

                viewport={{
                  once:false,
                }}

                transition={{
                  duration:1.5,
                }}

                className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-orange-400
                to-pink-500
                "

              />


            </div>




            <div
              className="
              mt-8
              space-y-4
              "
            >

              {
                [
                  "Privacy Protected",
                  "Threat Analysis",
                  "Secure Processing",
                ].map(item=>(

                  <div
                    key={item}
                    className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    text-zinc-600
                    "
                  >

                    <CheckCircle
                      className="
                      size-5
                      text-[#ff2056]
                      "
                    />

                    {item}

                  </div>

                ))
              }


            </div>


          </motion.div>









          {/* Security Principles */}


          <div
            className="
            space-y-6
            "
          >

            {
              securityPoints.map(
                (item,index)=>{

                  const Icon=item.icon;


                  return (

                    <motion.div

                      key={item.title}

                      initial={{
                        opacity:0,
                        x:50,
                      }}

                      whileInView={{
                        opacity:1,
                        x:0,
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
                        x:10,
                      }}

                      className="
                      rounded-3xl
                      bg-white
                      border
                      border-zinc-200
                      p-6
                      shadow-[0_15px_40px_rgba(244,114,182,0.08)]
                      "
                    >

                      <div
                        className="
                        size-12
                        rounded-2xl
                        bg-rose-100
                        text-[#ff2056]
                        flex
                        items-center
                        justify-center
                        "
                      >

                        <Icon className="size-6"/>

                      </div>



                      <h3
                        className="
                        mt-4
                        text-xl
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

                }
              )
            }


          </div>



        </div>


      </div>


    </section>

  );

}