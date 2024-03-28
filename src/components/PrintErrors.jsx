import React from 'react'

export default function PrintErrors({errors}) {
  return (
    <div className='errors'>
          {
            (errors!=undefined)?errors.map(error =>
                  <p key={error}>{error}</p>
                ):''
        }
    </div>
  )
}
