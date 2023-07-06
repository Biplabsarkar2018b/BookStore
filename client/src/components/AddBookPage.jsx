import React, { useState } from "react";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [price, setPrice] = useState("");
  const [ratings, setRatings] = useState("");
  const [publication, setPublication] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or API call to save the book details
    // Clear the form fields
    setTitle("");
    setAuthor("");
    setDescription("");
    setCoverImage("");
    setPrice("");
    setRatings("");
    setPublication("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block font-semibold mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="coverImage" className="block font-semibold mb-1">
            Cover Image
          </label>
          <input
            type="text"
            id="coverImage"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-semibold mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ratings" className="block font-semibold mb-1">
            Ratings
          </label>
          <input
            type="number"
            id="ratings"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={ratings}
            onChange={(e) => setRatings(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publication" className="block font-semibold mb-1">
            Publication
          </label>
          <input
            type="text"
            id="publication"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={publication}
            onChange={(e) => setPublication(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
