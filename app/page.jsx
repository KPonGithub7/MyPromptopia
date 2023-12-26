//br tag is kept hidden for the large devices and is used for smaller devices only
const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">
                    {" "}
                    AI-Powered Prompts
                </span>
            </h1>
            <p className="desc text-center">
                Promptopia is an open-source project that uses AI to generate
                writing prompts. It is a community-driven project that allows
                users to share their own prompts and vote on the prompts.
            </p>
        </section>
    );
};

export default Home;
