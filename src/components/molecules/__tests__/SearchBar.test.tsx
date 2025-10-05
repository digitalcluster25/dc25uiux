import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../../../test/utils'
import SearchBar from '../SearchBar'

describe('SearchBar', () => {
  it('renders search input', () => {
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)
    
    expect(screen.getByPlaceholderText('Поиск...')).toBeInTheDocument()
  })

  it('calls onSearch when form is submitted', async () => {
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)
    
    const input = screen.getByPlaceholderText('Поиск...')
    const form = input.closest('form')
    
    fireEvent.change(input, { target: { value: 'test query' } })
    fireEvent.submit(form!)
    
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('test query')
    })
  })

  it('calls onSearch on input change', async () => {
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)
    
    const input = screen.getByPlaceholderText('Поиск...')
    fireEvent.change(input, { target: { value: 'test' } })
    
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('test')
    })
  })

  it('uses custom placeholder', () => {
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} placeholder="Custom placeholder" />)
    
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} className="custom-class" />)
    
    const form = screen.getByRole('form')
    expect(form).toHaveClass('custom-class')
  })
})
