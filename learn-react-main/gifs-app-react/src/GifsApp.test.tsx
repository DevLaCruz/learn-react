import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { GifsApp } from './GifsApp'

describe('GifsApp', () => {
  test('should render component properly', () => {
    
    // Render the GifsApp component and perform assertions here
    const {container} = render(<GifsApp />)

    expect(container).toMatchSnapshot()
  })
})