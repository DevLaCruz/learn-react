import {describe, test,expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import { CustomHeader } from './CustomHeader';

const title = "Test Title";
 const description = "Test Description";

describe('CustomHeader', () => {
  test('should render the title correctly',()=>{
    

    render(<CustomHeader title={title} description={description}/>);

    const h1 = screen.getByTestId("custom-header-title");
    expect(h1.textContent).toContain("Test Title");

    expect(screen.getByText(title)).toBeDefined();
  })

  test('should render the description when provided',()=>{

   
    render(<CustomHeader title={title} description={description}/>); 
    
    const p = screen.getByTestId("custom-header-description");
    expect(p.textContent).toContain("Test Description");

    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByRole('paragraph')).toBeDefined();
    expect(screen.getByRole('paragraph').innerHTML).toBe(description);

  })

  test('should not render the description when not provided',()=>{
    const {container} = render(<CustomHeader title={title}/>);

    const divElement = container.querySelector('.content-center');
    const h1 = divElement?.querySelector('h1');
    //console.log(h1?.innerHTML);
    expect(h1?.innerHTML).toBe(title)

    const p = divElement?.querySelector('p')
    expect(p).toBeNull()
    
  })


})