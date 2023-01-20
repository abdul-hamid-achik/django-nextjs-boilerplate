import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen, waitFor} from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import SignUp from '../pages/signup'
import mockRouter from "next-router-mock";
import {Wrapper} from "../tests.shared";

process.env.NEXT_PUBLIC_BACKEND_URL = 'http://localhost:8080'

const credentials = {
    username: "test",
    password: "password",
    email: "test@test.com",
}

const server = setupServer(
    rest.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/identity/users/`, async (req, res, ctx) => {
        const body = await req.json()
        expect(body).toMatchObject(credentials)
        return res(ctx.json({success: true}))
    }),
)

jest.mock('next/router', () => require('next-router-mock'));

describe('<SignUp />', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    beforeEach(() => mockRouter.setCurrentUrl("/signup"))

    it('submits the form and redirects to / when registration is successful', async () => {
        render(
            <SignUp/>,
            {wrapper: Wrapper}
        )

        const email = await screen.findByLabelText('Email address')
        const username = await screen.findByLabelText('Username')
        const password = await screen.findByLabelText('Password')
        const submit = await screen.findByRole('button', {name: 'Sign Up'})

        await UserEvent.type(email, credentials.email)
        await UserEvent.type(username, credentials.username)
        await UserEvent.type(password, credentials.password)
        await UserEvent.click(submit)

        await waitFor(() => expect(mockRouter).toMatchObject({
            pathname: "/",
        }))
    });
});
