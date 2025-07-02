/**
 * Returns a health advisory based on AQI and an optional health condition (e.g., asthma).
 */
function getHealthAdvisory(aqi, healthCondition) {
  const sensitiveMessage = healthCondition
    ? ` People with ${healthCondition} should take extra precautions.`
    : "";

  if (aqi <= 50) {
    return {
      category: "Good",
      message: "Air quality is ideal with minimal risk.",
      color: "green",
    };
  }

  if (aqi <= 100) {
    return {
      category: "Moderate",
      message: "Air quality is acceptable." + sensitiveMessage,
      color: "lime",
    };
  }

  if (aqi <= 150) {
    return {
      category: "Unhealthy for Sensitive Groups",
      message:
        "Air quality may affect sensitive individuals." + sensitiveMessage,
      warning: `Avoid prolonged outdoor exertion${healthCondition ? ` if you have ${healthCondition}` : ""}.`,
      color: "yellow",
    };
  }

  if (aqi <= 200) {
    return {
      category: "Unhealthy",
      message:
        "Everyone may begin to experience health effects." + sensitiveMessage,
      warning: `Limit outdoor exposure${healthCondition ? ` if you suffer from ${healthCondition}` : ""}.`,
      color: "orange",
    };
  }

  if (aqi <= 300) {
    return {
      category: "Very Unhealthy",
      message: "Serious health effects possible for everyone." + sensitiveMessage,
      warning: `Avoid going outside unless absolutely necessary.`,
      color: "red",
    };
  }

  return {
    category: "Hazardous",
    message: "Emergency conditions: Everyone is more likely to be affected.",
    warning: "Remain indoors. Avoid all outdoor activity.",
    color: "maroon",
  };
}

module.exports = { getHealthAdvisory }; 