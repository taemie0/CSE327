// Simulating some weather alerts
export const mockWeatherAlerts = [
  {
    headline: 'Severe Thunderstorm Warning',
    event: 'Thunderstorm',
    description: 'A severe thunderstorm warning is in effect for your area.',
    effective: '12345', // This can be an arbitrary identifier for the alert
    severity: 'Severe',
    urgency: 'Immediate',
  },
  {
    headline: 'Flood Watch',
    event: 'Flood',
    description: 'Flooding is possible in your area. Stay alert for further updates.',
    effective: '67890',
    severity: 'Moderate',
    urgency: 'Future',
  },
  {
    headline: 'High Wind Advisory',
    event: 'High Winds',
    description: 'Strong winds are expected in your area. Take necessary precautions.',
    effective: '54321',
    severity: 'Moderate',
    urgency: 'Expected',
  },
];
