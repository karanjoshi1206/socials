import { Social } from "@/app/models/socials";
import SocialCard from "../socialCard/socialCard";

const SocialsList = async () => {
  const socials = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/socials/getDefault`);
  const data = await socials.json();

  return (
    <div className="p-6">
      {/* Section for default options */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Choose from the default options</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((social: Social) => (
            <SocialCard key={social._id} {...social} />
          ))}
        </div>
      </section>

      {/* Section for creating your own social */}
      {/* <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Or create your own</h1>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">Create New Social</button>
      </section> */}
    </div>
  );
};

export default SocialsList;
