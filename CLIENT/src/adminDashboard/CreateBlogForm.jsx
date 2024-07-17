import React, { useState } from 'react';

const CreateBlogForm = () => {
  const [blogs, setBlogs] = useState([{ title: '', content: '', titleImage: null }]);
  const [mainImage, setMainImage] = useState(null);

  const handleAddBlog = () => {
    setBlogs([...blogs, { title: '', content: '', titleImage: null }]);
  };

  const handleTitleChange = (index, value) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index].title = value;
    setBlogs(updatedBlogs);
  };

  const handleContentChange = (index, value) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index].content = value;
    setBlogs(updatedBlogs);
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedBlogs = [...blogs];
        updatedBlogs[index].titleImage = reader.result;
        setBlogs(updatedBlogs);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your logic to handle submission of all blogs and the main image
    console.log('Main Image:', mainImage);
    console.log('Blogs:', blogs);

    // Reset the form
    setMainImage(null);
    setBlogs([{ title: '', content: '', titleImage: null }]);
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mainImage">
            Main Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="mainImage"
            onChange={handleMainImageChange}
            className="mt-2"
          />
          {mainImage && (
            <div className="mt-2">
              <img src={mainImage} alt="Main Blog" className="rounded-lg shadow-md max-w-sm" />
            </div>
          )}
        </div>
        {blogs.map((blog, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`title-${index}`}>
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`title-${index}`}
              type="text"
              placeholder="Enter the title"
              value={blog.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              required
            />
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor={`content-${index}`}>
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`content-${index}`}
              placeholder="Enter the content"
              value={blog.content}
              onChange={(e) => handleContentChange(index, e.target.value)}
              required
            ></textarea>
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor={`titleImage-${index}`}>
              Title Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              id={`titleImage-${index}`}
              onChange={(e) => handleTitleImageChange(index, e)}
              className="mt-2"
            />
            {blog.titleImage && (
              <div className="mt-2">
                <img src={blog.titleImage} alt="Title Blog" className="rounded-lg shadow-md max-w-sm" />
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddBlog}
          >
            Add Blog
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Blogs
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
