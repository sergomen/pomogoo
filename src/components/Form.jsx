import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="flex-start w-full max-w-full flex-col px-4 sm:px-16">
        <h1 className="head_text text-left">
            <span className="blue_gradient">{type} Time</span>
        </h1>
        <p className="desc text-left max-w-md">
            {type} Time and Participate in the competition with other people.
        </p>

        <form
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            onSubmit={handleSubmit}
        >
            <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">Your Daily Time in Minutes</span>

                <input
                    value={post.time}
                    placeholder="60"
                    required
                    className="form_input"
                    onChange={(e) => setPost({ ...post, time: e.target.value })}
                />
            </label>

            <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                    Description
                </span>

                <textarea
                    value={post.title}
                    placeholder="Describe what did you do?"
                    required
                    className="form_textarea"
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
            </label>

            <div className="flex-end mx-3 mb-5 gap-4">
                <Link href="/" className="text-gray-500 text-sm">
                    Cancel
                </Link>

                <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                >
                    {submitting ? `${type}...` : type}
                </button>
            </div>
        </form>
    </section>
  )
};

export default Form;