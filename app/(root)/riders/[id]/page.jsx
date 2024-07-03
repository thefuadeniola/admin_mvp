'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'


const Page = () => {
    const router = useRouter()
    const pathname = usePathname()
    const filterId = pathname.split('/')[2]
    const [data, setData] = useState()
    const [error, setError] = useState('')


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/riders',);
            const result = await response.json();
    
            if (response.ok) {
                const specificOrder = result.data.find(item => item._id === filterId)
                setData(specificOrder)
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
    <div className='w-full bg-white min-h-screen mt-6 p-6'>
        <div className='w-full py-6'>
            <button onClick={()=>router.back()}>
              <img src='/icons/arrow-left.svg' height={20} width={20} alt='back' />
            </button>
        </div>
        <div className='h-full flex flex-col mt-4 items-center'>
            <img src='/images/rider_picture.png' alt='picture' height={139} width={139} />
            <h1 className='font-semibold text-2xl mt-2'>{data?.fullName}</h1>
            <p className='mt-2'><span className='text-xl font-thin'>{data?.vehicle.brand}</span> -- <span className='text-sm font-semibold'>{data?.vehicle?.plateNumber}</span></p>
            <p>{data?.email}</p>

            <img src='/images/rider_id.png' alt='rider_id' height={212} width={408} className='my-6' />

            <div className='flex flex-row items-center gap-4 mt-8'>
                <button className='delivered px-4 py-2 rounded-lg text-white'>Verify Credentials</button>
                <button className='bg-red-500 px-4 py-2 rounded-lg text-white'>Cancel Verification</button>

            </div>
            <div className='mt-10 items-center'>
                <h1 className='text-xl font-semibold text-primary-blue text-center mb-4'>Guarantor Details</h1>

                <div className='flex flex-row items-center justify-center gap-8'>
                    <div>
                        <h1 className='font-semibold'>Adebayo Olayinka</h1>
                        <p>+234 801 207 1112</p>
                    </div>
                    <div>
                        <h1 className='font-semibold'>Adebayo Olayinka</h1>
                        <p>+234 801 207 1112</p>
                    </div>

                </div>
            </div>

        </div>
    </div>
  )
}

export default Page