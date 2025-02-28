import React from 'react'
import { Card, CardContent } from '../ui/card'
import { useAppSelector } from '@/hooks';
import { RootState } from '@/redux/store';

const BasicDetails = () => {
    const { profile } = useAppSelector((state: RootState) => state.profile);
    console.log(profile)
    return (
        <Card className="rounded-t-none pt-2">
            <CardContent>
                <div className="max-w-4xl mx-auto p-8">
                    <div className="flex gap-8">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                                <img
                                    src="https://via.placeholder.com/150" // Replace with actual profile image source
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="bg-gray-200 text-sm text-gray-600 py-2 px-4 rounded">
                                Upload Image
                            </button>
                        </div>

                        {/* Form Section */}
                        <form className="flex-1 grid grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <label className="block text-sm font-medium mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={profile?.first_name}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={profile?.last_name}
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={profile?.email}
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-medium mb-1">Mobile</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={profile?.mobile_number}
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value=""
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-medium mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value=""
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default BasicDetails