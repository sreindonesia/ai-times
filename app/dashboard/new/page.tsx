import React from 'react'
import DocumentForm from './components/DocumentForm'

const Page = () => {
  return (
    <div className='flex'>
      <div className="w-[360px] py-5 border-r border-zinc-300 h-screen">
        <DocumentForm />
      </div>
    </div>
  )
}

export default Page