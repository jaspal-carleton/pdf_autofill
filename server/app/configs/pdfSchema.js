/**
 * Export pdf schema parameters
 */
 module.exports = {
    province: {
        ny: {
            name: "FIRSTNAME_LASTNAME",
            gender: "FILL",
            dob: "MM/DD/YYYY",
            template: "NY_Application.pdf"
        },
        ca: {
            name: "FULL",
            gender: "SELECT",
            dob: "YYYY-MM-DD",
            template: "CA_Application.pdf"
        }
    }
};