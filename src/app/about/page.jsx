import Image from 'next/image';

export default function Page() {
  return (
    <section className=" p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">About</h1>
        <div className="flex justify-center mb-4">
            <Image src="/assets/images/about.png" alt="About Image" width={500} height={300} />
        </div>
        <p className="text-lg mb-4">
            PomoGoo is a Pomodoro technique-based app that allows you to enhance your productivity and efficiency in work or study.
        </p>
        <p className="text-lg mb-4">
            The app follows the traditional Pomodoro technique of working in 25-minute intervals (known as &quot;pomodoros&quot;) with 5-minute breaks in between. After every four pomodoros, a longer break of 15 minutes is provided.
        </p>
        <p className="text-lg mb-4">
            However, PomoGoo offers more than just a basic Pomodoro timer. It also allows you to compare your total work time with that of other users. This feature provides motivation and inspiration to achieve higher levels of productivity.
        </p>
        <p className="text-lg mb-4">
            Additionally, PomoGoo organizes various events, such as weekly sprints or monthly tournaments, where you can participate and compete with others. These events add an element of fun and challenge to your productivity journey.
        </p>
        <p className="text-lg mb-4">
            In summary, PomoGoo is not only a powerful time management technique but also a community of individuals striving to improve their productivity and accomplish their goals. The app helps you develop a habit of focused work intervals, compare your progress with others, and gradually attain success.
        </p>
        <p className="text-lg mb-4">
            <span className="text-red-600">NB!</span><span className="text-primary-orange"> At the moment, the pomodoro timer is not working. However, you can input time measured by other time trackers and participate in weekly and monthly challenges.</span>
        </p>
      </div>
    </section>
  );
}