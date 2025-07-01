"use client";

import { getHealthAdvisory } from "../../../aqi-backend/utils/getHealthAdvisory";

type Props = {
  aqi: number;
  healthCondition?: string;
};

export default function HealthAdvisoryCard({ aqi, healthCondition }: Props) {
  const advisory = getHealthAdvisory(aqi, healthCondition || "");

  const colorMap: Record<string, string> = {
    green: "bg-green-100 border-green-500",
    lime: "bg-lime-100 border-lime-500",
    yellow: "bg-yellow-100 border-yellow-500",
    orange: "bg-orange-100 border-orange-500",
    red: "bg-red-100 border-red-500",
    maroon: "bg-rose-100 border-rose-500",
  };

  const style = colorMap[advisory.color] || "bg-gray-100 border-gray-400";

  return (
    <div
      className={`w-full max-w-xl mx-auto mt-6 border-l-8 rounded-xl shadow-md p-4 ${style}`}
    >
      <h2 className="text-2xl font-bold mb-1">
        {advisory.category} Air Quality ({aqi})
      </h2>
      <p className="text-gray-800 text-base">{advisory.message}</p>

      {advisory.warning && (
        <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-red-800 font-medium text-sm">
            ⚠️ {advisory.warning}
          </p>
        </div>
      )}
    </div>
  );
}
