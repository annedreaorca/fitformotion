"use client";

import KebabMenu from "@/components/KebabMenu/KebabMenu";
import PageHeading from "@/components/PageHeading/PageHeading";
import { IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

// Mock data for demo purposes
const mockImages = [
  {
    id: "1",
    imageUrl: "https://media.istockphoto.com/id/1369897943/photo/focus-on-disc-close-up-shot-hands-adding-weight-to-barbell-rod-at-gym-concept-of-fitness.jpg?s=612x612&w=0&k=20&c=H0fxQoJGyMv9npWuD42R6xiG8JUpqZNPbp4dLWh7B7k=",
    uploadedAt: "2025-04-15T10:30:00.000Z",
    currentWeight: 75
  },
  {
    id: "2",
    imageUrl: "https://media.istockphoto.com/id/1338368546/photo/a-man-adds-a-rubberized-plate-on-a-smith-machine-for-a-workout-or-assisting-a-client-at-the.jpg?s=612x612&w=0&k=20&c=514OyCALh22Xmgpl5DQZaxmqyvmIVHcUcvKAddoJtKQ=",
    uploadedAt: "2025-04-10T08:20:00.000Z",
    currentWeight: 76
  },
  {
    id: "3",
    imageUrl: "https://media.istockphoto.com/id/1012048876/photo/improvement-and-getting-stronger-in-fitness-exercise-and-muscle-training-concept-man-adding.jpg?s=612x612&w=0&k=20&c=Z8E1oTcXK-lJKBtohFJa5TmnI1aFYa1rflOQf4bRn3Y=",
    uploadedAt: "2025-04-05T15:45:00.000Z",
    currentWeight: 77
  }
];

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo, default to logged in

  useEffect(() => {
    // Simulate API call with mock data
    const fetchUserImages = async () => {
      try {
        // Simulate network delay
        setTimeout(() => {
          setImages(mockImages);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch images:", error);
        setError("Failed to load images");
        setLoading(false);
      }
    };

    fetchUserImages();
  }, []);

  const handleDelete = async (imageId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      // Simulate API call
      // In a real app, you would call your API here
      
      // Update state to remove the deleted image
      setImages((prevImages) => prevImages.filter((image) => image.id !== imageId));
    } catch (error) {
      console.error("Failed to delete image:", error);
      alert("An error occurred while deleting the image.");
    }
  };

  // Toggle login status for demo purposes
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  if (!isLoggedIn) {
    return (
      <div className="page-container">
        <div>Please log in to view your images</div>
        <button 
          onClick={toggleLogin} 
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Demo Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (images.length === 0) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <PageHeading title="My Physique" />
        </div>
        <p>Please complete a workout to upload a picture of your progress.</p>
        <button 
          onClick={() => setImages(mockImages)} 
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Load Demo Images
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <PageHeading title="My Physique" />
      </div>
      <div className="mt-8">
        <ul className="flex flex-row flex-wrap gap-3 gallery">
          {images.map((image: any) => (
            <li key={image.id} className="flex flex-col gap-2 p-3 bg-white dark:bg-zinc-900 rounded-lg gallery-item">
              <div className="gallery-image-wrapper relative">
                <a
                  href={image.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={image.imageUrl}
                    alt="Workout Image"
                    width={250}
                    height={250}
                    className="rounded-lg gallery-image"
                    unoptimized
                  />
                </a>
                <span className="absolute top-0 right-0 mt-2 mr-2 kebab-gallery">
                  {/* <KebabMenu
                    header="Options"
                    width="auto"
                    footer={
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="flex gap-2 items-center bg-red-600 px-3 py-1 text-white rounded delete-button"
                      >
                        <span className="text-sm">Delete</span>
                        <IconTrash size={16} className="w-4" />
                      </button>
                    }
                  /> */}
                </span>
              </div>
              <div className="px-2 workout-details">
                <p className="workout-date">
                  <span className="font-medium text-gray-800 dark:text-gray-300">Date: </span>
                  {format(new Date(image.uploadedAt), "MM/dd/yyyy HH:mm")}
                </p>
                <p className="current-weight">
                  <span className="font-medium text-gray-800 dark:text-gray-300">Weight: </span>
                  {image.currentWeight
                    ? `${image.currentWeight} kg`
                    : "No current weight"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}