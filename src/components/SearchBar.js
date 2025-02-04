import React, { useState, useEffect } from 'react';
import { Grid2, TextField, MenuItem, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ searchParams, onSearchChange, onSubmit }) => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedCat, setSelectedCat] = useState(searchParams.category || "");
    const [selectedTag, setSelectedTag] = useState(searchParams.tags || "");

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('http://127.0.0.1:8000/products/api/categories/');
            const data = await response.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            const response = await fetch('http://127.0.0.1:8000/products/api/tags/');
            const data = await response.json();
            setTags(data);
        };
        fetchTags();
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCat(e.target.value);
        onSearchChange('category', e.target.value);
    };

    const handleTagChange = (e) => {
        setSelectedTag(e.target.value);
        onSearchChange('tags', e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    const handleClear = () => {
        setSelectedCat("");
        setSelectedTag("");
        onSearchChange('category', "");
        onSearchChange('tags', []);
        onSearchChange('search', "");
    };

    return (
        <Grid2 container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Grid2 item xs={3}>
                <TextField
                    label="Search by Description"
                    style={{ minWidth: 200 }}
                    value={searchParams.search || ""}
                    onChange={(e) => onSearchChange('search', e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </Grid2>

            <Grid2 item xs={3}>
                <TextField
                    label="Category"
                    select
                    style={{ minWidth: 200 }}
                    value={selectedCat}
                    onChange={handleCategoryChange}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
                {selectedCat && (
                    <ClearIcon onClick={() => { setSelectedCat(""); onSearchChange('category', ""); }} />
                )}
            </Grid2>

            <Grid2 item xs={3}>
                <TextField
                    label="Tags"
                    select
                    style={{ minWidth: 200 }}
                    value={selectedTag}
                    onChange={handleTagChange}
                >
                    {tags.map((tag) => (
                        <MenuItem key={tag.id} value={tag.name}>
                            {tag.name}
                        </MenuItem>
                    ))}
                </TextField>
                {selectedTag && (
                    <ClearIcon onClick={() => { setSelectedTag(""); onSearchChange('tags', []); }} />
                )}
            </Grid2>

            <Grid2 item xs={1}>
                <Button variant="contained" style={{ minWidth: 200, minHeight: 55 }} onClick={onSubmit}>
                    Search
                </Button>
            </Grid2>

            <Grid2 item xs={1}>
                {selectedTag||selectedCat && (
                    <Button variant="outlined" style={{ minWidth: 200, minHeight: 55 }} onClick={handleClear}>
                        Clear
                    </Button>)}

            </Grid2>
        </Grid2>
    );
};

export default SearchBar;
