import React from "react";
import { motion } from "framer-motion";
import styles from "@/styles/Skeleton.module.scss";

const Shimmer = () => {
    return (
        <motion.div
            initial={{ x: -600 }}
            animate={{ x: 1000 }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5
            }}
            className={styles.shimmer}
        ></motion.div>
    );
};

export default Shimmer;