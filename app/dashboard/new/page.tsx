import React from 'react'
import DocumentForm from './components/DocumentForm'

const Page = () => {
  return (
    <div className='flex'>
      <div className="w-1/4 border-r border-zinc-300 h-screen overflow-auto">
        <DocumentForm />
      </div>
    </div>
  )
}

export default Page