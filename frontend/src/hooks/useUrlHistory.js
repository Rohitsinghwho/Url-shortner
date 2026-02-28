import { useEffect, useState } from "react"
import Cookies from "js-cookie";
export const useUrlHistory = () => {
  const [history,setHistory]=useState([]);

   useEffect(() => {
    const data = Cookies.get('urlHistory');
    if (data) setHistory(JSON.parse(data));
  }, []);

  // Add new URL pair
  const addUrl = (longUrl, shortUrl) => {
    const newItem = {
      id: Date.now(),
      longUrl,
      shortUrl,
      createdAt: new Date().toISOString()
    };
    
    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    Cookies.set('urlHistory', JSON.stringify(newHistory), { expires: 30 });
  };

  return { history, addUrl };
}

