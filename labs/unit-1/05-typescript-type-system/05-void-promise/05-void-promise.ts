export function releaseVehicle(inspect: () => void) {
  try {
    inspect();
    console.log("Vehicle released");
  } catch {
    console.log("Inspection failed");
  }
}

releaseVehicle(async () => {
  await checkBrakes();
});

async function checkBrakes(): Promise<void> {
  throw new Error("Brake inspection failed");
}
