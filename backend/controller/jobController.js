import prisma from "../prisma/client.js";

export async function getAllJobs(req,res){
    const { jobTitle, companyName, location, jobType, minSalary, maxSalary } =
      req.query;

    const yearlyMin = minSalary ? Number(minSalary) * 12 * 1000 : undefined;
    const yearlyMax = maxSalary ? Number(maxSalary) * 12 * 1000 : undefined;
    console.log(yearlyMin, yearlyMax);

    try {
      const jobs = await prisma.job.findMany({
        where: {
          jobTitle: jobTitle
            ? { contains: String(jobTitle), mode: "insensitive" }
            : undefined,
          location: location
            ? { contains: String(location), mode: "insensitive" }
            : undefined,
          jobType: jobType
            ? { equals: String(jobType), mode: "insensitive" }
            : undefined,
          AND: [
            minSalary ? { salaryMin: { gte: yearlyMin } } : {},
            maxSalary ? { salaryMax: { lte: yearlyMax } } : {},
          ],
        },
        orderBy: { createdAt: "desc" },
      });

      res.json(jobs);
      console.log(res);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
}

export const getJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await prisma.job.findUnique({
      where: { id: Number(id) },
    });

    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
};

export const createJob = async (req, res) => {
  const {
    jobTitle,
    companyName,
    location,
    jobType,
    minSalary,
    maxSalary,
    experience,
    requirements,
    description,
    deadline,
    status,
  } = req.body;
  console.log(req.body);
  try {
    const newJob = await prisma.job.create({
      data: {
        jobTitle,
        companyName,
        location,
        jobType,
        salaryMin: parseInt(minSalary),
        salaryMax: parseInt(maxSalary),
        experience: parseInt(experience), 
        responsibility: requirements,
        jobDescription: description,
        applicationDeadline: deadline
          ? new Date(applicationDeadline)
          : null,
        status: status || "published",
      },
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await prisma.job.delete({
      where: { id: Number(id) },
    });

    res.json(deletedJob);
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
};
  