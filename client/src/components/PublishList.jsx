import React from 'react'

function PublishList({publish}) {
  return (
    publish.map(publish => (            
    <div key={publish._id} className='p-5'>
        <h1 className='text-2xl'>{publish.title}</h1>
        <p className='bg-slate-200	p-3 rounded-2xl'>{publish.content}</p>
    </div>
    ))
  )
}

export default PublishList