// Metadata cho SEO trong React 19
export const jobDetailMetadata = {
  title: "Job detail | HiRise",
  description:
    "Learn more about IT jobs and apply immediately at HiRise - the leading IT job platform in Vietnam.",
  keywords: "job details, apply IT, IT job, IT recruitment, HiRise",
  openGraph: {
    title: "Job detail | HiRise",
    description: "Learn more about IT jobs and apply immediately at HiRise.",
    image: "/og-image.png",
    url: `${import.meta.env.VITE_BASE_URL}/jobs`,
    type: "website",
  },
  canonical: `${import.meta.env.VITE_BASE_URL}/jobs`,
};

export const jobListMetadata = {
  title: "IT Job List | HiRise",
  description:
    "Explore thousands of IT job opportunities from top technology companies. Find your dream tech job with HiRise.",
  keywords: "IT jobs, tech jobs, developer jobs, software engineer, IT recruitment, HiRise",
  openGraph: {
    title: "IT Job List | HiRise",
    description: "Find your dream tech job with HiRise - the leading IT job platform in Vietnam.",
    image: "/og-image.png",
    url: `${import.meta.env.VITE_BASE_URL}/jobs`,
    type: "website",
  },
  canonical: `${import.meta.env.VITE_BASE_URL}/jobs`,
};
