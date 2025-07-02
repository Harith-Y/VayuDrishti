"use client";

import { getHealthAdvisory } from "../../../aqi-backend/utils/getHealthAdvisory";
import { motion } from "framer-motion";

type Props = {
  aqi: number;
  healthCondition?: string;
};

export default function HealthAdvisoryCard({ aqi, healthCondition }: Props) {
  const advisory = getHealthAdvisory(aqi, healthCondition || "");

  const colorMap: Record<string, string> = {
    green: "bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-400",
    lime: "bg-lime-100 border-lime-500 dark:bg-lime-900 dark:border-lime-400",
    yellow: "bg-yellow-100 border-yellow-500 dark:bg-yellow-900 dark:border-yellow-400",
    orange: "bg-orange-100 border-orange-500 dark:bg-orange-900 dark:border-orange-400",
    red: "bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-400",
    maroon: "bg-rose-100 border-rose-500 dark:bg-rose-900 dark:border-rose-400",
  };

  const style = colorMap[advisory.color] || "bg-gray-100 border-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-xl mx-auto mt-6 border-l-8 rounded-xl shadow-md p-4 ${style}`}
    >
      <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
        {advisory.category} Air Quality ({aqi})
      </h2>
      <p className="text-gray-800 dark:text-gray-200 text-base">{advisory.message}</p>

      {advisory.warning && (
        <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg dark:bg-red-900 dark:border-red-400">
          <p className="text-red-800 dark:text-red-200 font-medium text-sm">
            ⚠️ {advisory.warning}
          </p>
        </div>
      )}
    </motion.div>
  );
}
