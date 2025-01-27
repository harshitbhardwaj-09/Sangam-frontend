import React, { useState, useEffect } from "react";


const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("Road, Water, Gas Departments ");


  useEffect(() => {
    fetchNews(searchQuery);
  }, []);


  const fetchNews = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&language=en&apiKey=55b3b3fef8c4400a87069470a1cd5dd2`
      );
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    fetchNews(searchQuery);
  };


  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 min-h-screen text-white p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
          Latest News: Interdepartmental Collaborations
        </h1>
        <div className="flex mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search news..."
            className="px-4 py-2 rounded-l-md bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 rounded-r-md text-white hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>


      {/* News Grid */}
      {loading ? (
        <div className="text-center text-gray-300">Loading news...</div>
      ) : articles.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <div
              key={index}
              className="group bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={
                  article.urlToImage ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  {article.description || "No description available."}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 mt-4 inline-block hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-300">No news found.</div>
      )}
    </div>
  );
};


export default News;