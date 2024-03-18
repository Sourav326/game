import Link from "next/link"
const page = () => {
  return (
    <>
      <Link href="/" className="shadow-lg w-42 shadow-indigo-500/40 rounded-md bg-green-500 text-white px-8 py-3 absolute top-20 left-20" >Go To Home</Link>

      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Lost Password</h5>
            <span className="font-medium text-slate-400 text-xs">OTP will be sent to your email / mobile</span>

            <div>
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Email" required />
            </div>
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send OTP</button>
          </form>
        </div>
      </div>
    </>

  )
}

export default page