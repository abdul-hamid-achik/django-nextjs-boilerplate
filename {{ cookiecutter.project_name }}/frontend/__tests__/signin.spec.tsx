import {render, screen, waitFor} from "@testing-library/react";
import {signIn} from 'next-auth/react';
import UserEvent from "@testing-library/user-event";
import SignIn from "../pages/signin";
import mockRouter from 'next-router-mock'
import {Wrapper} from "../tests.shared";

jest.mock('next-auth/react', () => {
    return {
        signIn: jest.fn()
    }
})


describe("<SignIn />", () => {
    beforeEach(() => mockRouter.setCurrentUrl("/signin"))
    it('redirects to / when user is authenticated', async () => {
        // @ts-ignore
        (signIn as jest.MockedFunction<typeof signIn>).mockResolvedValue({redirect: '/'})

        render(
            <SignIn/>, {wrapper: Wrapper}
        )
        const username = await screen.findByLabelText("Username")
        const password = await screen.findByLabelText("Password")
        const submit = await screen.findByRole("button", {name: "Sign In"})

        await UserEvent.type(username, "test")
        await UserEvent.type(password, "password")
        await UserEvent.click(submit)

        await waitFor(() => expect(mockRouter).toMatchObject({
            pathname: "/",
        }))
    })
})
