import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">{product.description}</Typography>
        <Typography variant="body1">${product.price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">View Details</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
