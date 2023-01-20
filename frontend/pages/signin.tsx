import {useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {signIn, SignInOptions} from "next-auth/react";
import {useRouter} from "next/router";

export default function SignIn() {
    const {push} = useRouter();
    const {register, handleSubmit, formState: {errors, isSubmitting,}} = useForm();
    const {mutate, error, isError} = useMutation((credentials: SignInOptions) => signIn('credentials', {
        ...credentials,
        redirect: false,
        callbackUrl: '/'
    }), {
        onSuccess: async (data) => {
            if (data?.error) {
                return;
            }
            await push(data.url ? data.url : '/');
        }
    });

    console.log({error, isError, errors})
    const onSubmit = (credentials) => {
        mutate(credentials);
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign In</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {error && isError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                 role="alert">{(error as { message: string }).message}</div>)}
                        <br/>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="username"
                                       className={`block text-sm font-medium ${errors.username ? 'text-red-700' : 'text-gray-700'}`}>
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
                                       className={`block text-sm font-medium ${errors.password ? 'text-red-700' : 'text-gray-700'}`}>
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        id="password"
                                        {...register("password", {required: true})}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    id="submit"
                                    disabled={isSubmitting}
                                    className="w-full text-center py-2 px-4 rounded bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
