


export const handleFetch = async () => {
    try {
      const response = await axios.get("https://server-sijans-projects-f3bcab8f.vercel.app/allproducts");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false); // Ensure loading is turned off after API call completes (success or fail)
    }
  };
