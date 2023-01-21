import {render, screen} from "@testing-library/react"
import Home from "../pages"

describe("<Home />", () => {
    it("renders title", () => {
        render(<Home/>)
        expect(screen.getByText("Django and Next.js Project Template")).toBeInTheDocument()
    })

    it('renders view on github button', () => {
        render(<Home/>)
        expect(screen.getByRole('link', {name: "View on GitHub"})).toBeInTheDocument()
    })
})
