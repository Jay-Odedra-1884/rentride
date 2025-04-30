"use client";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";

function ContactUs() {
  const router = useRouter();

  return (
    <div>
      <NavBar />
      <div className="bg-white py-15 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-500 mb-10">
            Reach out to us for bookings, queries, or partnerships. We’re here
            to help you ride smarter.
          </p>

          <div className="bg-white rounded-2xl shadow-md p-8 text-left space-y-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Trengaly"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="I want to hire you quickly"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>
            </form>

            <div className="flex justify-center text-center pt-4 gap-4">
              <button
                onClick={() => router.push("/about-us")}
                className="inline-block bg-white border border-blue-600 text-blue-600 hover:bg-blue-800 hover:text-white font-medium px-6 py-2 rounded-xl transition"
              >
                About Us
              </button>

              <button
                type="submit"
                className="inline-block bg-blue-600 border border-blue-600 text-white hover:bg-blue-800 font-medium px-6 py-2 rounded-xl transition"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
