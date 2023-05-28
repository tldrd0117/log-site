// __tests__/index.test.jsx

import { act, render, screen, waitFor } from '@testing-library/react'
import Home, {getServerSideProps} from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', async () => {
    const {props} = await getServerSideProps()
    render(<Home {...props}/>)
    const msg = screen.getByText('BLOG')
    await waitFor(() => expect(msg).toBeInTheDocument())
  })
})