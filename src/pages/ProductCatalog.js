import React, { useState } from 'react';
import { Typography, Container, Grid, Box } from '@mui/material';
import { getApiUrl } from '../config'; 

import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useState({
    search: '',
    category: '',
    tags: [],  
  });
  const [products, setProducts] = useState([]);
  
  const categories = ['Electronics', 'Clothing', 'Home', 'Toys'];
  const tags = ['New', 'Popular', 'Sale', 'Limited'];

  const handleSearchChange = (field, value) => {
    if (field === 'tags') {
      value = Array.isArray(value) ? value : [value];
    }
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault(); 
    const queryParams = new URLSearchParams();
    if (searchParams.search) queryParams.append('name', searchParams.search);
    if (searchParams.category) queryParams.append('category', searchParams.category);
    if (searchParams.tags.length > 0) searchParams.tags.forEach(tag => queryParams.append('tags', tag));

    const apiUrl = `${getApiUrl()}/products/api/products/?${queryParams.toString()}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setProducts(data); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  
  return (
    <Container>
      <Typography variant="h3" align="center" sx={{ my: 4 }}>
        Product Catalog
      </Typography>
      
      <SearchBar
        categories={categories}
        tags={tags}
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />
      
      <Grid container spacing={3} justifyContent="center">
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductCatalog;
