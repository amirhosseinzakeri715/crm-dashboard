import Footer from "../ui/footer";

export default function LoginPage(){
    return(
        <section className="min-h-screen flex  items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
            <div className="bg-white p-8 rounded-2xl shadow-md w-[60vw] min-w-sm max-w-lg max-h-lg min-h-sm">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Login Page </h1>
                <form action="./" className="space-y-5">
                    <div className="">
                        <label className="block mb-1 text-sm font-medium text-gray-800" >Email <address></address></label>
                        <input 
                            type="email" 
                            className="w-full  px-4 py-2 border border-gray-200 border-opacity-50  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg" 
                            placeholder="your@email.com"/>
                    </div>
                    <div className="">
                        <label className="block mb-1 text-sm font-medium text-gray-800">Password</label>
                        <input 
                        className="w-full  px-4 py-2 border border-gray-200 border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
                        type="password" 
                        placeholder="your password" />
                    </div>
                    <div className="">
                        <button className="w-full bg-blue-600 text-white py-2 px-2 rounded hover:bg-blue-800 transition cursor-pointer" type="submit">Sign in </button>
                    </div>                        
                    <div className="flex-grow ">
                        <hr className="border border-gray-200 border-t boarder-gray-150 "></hr>
                    </div>
                    <div className="">
                        <footer className="flex  gap-2">
                            <a className="bg-gray-600 py-2 px-2 w-full text-center border rounded hover:bg-black text-white cursor-pointer"> Login with github</a>
                            <a className="bg-gray-600 py-2 px-2 w-full text-center border rounded hover:bg-black text-white cursor-pointer"> Login with google</a>
                        </footer>

                    </div>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </section>
        
    )
}