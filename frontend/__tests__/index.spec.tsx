
import { render, screen } from '@testing-library/react'
import Home from '../pages'
import '@testing-library/jest-dom'

describe('Landing page', () => {
  it('renders title', () => {
        render(<Home />)
        const content = screen.getByAltText('Project Template')
        expect(content).toBeInTheDocument()
    })
})