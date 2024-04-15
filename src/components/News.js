import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const apikey = 'dbe57b028aeb41e285a226a94865f7a7';
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;

      setLoading(true);
      try {
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(parseData.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container my-3">
      <h2>NewsMonkey - Top Headline</h2>
      <div className="row">
        {articles.map((element) => (
          <div className="col-md-4" key={element.url}>
            <NewsItem
              title={element.title ? element.title : ''}
              description={element.description ? element.description : ''}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;