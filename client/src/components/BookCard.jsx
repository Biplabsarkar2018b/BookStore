import React from "react";

const BookCard = ({
  title,
  author,
  description,
  coverImage,
  price,
  ratings,
  publication,
}) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-5">
      <div className="aspect-w-2 aspect-h-3">
        <img
          src={coverImage}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 text-sm mb-4">By {author}</p>
        <p className="text-gray-600 text-base mb-4">{description}</p>
        <p className="text-gray-600 text-base mb-4">{publication}</p>
        <div className="flex items-center justify-between">
          <p className="text-gray-800 font-bold text-lg">${price}</p>
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={index < ratings ? 'yellow' : 'gray'}
                  viewBox="0 0 20 20"
                  strokeWidth={1.5}
                  // stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
