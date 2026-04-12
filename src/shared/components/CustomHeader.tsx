import React from 'react'


interface Props {
  title: string;
  description?: string;
}

export const CustomHeader = ({ title, description }: Props) => {
  return (
    <div className="content-center">
        <h1 data-testid="custom-header-title">{title}</h1>
        {description && <p data-testid="custom-header-description">{description}</p>}
      </div>
  )
}
