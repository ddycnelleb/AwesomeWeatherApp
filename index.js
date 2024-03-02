// 导入必要的模块和库
const express = require('express');
const axios = require('axios');

// 创建Express应用程序
const app = express();
const port = 3000;

// 设置路由处理程序
app.get('/weather/:location', async (req, res) => {
  try {
    const location = req.params.location;
    
    // 向天气API发送请求获取天气数据
    const weatherData = await getWeatherData(location);
    
    // 处理和转换天气数据
    const formattedData = formatWeatherData(weatherData);
    
    // 返回格式化后的天气数据
    res.json(formattedData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while fetching weather data.');
  }
});

// 获取天气数据的函数
async function getWeatherData(location) {
  const apiKey = 'YOUR_API_KEY'; // 替换为实际的天气API密钥
  const apiUrl = `https://api.weatherprovider.com/weather?location=${location}&apiKey=${apiKey}`;
  
  const response = await axios.get(apiUrl);
  return response.data;
}

// 格式化天气数据的函数
function formatWeatherData(weatherData) {
  // 根据天气数据的结构进行处理和转换
  // 这里只是一个示例，你可以根据实际的天气API响应进行定制
  
  const formattedData = {
    location: weatherData.location,
    currentTemperature: weatherData.current.temperature,
    forecast: weatherData.forecast.map(day => ({
      date: day.date,
      temperature: day.temperature,
      description: day.description
    }))
  };
  
  return formattedData;
}

// 启动应用程序
app.listen(port, () => {
  console.log(`Weather app listening at http://localhost:${port}`);
});
