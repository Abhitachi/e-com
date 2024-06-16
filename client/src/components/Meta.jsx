import React from 'react'
import { Helmet } from 'react-helmet-async'
const Meta = ({title, description, keywords}) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title> 
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
      </Helmet>

    </div>
  )
}

Meta.defaultProps = {
    title: "Welcome to E-commerce",
    description: "we sell best product for cheap",
    keywords: 'electronics ,buy electronics, cheap electronics'
}

export default Meta
