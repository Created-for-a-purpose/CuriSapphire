export const hospitalWallet = "0xAFdDc92933bFBe7FB967AE0A18a771E463F3Ad85"
export const pharmacyWallet = "0xAFdDc92933bFBe7FB967AE0A18a771E463F3Ad85"
export const researcherWallet = "0xAFdDc92933bFBe7FB967AE0A18a771E463F3Ad85"

export const sampleResearchData = {
  "Echocardiogram lab reports": "Sample Echocardiogram lab reports",
   "Treatment history": "Sample Treatment history",
   "Financial data": "Sample Financial data",
}

export const reportData1 = {
    patientName: "John Doe",
    doctorName: "Dr. Snape",
    labName: "Sample Lab",
    testName: "Blood Test",
    testDate: Math.floor(Date.now() / 1000),
    testDetails: [
      { name: "Sample A", value: "10.5", referenceRange: "5.0-15.0" },
      { name: "Sample B", value: "3.2", referenceRange: "2.0-4.0" },
      { name: "Sample A", value: "10.5", referenceRange: "5.0-15.0" },
      { name: "Sample B", value: "3.2", referenceRange: "2.0-4.0" },
      { name: "Sample A", value: "10.5", referenceRange: "5.0-15.0" },
      { name: "Sample B", value: "3.2", referenceRange: "2.0-4.0" },
      // Add more test details as needed
    ],
    diagnosis: "Viral Infection",
}

export const reportData2 = {
    patientName: "John Doe",
    doctorName: "Dr. Baggins",
    labName: "Sample Lab",
    testName: "Echocardiogram",
    testDate: (new Date()).toUTCString(),
    testDetails: [
      { name: "Sample A", value: "10.5", referenceRange: "5.0-15.0" },
      { name: "Sample B", value: "3.2", referenceRange: "2.0-4.0" },
      { name: "Sample A", value: "10.5", referenceRange: "5.0-15.0" },
      { name: "Sample B", value: "3.2", referenceRange: "2.0-4.0" },
      { name: "Sample A", value: "10.5", referenceRange: "5.0-15.0" },
      { name: "Sample B", value: "3.2", referenceRange: "2.0-4.0" },
      // Add more test details as needed
    ],
    diagnosis: "Endocarditis",
}

