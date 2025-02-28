import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ReviewsTab: React.FC<any> = ({ ratings }) => {
    const totalStars = 5;

    return (
        ratings?.length === 0 ? (
            <div className="text-center p-4">
                <p className="text-gray-500">No review available.</p>
            </div>
        ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {ratings?.map((review: any) => {
                    const rating = review?.rating;
                    const fullStars = Math.floor(rating);
                    const partialFill = rating % 1;
                    const emptyStars = totalStars - fullStars - (partialFill > 0 ? 1 : 0);

                    return (
                        <div key={review?.uuid} className="grid grid-cols-3 gap-2 mb-4">
                            <div className="bg-white flex flex-col items-center justify-center text-center rounded-lg p-3">
                                {/* Render avatar initials if userDetails exists */}
                                <Avatar className="rounded-full">
                                    <AvatarFallback>
                                        {review?.userDetails?.first_name
                                            .split(" ")
                                            .map((name: any) => name[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <p className="text-gray-800 font-bold mt-2">
                                    {review?.userDetails?.first_name} {review?.userDetails?.last_name}
                                </p>
                                {/* Star Rating */}
                                <div className="flex">
                                    {/* Full Stars */}
                                    {[...Array(fullStars)].map((_, i) => (
                                        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    {/* Partial Star */}
                                    {partialFill > 0 && (
                                        <svg className="w-5 h-5" viewBox="0 0 20 20">
                                            <defs>
                                                <linearGradient id="partialFill">
                                                    <stop offset={`${partialFill * 100}%`} stopColor="#FBBF24" />
                                                    <stop offset={`${partialFill * 100}%`} stopColor="#D1D5DB" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                fill="url(#partialFill)"
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                        </svg>
                                    )}
                                    {/* Empty Stars */}
                                    {[...Array(emptyStars)].map((_, i) => (
                                        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-2 space-y-2">
                                <div className="bg-white p-3 rounded-lg">
                                    <p className="text-sm text-gray-800 font-medium">
                                        {review?.description}
                                    </p>
                                    <p className="text-gray-500 text-xs text-right mt-2">
                                        {review?.created_at?.slice(8, 10)}-{review?.created_at?.slice(5, 7)}-{review?.created_at?.slice(0, 4)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    );
};

export default ReviewsTab;
