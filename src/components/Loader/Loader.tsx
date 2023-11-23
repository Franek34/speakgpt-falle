import { Variants, motion } from "framer-motion"

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
} as Variants

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="w-6 h-36 bg-white" />
      <motion.div variants={variants} className="w-6 h-36 bg-white" />
      <motion.div variants={variants} className="w-6 h-36 bg-white" />
      <motion.div variants={variants} className="w-6 h-36 bg-white" />
      <motion.div variants={variants} className="w-6 h-36 bg-white" />
    </motion.div>
  )
}
const Loader = () => {
  return (
    <div className="fixed z-50 w-full h-screen px-4 py-24 bg-[#40414f]">
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <BarLoader />
      </div>
    </div>
  )
}

export default Loader
