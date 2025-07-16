import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('handles conditional classes', () => {
    expect(cn('base-class', true && 'conditional-class')).toBe('base-class conditional-class')
    expect(cn('base-class', false && 'conditional-class')).toBe('base-class')
  })

  it('handles undefined and null values', () => {
    expect(cn('base-class', undefined, null)).toBe('base-class')
  })

  it('merges tailwind classes correctly', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })
})