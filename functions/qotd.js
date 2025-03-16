exports.handler = async (event, context) => {
    try {
      const response = await fetch('https://favqs.com/api/qotd', {
        headers: {
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error fetching data' })
      };
    }
  };