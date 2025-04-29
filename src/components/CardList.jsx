import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data = [] }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));

  const handlePagination = (direction) => {
    setOffset((prev) =>
      Math.max(0, prev + (direction === 'next' ? limit : -limit))
    );
  };

  const filterTags = (tagQuery) => {
    const filtered = data.filter((p) =>
      tagQuery ? p.tags.some(({ title }) => title === tagQuery) : true
    );
    setOffset(0);
    setProducts(filtered.slice(0, limit));
  };

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, data]);

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2 flex flex-wrap">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePagination('previous')}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => handlePagination('next')}
          disabled={offset + limit >= data.length}
        />
      </div>
    </div>
  );
};

export default CardList;
