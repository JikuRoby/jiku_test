import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

function sendToAnalytics({ name, delta, value, id }) {
  // You can implement your own custom logic here
  // For example, you might send the data to a custom logging service or perform some other action
  console.log(`Web Vitals: ${name} - Delta: ${delta} - Value: ${value} - ID: ${id}`);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
getFCP(sendToAnalytics);
getTTFB(sendToAnalytics);

export default function reportWebVitals(onPerfEntry) {
  // ...
  // Your existing code for performance reporting
  // ...
}
