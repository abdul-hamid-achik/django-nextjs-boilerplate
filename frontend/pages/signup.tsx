import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {Configuration, IdentityApi, User} from "../client";
import {useRouter} from "next/router";
import Link from "next/link";


export default function SignUp() {
    const {push} = useRouter()
    const {register, handleSubmit, formState: {errors, isSubmitting, isSubmitted}} = useForm();
    const {mutate, error, isError} = useMutation(async (data: User) => {
        const config = new Configuration({basePath: process.env.NEXT_PUBLIC_BACKEND_URL});
        const authApi = new IdentityApi(config);
        return await authApi.createUser(data)
    }, {
        onSuccess: async () => {
            await push('/');
        }
    });

    const onSubmit = (data: User) => {
        mutate(data);
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register</h2>
                    <p className="mt-2 text-center text-md font-light">Already have an account?
                        <Link className="ml-2 text-center text-md text-blue-400" href={'/signin'}>Sign In</Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {error && isError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                 role="alert">{(error as { message: string })?.message}</div>)}
                        <br/>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email"
                                       className={`block text-sm font-medium ${isSubmitted && errors.email ? 'text-red-700' : 'text-gray-700'}`}>
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id='email'
                                        type="email"
                                        {...register("email", {required: true})}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username"
                                       className={`block text-sm font-medium ${isSubmitted && errors.username ? 'text-red-700' : 'text-gray-700'}`}>
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="username"
                                        {...register("username", {required: true})}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className={`block text-sm font-medium ${isSubmitted && errors.password ? 'text-red-700' : 'text-gray-700'}`}>
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        type="password"
                                        {...register("password", {required: true})}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full text-center py-2 px-4 rounded bg-indigo-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
