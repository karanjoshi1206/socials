import SocialForm from "@/app/components/ui/socialForm/socialForm";

export default async function Social({ params }: { params: { social: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/socials/getSocial/${params.social}`, {
    method: "GET"
  });
  const data = await response.json();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        {/* Title Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Create Your Social</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill out the form below to add your handle and redirect URL for {data.title}.
          </p>
        </div>

        {/* Social Form */}
        <SocialForm socialData={data} />
      </div>
    </div>
  );
}
