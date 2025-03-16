// --- This file mainly for I/O ---

import { parseProcessedCsvApplicants } from "../common/csvParser/parseCsvProcessedApplicants.js";
import { parseCsvProjects } from "../common/csvParser/parseCsvProjects.js";
import { writeCsv } from "../common/csvParser/writeCsv.js";
import { config } from "../config.js";
import { heuristicAscent } from "./algorithms/heuristicAscent.js";
import { stableMatching } from "./algorithms/stableMatching.js";
import { calculateTotalUtility } from "./helper/objective.js";
import { logAllocationRankingList } from "./helper/utils.js";

const allocate = async () => {
    console.log("Running allocation script");
    const { A, B, C, D, inFileApplicants, inFileTeams, outFileFormat } = config.allocation;

    // Input
    console.log("Parsing Applicants CSV...");
    const applicants = await parseProcessedCsvApplicants(inFileApplicants);
    console.log("Parsing Projects CSV...");
    const projectsData = await parseCsvProjects(inFileTeams);

    // Algorithm
    console.log("Parsed! Running allocation algorithm...");
    // const allocations = stableMatching(applicants, projectsData);
    const allocations = heuristicAscent(applicants, projectsData);

    logAllocationRankingList(allocations);
    const finalObjectiveScore = calculateTotalUtility(allocations, A, B, C, D);
    const utilityPerApplicant = (finalObjectiveScore / applicants.length).toFixed(2);
    console.log(`Allocated ${allocations.length} projects! Total utility: ${finalObjectiveScore}. Utility per applicant: ${utilityPerApplicant}`);

    // Output
    console.log(`Writing to CSVs...`);
    allocations.forEach((allocation) => {
        const safeProjectName = allocation.project.name.replace(/[\\/:.]/, '_');
        console.log(`${safeProjectName} (${allocation.project.id}) has ${allocation.applicants.length} applicants.`)
        const outFileName = outFileFormat.replace('<team>', safeProjectName);
        writeCsv(allocation.applicants, outFileName);
    })

    console.log("Allocation script complete 🚀");
}

allocate();
