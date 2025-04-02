import BookingTable from '@/components/(Admin)/(Dashboard-page)/BookingTable'
import Cards from '@/components/(Admin)/(Dashboard-page)/Cards'
import FlowChart from '@/components/(Admin)/(Dashboard-page)/FlowChart'
import ImageUploader from '@/components/ImageUploader'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="p-6 space-y-6">
      <Cards />
      <FlowChart />
      <BookingTable />

      <ImageUploader/>
    </div>
  )
}
