'use client';
import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid'
import axiosInstance from '@/libs/axiosConfig';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];

const movieGenres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Musical",
    "Mystery",
    "Romance",
    "Science Fiction (Sci-Fi)",
    "Sports",
    "Thriller",
    "War",
    "Western"
];

interface BookInfoProps {
    title: string,
    description: string,
    author: string,
}

const Page = () => {
    const [genres, setGenres] = useState([]);
    const session = useSession();
    const router = useRouter();
    if (session.status == 'unauthenticated') {
        router.push("/login");
    }
    const [genreInput, setGenreInput] = useState('');
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [bookInfo, setBookInfo] = useState<BookInfoProps>({
        title: "",
        description: "",
        author: "",
    });
    const handleFileChange = (e: React.ChangeEvent) => {
        const file: File = e.target.files[0];
        if (!file) return;
        if (!supportedTypes.includes(file.type)) {
            alert("Type Not Supported");
            return;
        }
        if (file.size > 1 * 1024 * 1024) {
            alert("Size is Too Big");
            return;
        }
        setFile(file);
    }

    const handleInputChange = (e: any) => {
        const input = e.target.value;
        setGenreInput(input);

        if (input.trim() === '') {
            setSuggestions([]);
            return;
        }

        const filteredSuggestions = movieGenres.filter(genre =>
            genre.toLowerCase().includes(input.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleAddGenre = () => {
        const trimmedInput = genreInput.trim();
        if (trimmedInput === '') {
            setError('Genre cannot be empty.');
            return;
        }

        if (!movieGenres.includes(trimmedInput)) {
            setError('Invalid genre. Please select from the list.');
            return;
        }

        if (genres.includes(trimmedInput)) {
            setError('Genre already added.');
            return;
        }

        setGenres([...genres, trimmedInput]);
        setGenreInput('');
        setSuggestions([]);
        setError('');
    };

    const handleDeleteGenre = (genreToDelete) => {
        setGenres(genres.filter(genre => genre !== genreToDelete));
    };

    const handleSuggestionClick = (suggestion) => {
        setGenreInput(suggestion);
        setSuggestions([]);
    };
    const handleChange = (e: React.ChangeEvent) => {
        setBookInfo((pre) => {
            const { name, value } = e.target;
            return { ...pre, [name]: value };
        })
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = session.data?.user?.id;
        if (!id) {
            setError("User Not Logged In");
            return;
        }
        if (!file) {
            setError("Cover Photo required");
            return
        }
        if (!bookInfo.title) {
            setError("Title is required");
            return
        }
        if (!bookInfo.author) {
            setError("author is required")
            return
        }
        if (!bookInfo.description) {
            setError("description is required");
            return
        }
        if (!genres) {
            setError("Generes is required");
            return
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", bookInfo.title);
        formData.append("description", bookInfo.description);
        formData.append("author", bookInfo.author);
        formData.append("genre", genres);
        formData.append("userId", id);
        try {
            setLoading(true);
            const res = await axiosInstance.post('/api/v1/books/addnewbook', formData, { headers: "multipart/form-data" });
            console.log(res);
            if (res.data.succes) {
                setBookInfo({
                    title: "",
                    description: "",
                    author: "",
                });
                setFile(null);
                setGenreInput("");
                alert("Book Added Succesful");
                router.push("/update")
            }
            setLoading(false);
        } catch (error) {
            console.error("error");
        }
    }
    return (
        <form onSubmit={handleSubmit} className='md:px-20 px-5'>
            <label htmlFor="cover-photo" className="text-base font-semibold leading-7 text-gray-900">
                Cover photo <span className='text-red-500'>*</span>
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <span>Upload a file</span>
                            <input id="file-upload" onChange={handleFileChange} name="file" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 1MB</p>
                </div>

            </div>
            {file && <p className='text-green-500'>Uploaded {file.name}</p>}
            <label htmlFor="title" className="text-base font-semibold leading-7 text-gray-900">
                Title <span className='text-red-500'>*</span>
            </label>
            <input
                value={bookInfo.title}
                onChange={handleChange}
                id="title"
                name="title"
                type="text"
                autoComplete="given-name"
                className="b Aboutlock w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label htmlFor="author" className="text-base font-semibold leading-7 text-gray-900">
                Author <span className='text-red-500'>*</span>
            </label>
            <input
                value={bookInfo.author}
                onChange={handleChange}
                id="author"
                name="author"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="">
                <label htmlFor="about" className="text-base font-semibold leading-7 text-gray-900">
                    Description <span className='text-red-500'>*</span>
                </label>.
                <div className="mt-2">
                    <textarea
                        value={bookInfo.description}
                        onChange={handleChange}
                        id="about"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                    />
                </div>

            </div>
            <div className=" my-3 w-full mx-auto">
                <label htmlFor="cover-photo" className="text-base font-semibold leading-7 text-gray-900">
                    Gener <span className='text-red-500'>*</span>
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={genreInput}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Add Genre"
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    type='button'
                    onClick={handleAddGenre}
                    className="bg-blue-500 text-white p-2 mt-2 rounded-md hover:bg-blue-600"
                >
                    Add Genre
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="flex flex-wrap gap-2 mt-4">
                    {genres.map((genre, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center"
                        >
                            {genre}
                            <button
                                onClick={() => handleDeleteGenre(genre)}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <button className='h-10 items-center w-max flex gap-2  px-2 py-1 bg-black text-white'>
                {loading && <Loader2 className='h-5 w-5 animate-spin' />}
                Add Book</button>
        </form>
    )
}

export default Page
