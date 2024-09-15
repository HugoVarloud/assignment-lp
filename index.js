import { Drug, Pharmacy } from "./pharmacy";
import fs from "fs";
import path from "path";


const importDrugsDataset = async () => {
  const drugs = [];
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error('No path was found as argument', error);
    process.exit(1);
  }

  const resolvedInputPath = path.resolve(inputPath);
  await fs.readFile(resolvedInputPath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Failed to read file', error);
      process.exit(1);
    }
    const fileData = JSON.parse(data);
    if (!fileData.dataset) {
      console.error('No dataset provided', error);
      process.exit(1);
    }

    fileData.dataset.forEach(item => {
      drugs.push(new Drug(item.name, item.expiresIn, item.benefit))
    })
    evaluteDrugsBenefit(drugs);
  });
}

const evaluteDrugsBenefit = (drugs) => {  
  const pharmacy = new Pharmacy(drugs);
  const log = [];
  
  for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
    log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
  }
  exportDrugsBenefitsThroughTime(log);
}

const exportDrugsBenefitsThroughTime = (log) => {
  /* eslint-disable no-console */
  fs.writeFile(
    "output.json",
    JSON.stringify({ result: log }, null, 2).concat("\n"),
    (err) => {
      if (err) {
        console.log("error");
      } else {
        console.log("success");
      }
    },
  );
  /* eslint-enable no-console */
}

importDrugsDataset();