import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// post = http://127.0.0.1:8000/
const HomeScreen = () => {
  const [bookData, setbookData] = useState(null);
  const url = "http://127.0.0.1:8000/books";
  const getUrl = "http://127.0.0.1:8000";
  const [isShow, setisShow] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [price, setPrice] = useState(parseInt(0));
  const [ratings, setRatings] = useState(0);
  const [publication, setPublication] = useState("");
  const [genre, setGenre] = useState(false);
  const [sort, setSort] = useState(parseInt(3));
  const [search, setSearch] = useState("");
  const [finalSearchText, setfinalSearchText] = useState(null);
  const handleFloatingActionButtonClick = () => {
    setisShow(!isShow);
  };
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearChange = (date) => {
    setSelectedYear(date ? date.getFullYear() : null);
    // Perform any desired logic with the selected year
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission or API call to save the book details
    const data = {
      title,
      author,
      description,
      coverImage,
      price: parseInt(price),
      ratings: parseInt(ratings),
      publication,
      genre,
    };
    console.log(data);
    await axios
      .post(url, data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setisShow(!isShow);
    // Clear the form fields
    setTitle("");
    setAuthor("");
    setDescription("");
    setCoverImage("");
    setPrice("");
    setRatings("");
    setPublication("");
    axios
      .get(getUrl)
      .then((response) => setbookData(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000", {
        params: {
          ...(price != 0 ? { price: parseInt(price) } : { price: parseInt(0) }),
          ...(sort != 0 ? { sort: parseInt(sort) } : { sort: parseInt(0) }),
          ...(genre != false ? { genre: genre } : {}),
          ...(selectedYear != null ? { year: selectedYear } : {}),
          ...(finalSearchText != null ? { search: finalSearchText } : {}),
        },
      })
      .then((response) => {
        setbookData(response.data);
        // console.log(response.data);
        // console.log(bookData);
      })
      .catch((error) => console.log(error));
  }, [price, sort, genre, selectedYear, finalSearchText]);
  const handleSearch = (e) => {
    e.preventDefault();
    setfinalSearchText(search);
  };

  return (
    <div className="relative">
      {/* PopUp on Floating Action Bar Click */}
      {isShow && (
        <div className="fixed scrollbar-addbook-popup top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center overflow-auto z-50">
          <div className="max-w-md bg-white p-6 rounded shadow-lg">
            <h1 className="text-2xl font-bold mt-16 mb-4">Add New Book</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-1">
                  Title
                </label>
                <input
                  required
                  placeholder="Please add a Title"
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
                  required
                  placeholder="Author Name"
                  type="text"
                  id="author"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block font-semibold mb-1"
                >
                  Description
                </label>
                <textarea
                  required
                  id="description"
                  placeholder="Book Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="coverImage"
                  className="block font-semibold mb-1"
                >
                  Cover Image
                </label>
                <input
                  required
                  placeholder="Image URL Only"
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
                  required
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
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ratings}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= 1 && value <= 5) {
                      setRatings(value);
                    }
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="publication"
                  className="block font-semibold mb-1"
                >
                  Publication
                </label>
                <input
                  required
                  placeholder="DD/MM/YYYY"
                  type="text"
                  id="publication"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={publication}
                  onChange={(e) => setPublication(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="publication"
                  className="block font-semibold mb-1"
                >
                  Genre
                </label>
                <input
                  placeholder="Which Genre"
                  type="text"
                  required
                  id="publication"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
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
        </div>
      )}
      {/* Floating Action Bar */}
      <div className="fixed bottom-10 z-50 right-10">
        <button
          onClick={handleFloatingActionButtonClick}
          className="text-white bg-cyan-700 rounded-full p-3 text-xl shadow-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
      <form className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search title, author...."
          className="w-3/4 my-5 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={finalSearchText == null ? "" : finalSearchText}
          onChange={(e) => {
            // setSearch(e.target.value);
            // // setfinalSearchText(e.target.value)
            setfinalSearchText(e.target.value);
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
      {/* Filtering options */}
      <div className="flex flex-col lg:flex-row justify-center items-center space-x-4 my-4">
        {/* Genre Filter */}
        <div className="flex items-center">
          <label htmlFor="genre" className="text-gray-600 mr-2">
            Genre:
          </label>
          <select
            id="genre"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={false}>All</option>
            <option value="fiction">Fiction</option>
            <option value="nonfiction">Non-Fiction</option>
            {/* Add more genre options */}
          </select>
        </div>
        {/* Price Range Filter */}
        <div className="flex items-center">
          <label htmlFor="price" className="text-gray-600 mr-2">
            Price:
          </label>
          <select
            id="price"
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>N/A</option>
            <option value={1}>Ascending</option>
            <option value={-1}>Descending</option>
            {/* Add more genre options */}
          </select>
        </div>
        {/* Date Published FIlter */}
        <div className="flex items-center">
          <label htmlFor="date" className="text-gray-600 mr-2">
            Date Published:
          </label>
          <DatePicker
            id="date"
            className="px-2 py-1 z-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleYearChange}
            dateFormat="yyyy"
            showYearPicker
            isClearable
            placeholderText={
              selectedYear == null ? "Select Year" : selectedYear
            }
          />
          <button onClick={() => setSelectedYear(null)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>
        </div>
        {/* SORTING FILTER */}
        <div className="flex items-center">
          <label htmlFor="sort" className="text-gray-600 mr-2">
            Sort By:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => {
              setSort(parseInt(e.target.value));
            }}
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={3}>Relevance</option>
            <option value={1}>Popularity</option>

            <option value={2}>Newest First</option>
            {/* Add more genre options */}
          </select>
        </div>

        {/* Add more filtering options here */}
      </div>
      {/* Books Feed */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 p-6">
        {bookData &&
          bookData.map((book) => (
            <BookCard
              key={book.id}
              title={book.title ?? "No Title"}
              author={book.author ?? "No Author"}
              description={book.description ?? "No Description"}
              coverImage={
                book.coverImage ??
                "https://images.unsplash.com/photo-1688488994043-ffb1a6c211f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
              }
              price={book.price ?? 0}
              ratings={book.ratings ?? 0}
              publication={book.publication ?? "Date Not Specified"}
            />
          ))}
      </div>
    </div>
  );
};

export default HomeScreen;
