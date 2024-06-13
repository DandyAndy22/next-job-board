import { JobBoard } from "@/components/JobBoard";
import { JobDetails } from "../types";
import NavBar from "@/components/NavBar";


export default function JobBoardParent() {
  const initialJobs: JobDetails[] = [
    {
        "id": 1,
        "title": "Software Engineer",
        "description": "Develop and maintain web applications, collaborate with cross-functional teams, and ensure high performance and responsiveness of applications.",
        "company": "Tech Innovators Inc.",
        "salary": "$90,000 - $120,000",
        "application_link": "https://www.techinnovators.com/jobs/software-engineer"
    },
    {
        "id": 2,
        "title": "Marketing Manager",
        "description": "Plan, direct, and coordinate marketing policies and programs, such as determining the demand for products and services offered by a firm and its competitors.",
        "company": "Creative Solutions Ltd.",
        "salary": "$70,000 - $90,000",
        "application_link": "https://www.creativesolutions.com/jobs/marketing-manager"
    },
    {
        "id": 3,
        "title": "Data Scientist",
        "description": "Analyze complex data sets to identify patterns and trends, create predictive models, and support decision-making processes.",
        "company": "Data Insights Co.",
        "salary": "$100,000 - $130,000",
        "application_link": "https://www.datainsights.com/jobs/data-scientist"
    },
    {
        "id": 4,
        "title": "Product Manager",
        "description": "Lead product development from ideation to launch, work with engineering, design, and marketing teams to deliver high-quality products.",
        "company": "Innovative Products LLC",
        "salary": "$110,000 - $140,000",
        "application_link": "https://www.innovativeproducts.com/jobs/product-manager"
    },
    {
        "id": 5,
        "title": "Graphic Designer",
        "description": "Create visual concepts to communicate ideas that inspire, inform, and captivate consumers, develop overall layout and production design for various applications.",
        "company": "Design Studio Pro",
        "salary": "$50,000 - $70,000",
        "application_link": "https://www.designstudiopro.com/jobs/graphic-designer"
    },
    {
        "id": 6,
        "title": "Human Resources Manager",
        "description": "Oversee the recruitment, selection, and onboarding processes, manage employee relations, and ensure compliance with labor laws.",
        "company": "Corporate Solutions Inc.",
        "salary": "$80,000 - $100,000",
        "application_link": "https://www.corporatesolutions.com/jobs/hr-manager"
    },
    {
        "id": 7,
        "title": "Sales Executive",
        "description": "Identify and develop new business opportunities, build and maintain client relationships, and achieve sales targets.",
        "company": "Global Sales Corp.",
        "salary": "$60,000 - $80,000",
        "application_link": "https://www.globalsales.com/jobs/sales-executive"
    },
    {
        "id": 8,
        "title": "Cybersecurity Analyst",
        "description": "Protect an organization’s computer systems and networks, monitor for security breaches, and investigate and respond to incidents.",
        "company": "SecureTech LLC",
        "salary": "$95,000 - $120,000",
        "application_link": "https://www.securetech.com/jobs/cybersecurity-analyst"
    },
    {
        "id": 9,
        "title": "Operations Manager",
        "description": "Oversee the daily operations of a company, ensure efficiency and effectiveness, and manage resources and processes.",
        "company": "Efficient Operations Ltd.",
        "salary": "$85,000 - $110,000",
        "application_link": "https://www.efficientoperations.com/jobs/operations-manager"
    },
    {
        "id": 10,
        "title": "UX/UI Designer",
        "description": "Design and improve the user experience and interface of digital products, conduct user research, and create wireframes and prototypes.",
        "company": "User Experience Experts",
        "salary": "$70,000 - $95,000",
        "application_link": "https://www.uxexperts.com/jobs/ux-ui-designer"
    }
  ]
  return (
    <div>
      <NavBar />
      <JobBoard jobs={initialJobs} />
    </div>
  );
}