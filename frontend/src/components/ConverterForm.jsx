import axios from "axios";
import React, {  useState } from "react";
import { RiTelegram2Fill } from "react-icons/ri";
import Cookies from "js-cookie";
import { useUrlHistory } from "../hooks/useUrlHistory";

const ConverterForm = () => {
  const [LongUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const {addUrl} = useUrlHistory();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/shorten", {
        originalUrl: LongUrl,
      });

     addUrl(LongUrl,response.data.shortUrl);
      setShortUrl(response.data.shortUrl);
      setLongUrl("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="m-5 shadow shadow-olive-500 rounded-xl p-2">
      <form className="flex flex-col p-5 gap-3" onSubmit={handleFormSubmit}>
        <label className="text-xl font-semibold flex items-center gap-1">
          <RiTelegram2Fill />
          Long URL
          <span className="text-red-600">*</span>
        </label>
        <input
          className="border text-md p-2 rounded-md"
          required
          type="text"
          value={LongUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        {shortUrl && (
          <input
            className="border text-md p-2 rounded-md"
            type="text"
            value={shortUrl}
            readOnly
          />
        )}

        <button
          type="submit"
          disabled={loading || !LongUrl}
          className="border border-amber-200 text-xl bg-green-500 p-2 text-white rounded-md hover:bg-blue-400 cursor-pointer"
        >
          {loading ? "Shortening..." : "Shorten Link"}
        </button>
      </form>
      <p className="text-xs text-center text-gray-500">
        By Clicking Shorten Link you agree with our Use of Cookies
      </p>
    </div>
  );
};

export default ConverterForm;
