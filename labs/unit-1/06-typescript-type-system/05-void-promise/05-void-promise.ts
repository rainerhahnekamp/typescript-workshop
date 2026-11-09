export async function releaseVehicle(inspect: () => Promise<void>): Promise<void> {
  try {
    await inspect();
    console.log("Vehicle released");
  } catch {
    console.log("Inspection failed");
  }
}

async function checkBrakes(): Promise<void> {
  throw new Error("Brake inspection failed");
}

releaseVehicle(async () => {
  await checkBrakes();
});
