import React from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { GrDownload } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux'

function UserHome() {
    const user = useSelector((state) => state.user)
    console.log(user)
    const token = localStorage.getItem('usertoken')
    console.log(token)

    
    return (
        <div>
            <div className="overflow-y-hidden rounded-lg border mx-3">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-700 h-[8vh] text-center text-sm font-semibold uppercase tracking-widest text-white">
                                <th className="px-5 py-3">File Name</th>
                                <th className="px-5 py-3">Created At</th>
                                <th className="px-5 py-3">Actions</th>
                                {/* <th className="px-5 py-3">Created at</th>
                                <th className="px-5 py-3">Download</th>
                                <th className="px-5 py-3 text-center">Delete</th> */}
                            </tr>
                        </thead>
                        <tbody className="text-gray-500">
                            <tr className='text-center'>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap font-semibold ">Mern Stack</p>
                                </td>

                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">02/10/1783</p>
                                </td>

                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="flex justify-around m-5">
                                         
                                            <i className="text-2xl "><GrDownload/></i>
                                            <i className="text-2xl"><RiDeleteBinLine/></i>
                                        </p>
                                </td>
                                {/* <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">date</p>
                                </td>

                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <button className='border-2 border-purple-900 p-2 px-4 rounded text-purple-900 uppercase hover:shadow hover:bg-green-500  hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'>Click here</button>
                                </td>

                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <button className='py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'>Delete</button>
                                </td> */}

                            </tr>
                        </tbody>
                       
                        
                       



                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserHome