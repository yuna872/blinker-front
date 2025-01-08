export const fetchSensors = async (token) => {
    const response = await fetch('http://localhost:8080/api/sensors', {
      headers: { Authorization: token },
    });
    return response.json();
  };
  
  export const fetchSensorDetails = async (token) => {
    const response = await fetch('http://localhost:8080/api/sensors/detail', {
      headers: { Authorization: token },
    });
    return response.json();
  };