'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Loader from "react-loader-spinner"; 

const Page = () => {

  const [order, setOrder] = useState(null)
  const router = useRouter()
  const pathname = usePathname()
  const [error, setError] = useState('')

  const filterId = pathname.split('/')[2]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard',);
        const result = await response.json();

        if (response.ok) {
            const specificOrder = result.order.find(item => item._id === filterId)
            setOrder(specificOrder)
        } else {
          setError(result.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred');
      }
    };

    fetchData();
  }, []);


  return (
    <div className='bg-white min-h-screen mt-6 py-8 px-12'>
        <div className='w-full py-6'>
          <button onClick={()=>router.back()}>
            <img src='/icons/arrow-left.svg' height={20} width={20} alt='back' />
          </button>
        </div>
        {
            order ? 
            <>
            <h1 className='heading'>Order <span className='text-primary-blue font-semibold'>{order.orderId}</span></h1>
            <div className='mt-4 flex flex-col items-left space-y-0'>
                <div className='flex flex-row items-center gap-3'>
                    <img src='/icons/sender.svg' height={20} width={20} alt='sender' />
                    <p className='text-xl font-[#949494]'>{`${order.addressDetails.houseNumber} ${order.addressDetails.landMark}`}</p>
                </div>
                <img src='/icons/line.png' alt='line' height={80} width={50} className='ml-[-16px]' />
                <div className='flex flex-row items-center gap-3'>
                    <img src='/icons/receiver.svg' height={20} width={20} alt='sender' />
                    <p className='text-base'>{order.receiverDetails.address}</p>
                </div>


            {/*  
                <div>
                    <h2 className='text-primary-blue font-semibold'>Tracking History</h2>
                </div>
                */}
            </div>
            <div className='mt-10'>
                <h1 className='text-xl font-semibold text-primary-blue'>Rider Details</h1>
                <div className='mt-6 flex flex-col items-left space-y-1'>
                    <img src='/images/rider_picture.png' alt='rider-picture' height={60} width={60} />
                    <h2 className='font-semibold text-xl'>Adebayo Olayinka</h2>
                    <h2>Camry KWT 112 XA</h2>
                    <p>+234 801 112 4566</p>
                </div>
            </div>

            <div className='mt-10'>
                <h1 className='text-xl font-semibold text-primary-blue'>Customer&apos;s Review</h1>
                <div className='mt-6 flex flex-col items-left space-y-1'>
                    <h2 className='font-semibold text-xl'>John Smith</h2>
                    <h2>March 10, 2024</h2>
                    <div className='flex flex-row space-x-0 items-center'>
                        <img src='/icons/star.svg' alt='star' height={24} width={24} />
                        <img src='/icons/star.svg' alt='star' height={24} width={24} />
                        <img src='/icons/star.svg' alt='star' height={24} width={24} />
                        <img src='/icons/star.svg' alt='star' height={24} width={24} />
                        <img src='/icons/star.svg' alt='star' height={24} width={24} />

                    </div>
                    <p className='max-w-xl'>“I couldn&apos;t be happier with the services provided by Justin  Law. They were professional, knowledgeable, and truly went above and beyond to help me with my case. I highly recommend them to anyone in need of legal assistance.”</p>
                </div>
            </div>

            </>
            :
            <div className='h-full flex items-center justify-center'> 
                <h2>Loading order, please wait...</h2>
            </div>
        }


    </div>
  )
}

export default Page